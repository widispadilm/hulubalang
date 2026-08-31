import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/session';

const OTP_TTL_MINUTES = 5;

function randomOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const authService = {
  async internalLogin(email: string, password: string) {
    const user = await prisma.internalUser.findUnique({
      where: { email },
    });
    if (!user || !user.active) {
      throw new Error('Email atau password salah');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new Error('Email atau password salah');
    }

    const accessToken = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },

  async requestCustomerOtp(email: string) {
    const customer = await prisma.customer.findUnique({
      where: { email },
    });
    if (!customer) {
      return { requested: true, devOtp: undefined };
    }

    const code = randomOtp();
    const codeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

    await prisma.otpCode.create({
      data: { customerId: customer.id, codeHash, expiresAt },
    });

    console.log(`[OTP] ${email} -> ${code} (berlaku ${OTP_TTL_MINUTES} menit)`);

    return {
      requested: true,
      devOtp: code,
    };
  },

  async verifyCustomerOtp(email: string, code: string) {
    const customer = await prisma.customer.findUnique({
      where: { email },
    });
    if (!customer) throw new Error('Kode OTP tidak valid');

    const otp = await prisma.otpCode.findFirst({
      where: { customerId: customer.id, consumedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    if (!otp || otp.expiresAt < new Date()) {
      throw new Error('Kode OTP tidak valid atau kedaluwarsa');
    }

    const valid = await bcrypt.compare(code, otp.codeHash);
    if (!valid) throw new Error('Kode OTP tidak valid');

    await prisma.otpCode.update({
      where: { id: otp.id },
      data: { consumedAt: new Date() },
    });

    const accessToken = signToken({
      id: customer.id,
      email: customer.email,
      role: 'CUSTOMER',
    });

    return {
      accessToken,
      customer: {
        id: customer.id,
        companyName: customer.companyName,
        email: customer.email,
      },
    };
  },
};
