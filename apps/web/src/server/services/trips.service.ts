import { prisma } from '@/lib/prisma';
import type { SessionUser } from '@/lib/session';
import type { ShipmentType, TripStatus } from '@prisma/client';

export interface AssignTripInput {
  driverId: string;
  eta: string;
  shipmentType?: ShipmentType;
}

const TRIP_INCLUDE = {
  order: { include: { customer: true } },
  driver: true,
  assignedBy: true,
  checkpoints: {
    include: { pool: true, reportedBy: true, verifiedBy: true },
    orderBy: { reportedAt: 'asc' as const },
  },
  documents: true,
  invoice: true,
} as const;

export const tripsService = {
  async findAllInternal() {
    return prisma.trip.findMany({
      include: TRIP_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  },

  async findMineAsDriver(driverId: string) {
    return prisma.trip.findMany({
      where: { driverId },
      include: TRIP_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  },

  async findOneAuthorized(id: string, user: SessionUser) {
    const trip = await prisma.trip.findUnique({
      where: { id },
      include: TRIP_INCLUDE,
    });
    if (!trip) throw new Error('Trip tidak ditemukan');
    if (user.role === 'CUSTOMER' && trip.order.customerId !== user.id) {
      throw new Error('Trip ini bukan milik Anda');
    }
    if (user.role === 'DRIVER' && trip.driverId !== user.id) {
      throw new Error('Trip ini bukan tugas Anda');
    }
    return trip;
  },

  async assign(tripId: string, assignedById: string, input: AssignTripInput) {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { order: true },
    });
    if (!trip) throw new Error('Trip tidak ditemukan');
    if (trip.order.status !== 'CONFIRMED') {
      throw new Error('Order belum dikonfirmasi Marketing');
    }
    if (!trip.order.orderNumber) {
      throw new Error('Order belum memiliki nomor order');
    }

    let tripNumber = trip.tripNumber;
    if (!tripNumber) {
      const siblingCount = await prisma.trip.count({ where: { orderId: trip.order.id } });
      if (siblingCount <= 1) {
        tripNumber = trip.order.orderNumber;
      } else {
        const siblings = await prisma.trip.findMany({
          where: { orderId: trip.orderId },
          orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
          select: { id: true },
        });
        const index = siblings.findIndex((t) => t.id === trip.id);
        tripNumber = `${trip.order.orderNumber}-${String(index + 1).padStart(2, '0')}`;
      }
    }

    return prisma.trip.update({
      where: { id: tripId },
      data: {
        tripNumber,
        driverId: input.driverId,
        eta: new Date(input.eta),
        shipmentType: input.shipmentType ?? undefined,
        assignedById,
        status: 'ASSIGNED',
      },
      include: TRIP_INCLUDE,
    });
  },

  async pickup(tripId: string, user: SessionUser) {
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) throw new Error('Trip tidak ditemukan');
    if (user.role === 'DRIVER' && trip.driverId !== user.id) {
      throw new Error('Trip ini bukan tugas Anda');
    }

    return prisma.trip.update({
      where: { id: tripId },
      data: { status: 'VEHICLE_PICKED_UP' },
      include: TRIP_INCLUDE,
    });
  },

  async updateStatus(tripId: string, status: TripStatus) {
    return prisma.trip.update({
      where: { id: tripId },
      data: { status },
      include: TRIP_INCLUDE,
    });
  },
};
