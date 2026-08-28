import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { IsString, MinLength } from 'class-validator';
import { PoolsService } from './pools.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

class CreatePoolDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  address: string;
}

@Controller('pools')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PoolsController {
  constructor(private pools: PoolsService) {}

  @Get()
  findAll() {
    return this.pools.findAll();
  }

  @Post()
  @Roles('ADMIN', 'OPERATION')
  create(@Body() dto: CreatePoolDto) {
    return this.pools.create(dto.name, dto.address);
  }
}
