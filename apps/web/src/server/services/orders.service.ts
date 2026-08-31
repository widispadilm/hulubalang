import { prisma } from '@/lib/prisma';
import type { SessionUser } from '@/lib/session';

export interface CreateVehicleInput {
  shipmentType: 'TOWING' | 'SELF_DRIVE';
  vehicleBrand: string;
  vehicleModel: string;
  plateNumber: string;
  chassisNumber: string;
  engineNumber: string;
}

export interface CreateOrderInput {
  pic: string;
  originCity: string;
  destinationCity: string;
  requestPickupDate: string;
  specialInstruction?: string;
  vehicles: CreateVehicleInput[];
}

const ORDER_INCLUDE = {
  customer: true,
  confirmedBy: true,
  trips: {
    include: {
      driver: true,
      assignedBy: true,
      checkpoints: {
        include: { pool: true, reportedBy: true, verifiedBy: true },
        orderBy: { reportedAt: 'asc' as const },
      },
    },
  },
  invoices: true,
} as const;

export const ordersService = {
  async createForCustomer(customerId: string, input: CreateOrderInput) {
    return prisma.order.create({
      data: {
        customerId,
        pic: input.pic,
        originCity: input.originCity,
        destinationCity: input.destinationCity,
        requestPickupDate: new Date(input.requestPickupDate),
        specialInstruction: input.specialInstruction,
        trips: {
          create: input.vehicles.map((v) => ({
            shipmentType: v.shipmentType,
            vehicleBrand: v.vehicleBrand,
            vehicleModel: v.vehicleModel,
            plateNumber: v.plateNumber,
            chassisNumber: v.chassisNumber,
            engineNumber: v.engineNumber,
          })),
        },
      },
      include: ORDER_INCLUDE,
    });
  },

  async findAllForCustomer(customerId: string) {
    return prisma.order.findMany({
      where: { customerId },
      include: ORDER_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  },

  async findAllInternal() {
    return prisma.order.findMany({
      include: ORDER_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  },

  async findOneAuthorized(id: string, user: SessionUser) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: ORDER_INCLUDE,
    });
    if (!order) throw new Error('Order tidak ditemukan');
    if (user.role === 'CUSTOMER' && order.customerId !== user.id) {
      throw new Error('Order ini bukan milik Anda');
    }
    return order;
  },

  async nextOrderNumber(): Promise<string> {
    const count = await prisma.order.count({
      where: { orderNumber: { not: null } },
    });
    return `PSS${String(count + 1).padStart(5, '0')}`;
  },

  async confirm(orderId: string, confirmedById: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) throw new Error('Order tidak ditemukan');
    if (order.status !== 'PENDING') throw new Error('Order sudah diproses');

    const orderNumber = await this.nextOrderNumber();
    return prisma.order.update({
      where: { id: orderId },
      data: { orderNumber, status: 'CONFIRMED', confirmedById },
      include: ORDER_INCLUDE,
    });
  },
};
