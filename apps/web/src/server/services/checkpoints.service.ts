import { prisma } from '@/lib/prisma';
import type { SessionUser } from '@/lib/session';

export interface ReportCheckpointInput {
  tripId: string;
  poolId: string;
  reportNote?: string;
  photoUrl?: string;
}

const CHECKPOINT_INCLUDE = {
  trip: { include: { order: true } },
  pool: true,
  reportedBy: true,
  verifiedBy: true,
} as const;

export const checkpointsService = {
  async report(driverId: string, input: ReportCheckpointInput) {
    const trip = await prisma.trip.findUnique({
      where: { id: input.tripId },
    });
    if (!trip) throw new Error('Trip tidak ditemukan');
    if (trip.driverId !== driverId) throw new Error('Trip ini bukan tugas Anda');

    const checkpoint = await prisma.tripCheckpoint.create({
      data: {
        tripId: input.tripId,
        poolId: input.poolId,
        reportedById: driverId,
        reportNote: input.reportNote,
        photoUrl: input.photoUrl,
      },
      include: CHECKPOINT_INCLUDE,
    });

    await prisma.trip.update({
      where: { id: input.tripId },
      data: { status: 'REPORTED_AT_POOL' },
    });

    return checkpoint;
  },

  async findPending(user: SessionUser) {
    if (user.role === 'POOL_KEEPER') {
      const keeper = await prisma.internalUser.findUnique({
        where: { id: user.id },
        include: { managedPools: true },
      });
      const poolIds = keeper?.managedPools.map((p) => p.id) ?? [];
      return prisma.tripCheckpoint.findMany({
        where: { status: 'REPORTED', poolId: { in: poolIds } },
        include: CHECKPOINT_INCLUDE,
        orderBy: { reportedAt: 'asc' },
      });
    }

    return prisma.tripCheckpoint.findMany({
      where: { status: 'REPORTED' },
      include: CHECKPOINT_INCLUDE,
      orderBy: { reportedAt: 'asc' },
    });
  },

  async verify(checkpointId: string, verifiedById: string, verifyNote?: string) {
    const checkpoint = await this.assertVerifiable(checkpointId, verifiedById);

    const updated = await prisma.tripCheckpoint.update({
      where: { id: checkpointId },
      data: {
        status: 'VERIFIED',
        verifiedById,
        verifiedAt: new Date(),
        verifyNote,
      },
      include: CHECKPOINT_INCLUDE,
    });

    await prisma.trip.update({
      where: { id: checkpoint.tripId },
      data: { status: 'AT_POOL' },
    });

    return updated;
  },

  async reject(checkpointId: string, verifiedById: string, verifyNote: string) {
    await this.assertVerifiable(checkpointId, verifiedById);

    return prisma.tripCheckpoint.update({
      where: { id: checkpointId },
      data: {
        status: 'REJECTED',
        verifiedById,
        verifiedAt: new Date(),
        verifyNote,
      },
      include: CHECKPOINT_INCLUDE,
    });
  },

  async assertVerifiable(checkpointId: string, verifierId: string) {
    const checkpoint = await prisma.tripCheckpoint.findUnique({
      where: { id: checkpointId },
    });
    if (!checkpoint) throw new Error('Checkpoint tidak ditemukan');
    if (checkpoint.status !== 'REPORTED') throw new Error('Checkpoint sudah diproses');

    const verifier = await prisma.internalUser.findUnique({
      where: { id: verifierId },
      include: { managedPools: true },
    });
    if (verifier?.role === 'POOL_KEEPER') {
      const managesThisPool = verifier.managedPools.some((p) => p.id === checkpoint.poolId);
      if (!managesThisPool) throw new Error('Anda tidak bertugas di pool ini');
    }

    return checkpoint;
  },
};
