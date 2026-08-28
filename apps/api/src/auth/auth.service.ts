import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import type { AppRole } from '../common/decorators/roles.decorator';

const OTP_TTL_MINUTES = 5;

function randomOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  private sign(id: string, email: string, role: AppRole) {
    return this.jwt.sign({ id, email, role });
  }

  async internalLogin(email: string, password: string) {
    const user = await this.prisma.internalUser.findUnique({
      where: { email },
    });
    if (!user || !user.active)
      throw new UnauthorizedException('Email atau password salah');

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Email atau password salah');

    const accessToken = this.sign(user.id, user.email, user.role as AppRole);
    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async requestCustomerOtp(email: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });
    if (!customer) {
      // Jangan bocorkan apakah email terdaftar atau tidak
      return { requested: true };
    }

    const code = randomOtp();
    const codeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

    await this.prisma.otpCode.create({
      data: { customerId: customer.id, codeHash, expiresAt },
    });

    // TODO: integrasikan pengiriman email/WhatsApp OTP sungguhan.
    // Untuk sekarang, kode di-log ke console server (mode pengembangan).
    console.log(`[OTP] ${email} -> ${code} (berlaku ${OTP_TTL_MINUTES} menit)`);

    return {
      requested: true,
      devOtp: process.env.NODE_ENV !== 'production' ? code : undefined,
    };
  }

  async verifyCustomerOtp(email: string, code: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });
    if (!customer) throw new UnauthorizedException('Kode OTP tidak valid');

    const otp = await this.prisma.otpCode.findFirst({
      where: { customerId: customer.id, consumedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    if (!otp || otp.expiresAt < new Date()) {
      throw new UnauthorizedException('Kode OTP tidak valid atau kedaluwarsa');
    }

    const valid = await bcrypt.compare(code, otp.codeHash);
    if (!valid) throw new UnauthorizedException('Kode OTP tidak valid');

    await this.prisma.otpCode.update({
      where: { id: otp.id },
      data: { consumedAt: new Date() },
    });

    const accessToken = this.sign(customer.id, customer.email, 'CUSTOMER');
    return {
      accessToken,
      customer: {
        id: customer.id,
        companyName: customer.companyName,
        email: customer.email,
      },
    };
  }
}
