import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import {
  CurrentUser,
  AuthUser,
} from '../common/decorators/current-user.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private orders: OrdersService) {}

  @Post()
  @Roles('CUSTOMER')
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateOrderDto) {
    return this.orders.createForCustomer(user.id, dto);
  }

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    if (user.role === 'CUSTOMER')
      return this.orders.findAllForCustomer(user.id);
    return this.orders.findAllInternal();
  }

  @Get(':id')
  findOne(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.orders.findOneAuthorized(id, user);
  }

  @Post(':id/confirm')
  @Roles('MARKETING', 'ADMIN')
  confirm(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.orders.confirm(id, user.id);
  }
}
