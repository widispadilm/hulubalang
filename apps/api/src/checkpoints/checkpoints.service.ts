import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RealtimeGateway } from '../realtime/realtime.gateway';
import { ReportCheckpointDto } from './dto/checkpoint.dto';
import type { AuthUser } from '../common/decorators/current-user.decorator';

const CHECKPOINT_INCLUDE = {
  trip: { include: { order: true } },
  pool: true,
  reportedBy: true,
  verifiedBy: true,
} as const;

@Injectable()
export class CheckpointsService {
  constructor(
    private prisma: PrismaService,
    private realtime: RealtimeGateway,
  ) {}

  async report(driverId: string, dto: ReportCheckpointDto) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: dto.tripId },
    });
    if (!trip) throw new NotFoundException('Trip tidak ditemukan');
    if (trip.driverId !== driverId)
      throw new ForbiddenException('Trip ini bukan tugas Anda');

    const checkpoint = await this.prisma.tripCheckpoint.create({
      data: {
        tripId: dto.tripId,
        poolId: dto.poolId,
        reportedById: driverId,
        reportNote: dto.reportNote,
        photoUrl: dto.photoUrl,
      },
      include: CHECKPOINT_INCLUDE,
    });

    const updatedTrip = await this.prisma.trip.update({
      where: { id: dto.tripId },
      data: { status: 'REPORTED_AT_POOL' },
      include: { order: true },
    });
    this.realtime.emitTripUpdate({
      id: updatedTrip.id,
      orderCustomerId: updatedTrip.order.customerId,
    });

    return checkpoint;
  }

  async findPending(user: AuthUser) {
    if (user.role === 'POOL_KEEPER') {
      const keeper = await this.prisma.internalUser.findUnique({
        where: { id: user.id },
        include: { managedPools: true },
      });
      const poolIds = keeper?.managedPools.map((p) => p.id) ?? [];
      return this.prisma.tripCheckpoint.findMany({
        where: { status: 'REPORTED', poolId: { in: poolIds } },
        include: CHECKPOINT_INCLUDE,
        orderBy: { reportedAt: 'asc' },
      });
    }

    return this.prisma.tripCheckpoint.findMany({
      where: { status: 'REPORTED' },
      include: CHECKPOINT_INCLUDE,
      orderBy: { reportedAt: 'asc' },
    });
  }

  async verify(
    checkpointId: string,
    verifiedById: string,
    verifyNote?: string,
  ) {
    const checkpoint = await this.assertVerifiable(checkpointId, verifiedById);

    const updated = await this.prisma.tripCheckpoint.update({
      where: { id: checkpointId },
      data: {
        status: 'VERIFIED',
        verifiedById,
        verifiedAt: new Date(),
        verifyNote,
      },
      include: CHECKPOINT_INCLUDE,
    });

    const trip = await this.prisma.trip.update({
      where: { id: checkpoint.tripId },
      data: { status: 'AT_POOL' },
      include: { order: true },
    });
    this.realtime.emitTripUpdate({
      id: trip.id,
      orderCustomerId: trip.order.customerId,
    });

    return updated;
  }

  async reject(checkpointId: string, verifiedById: string, verifyNote: string) {
    await this.assertVerifiable(checkpointId, verifiedById);

    return this.prisma.tripCheckpoint.update({
      where: { id: checkpointId },
      data: {
        status: 'REJECTED',
        verifiedById,
        verifiedAt: new Date(),
        verifyNote,
      },
      include: CHECKPOINT_INCLUDE,
    });
  }

  private async assertVerifiable(checkpointId: string, verifierId: string) {
    const checkpoint = await this.prisma.tripCheckpoint.findUnique({
      where: { id: checkpointId },
    });
    if (!checkpoint) throw new NotFoundException('Checkpoint tidak ditemukan');
    if (checkpoint.status !== 'REPORTED')
      throw new ForbiddenException('Checkpoint sudah diproses');

    const verifier = await this.prisma.internalUser.findUnique({
      where: { id: verifierId },
      include: { managedPools: true },
    });
    if (verifier?.role === 'POOL_KEEPER') {
      const managesThisPool = verifier.managedPools.some(
        (p) => p.id === checkpoint.poolId,
      );
      if (!managesThisPool)
        throw new ForbiddenException('Anda tidak bertugas di pool ini');
    }

    return checkpoint;
  }
}
