import { Module } from '@nestjs/common';
import { PoolsService } from './pools.service';
import { PoolsController } from './pools.controller';

@Module({
  providers: [PoolsService],
  controllers: [PoolsController],
  exports: [PoolsService],
})
export class PoolsModule {}
