import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PoolsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.pool.findMany({ orderBy: { name: 'asc' } });
  }

  create(name: string, address: string) {
    return this.prisma.pool.create({ data: { name, address } });
  }
}
