import { prisma } from '@/lib/prisma';

export const poolsService = {
  async findAll() {
    return prisma.pool.findMany({
      include: {
        keepers: { select: { id: true, name: true, email: true } },
      },
      orderBy: { name: 'asc' },
    });
  },

  async create(data: { name: string; address: string; keeperIds?: string[] }) {
    return prisma.pool.create({
      data: {
        name: data.name,
        address: data.address,
        keepers: data.keeperIds && data.keeperIds.length > 0
          ? { connect: data.keeperIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { keepers: true },
    });
  },
};

export const usersService = {
  async findDrivers() {
    return prisma.internalUser.findMany({
      where: { role: 'DRIVER', active: true },
      select: { id: true, name: true, email: true, role: true },
      orderBy: { name: 'asc' },
    });
  },

  async findKeepers() {
    return prisma.internalUser.findMany({
      where: { role: 'POOL_KEEPER', active: true },
      select: { id: true, name: true, email: true, role: true },
      orderBy: { name: 'asc' },
    });
  },
};
