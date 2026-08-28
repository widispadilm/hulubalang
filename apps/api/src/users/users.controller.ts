import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import type { InternalRole } from '@prisma/client';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'OPERATION', 'MARKETING', 'MANAGEMENT')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get()
  findAll(@Query('role') role?: InternalRole) {
    return this.users.findByRole(role);
  }
}
