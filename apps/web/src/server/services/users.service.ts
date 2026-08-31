import { prisma } from '@/lib/prisma';

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
