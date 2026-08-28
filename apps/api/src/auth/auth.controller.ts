import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InternalLoginDto, RequestOtpDto, VerifyOtpDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('internal/login')
  internalLogin(@Body() dto: InternalLoginDto) {
    return this.auth.internalLogin(dto.email, dto.password);
  }

  @Post('customer/request-otp')
  requestOtp(@Body() dto: RequestOtpDto) {
    return this.auth.requestCustomerOtp(dto.email);
  }

  @Post('customer/verify-otp')
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.auth.verifyCustomerOtp(dto.email, dto.code);
  }
}
