'use server';

import { redirect } from 'next/navigation';
import { authService } from '@/server/services/auth.service';
import { setCustomerSession } from '@/lib/session';

interface RequestState {
  ok?: boolean;
  email?: string;
  devOtp?: string;
  error?: string;
}

interface VerifyState {
  error?: string;
}

export async function requestOtpAction(_prev: RequestState | undefined, formData: FormData): Promise<RequestState> {
  const email = formData.get('email') as string;
  if (!email) return { error: 'Email wajib diisi' };

  try {
    const res = await authService.requestCustomerOtp(email);
    return { ok: true, email, devOtp: res.devOtp };
  } catch (err: any) {
    return { error: err.message ?? 'Gagal meminta OTP' };
  }
}

export async function verifyOtpAction(_prev: VerifyState | undefined, formData: FormData): Promise<VerifyState> {
  const email = formData.get('email') as string;
  const code = formData.get('code') as string;
  if (!email || !code) return { error: 'Email dan kode OTP wajib diisi' };

  try {
    const res = await authService.verifyCustomerOtp(email, code);
    await setCustomerSession(res.accessToken);
  } catch (err: any) {
    return { error: err.message ?? 'Gagal memverifikasi OTP' };
  }

  redirect('/orders');
}
