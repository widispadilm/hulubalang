import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CheckpointsService } from './checkpoints.service';
import {
  RejectCheckpointDto,
  ReportCheckpointDto,
  VerifyCheckpointDto,
} from './dto/checkpoint.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import {
  CurrentUser,
  AuthUser,
} from '../common/decorators/current-user.decorator';

@Controller('checkpoints')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CheckpointsController {
  constructor(private checkpoints: CheckpointsService) {}

  @Post('report')
  @Roles('DRIVER')
  report(@CurrentUser() user: AuthUser, @Body() dto: ReportCheckpointDto) {
    return this.checkpoints.report(user.id, dto);
  }

  @Get('pending')
  @Roles('POOL_KEEPER', 'ADMIN', 'OPERATION')
  findPending(@CurrentUser() user: AuthUser) {
    return this.checkpoints.findPending(user);
  }

  @Post(':id/verify')
  @Roles('POOL_KEEPER', 'ADMIN')
  verify(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: VerifyCheckpointDto,
  ) {
    return this.checkpoints.verify(id, user.id, dto.verifyNote);
  }

  @Post(':id/reject')
  @Roles('POOL_KEEPER', 'ADMIN')
  reject(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: RejectCheckpointDto,
  ) {
    return this.checkpoints.reject(id, user.id, dto.verifyNote);
  }
}
