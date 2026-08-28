import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import type { AuthUser } from '../common/decorators/current-user.decorator';

const ORDER_INCLUDE = {
  customer: true,
  confirmedBy: true,
  trips: {
    include: {
      driver: true,
      checkpoints: {
        include: { pool: true, reportedBy: true, verifiedBy: true },
        orderBy: { reportedAt: 'asc' },
      },
    },
  },
  invoices: true,
} as const;

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createForCustomer(customerId: string, dto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        customerId,
        pic: dto.pic,
        originCity: dto.originCity,
        destinationCity: dto.destinationCity,
        requestPickupDate: new Date(dto.requestPickupDate),
        specialInstruction: dto.specialInstruction,
        trips: {
          create: dto.vehicles.map((v) => ({
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
  }

  findAllForCustomer(customerId: string) {
    return this.prisma.order.findMany({
      where: { customerId },
      include: ORDER_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  }

  findAllInternal() {
    return this.prisma.order.findMany({
      include: ORDER_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneAuthorized(id: string, user: AuthUser) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: ORDER_INCLUDE,
    });
    if (!order) throw new NotFoundException('Order tidak ditemukan');
    if (user.role === 'CUSTOMER' && order.customerId !== user.id) {
      throw new ForbiddenException('Order ini bukan milik Anda');
    }
    return order;
  }

  private async nextOrderNumber(): Promise<string> {
    const count = await this.prisma.order.count({
      where: { orderNumber: { not: null } },
    });
    return `PSS${String(count + 1).padStart(5, '0')}`;
  }

  async confirm(orderId: string, confirmedById: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) throw new NotFoundException('Order tidak ditemukan');
    if (order.status !== 'PENDING')
      throw new ForbiddenException('Order sudah diproses');

    const orderNumber = await this.nextOrderNumber();
    return this.prisma.order.update({
      where: { id: orderId },
      data: { orderNumber, status: 'CONFIRMED', confirmedById },
      include: ORDER_INCLUDE,
    });
  }
}
