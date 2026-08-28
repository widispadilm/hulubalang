import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { AssignTripDto, UpdateTripStatusDto } from './dto/trip.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import {
  CurrentUser,
  AuthUser,
} from '../common/decorators/current-user.decorator';

@Controller('trips')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TripsController {
  constructor(private trips: TripsService) {}

  @Get()
  @Roles('ADMIN', 'OPERATION', 'MARKETING', 'FINANCE', 'MANAGEMENT')
  findAll() {
    return this.trips.findAllInternal();
  }

  @Get('mine')
  @Roles('DRIVER')
  findMine(@CurrentUser() user: AuthUser) {
    return this.trips.findMineAsDriver(user.id);
  }

  @Get(':id')
  findOne(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.trips.findOneAuthorized(id, user);
  }

  @Post(':id/assign')
  @Roles('OPERATION', 'ADMIN')
  assign(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: AssignTripDto,
  ) {
    return this.trips.assign(id, user.id, dto);
  }

  @Post(':id/pickup')
  @Roles('DRIVER', 'OPERATION', 'ADMIN')
  pickup(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.trips.pickup(id, user);
  }

  @Post(':id/status')
  @Roles('OPERATION', 'ADMIN')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateTripStatusDto) {
    return this.trips.updateStatus(id, dto);
  }
}
