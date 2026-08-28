import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RealtimeGateway } from '../realtime/realtime.gateway';
import { AssignTripDto, UpdateTripStatusDto } from './dto/trip.dto';
import type { AuthUser } from '../common/decorators/current-user.decorator';

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

@Injectable()
export class TripsService {
  constructor(
    private prisma: PrismaService,
    private realtime: RealtimeGateway,
  ) {}

  findAllInternal() {
    return this.prisma.trip.findMany({
      include: TRIP_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  }

  findMineAsDriver(driverId: string) {
    return this.prisma.trip.findMany({
      where: { driverId },
      include: TRIP_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneAuthorized(id: string, user: AuthUser) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: TRIP_INCLUDE,
    });
    if (!trip) throw new NotFoundException('Trip tidak ditemukan');
    if (user.role === 'CUSTOMER' && trip.order.customerId !== user.id) {
      throw new ForbiddenException('Trip ini bukan milik Anda');
    }
    if (user.role === 'DRIVER' && trip.driverId !== user.id) {
      throw new ForbiddenException('Trip ini bukan tugas Anda');
    }
    return trip;
  }

  private async pendingTripCount(order: { id: string }) {
    return this.prisma.trip.count({ where: { orderId: order.id } });
  }

  async assign(tripId: string, assignedById: string, dto: AssignTripDto) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId },
      include: { order: true },
    });
    if (!trip) throw new NotFoundException('Trip tidak ditemukan');
    if (trip.order.status !== 'CONFIRMED')
      throw new ForbiddenException('Order belum dikonfirmasi Marketing');
    if (!trip.order.orderNumber)
      throw new ForbiddenException('Order belum memiliki nomor order');

    let tripNumber = trip.tripNumber;
    if (!tripNumber) {
      const siblingCount = await this.pendingTripCount(trip.order);
      tripNumber =
        siblingCount <= 1
          ? trip.order.orderNumber
          : `${trip.order.orderNumber}-${String((await this.siblingIndex(trip)) + 1).padStart(2, '0')}`;
    }

    const updated = await this.prisma.trip.update({
      where: { id: tripId },
      data: {
        tripNumber,
        driverId: dto.driverId,
        eta: new Date(dto.eta),
        shipmentType: dto.shipmentType ?? undefined,
        assignedById,
        status: 'ASSIGNED',
      },
      include: TRIP_INCLUDE,
    });

    this.emitUpdate(updated);
    return updated;
  }

  private async siblingIndex(trip: { orderId: string; id: string }) {
    const siblings = await this.prisma.trip.findMany({
      where: { orderId: trip.orderId },
      orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
      select: { id: true },
    });
    return siblings.findIndex((t) => t.id === trip.id);
  }

  async pickup(tripId: string, user: AuthUser) {
    await this.getForDriverAction(tripId, user);
    const updated = await this.prisma.trip.update({
      where: { id: tripId },
      data: { status: 'VEHICLE_PICKED_UP' },
      include: TRIP_INCLUDE,
    });
    this.emitUpdate(updated);
    return updated;
  }

  private async getForDriverAction(tripId: string, user: AuthUser) {
    const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) throw new NotFoundException('Trip tidak ditemukan');
    if (user.role === 'DRIVER' && trip.driverId !== user.id) {
      throw new ForbiddenException('Trip ini bukan tugas Anda');
    }
    return trip;
  }

  async updateStatus(tripId: string, dto: UpdateTripStatusDto) {
    const updated = await this.prisma.trip.update({
      where: { id: tripId },
      data: { status: dto.status },
      include: TRIP_INCLUDE,
    });
    this.emitUpdate(updated);
    return updated;
  }

  private emitUpdate(trip: { id: string; order: { customerId: string } }) {
    this.realtime.emitTripUpdate({
      id: trip.id,
      orderCustomerId: trip.order.customerId,
    });
  }
}
