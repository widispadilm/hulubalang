'use server';

import { redirect } from 'next/navigation';
import { setSession } from '@/lib/session';

const API_URL = process.env.API_URL ?? 'http://localhost:3001/api';

export interface RequestOtpState {
  ok: boolean;
  email?: string;
  devOtp?: string;
  error?: string;
}

export async function requestOtpAction(_prev: RequestOtpState | undefined, formData: FormData): Promise<RequestOtpState> {
  const email = String(formData.get('email') ?? '').trim();
  if (!email) return { ok: false, error: 'Email wajib diisi' };

  const res = await fetch(`${API_URL}/auth/customer/request-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
    cache: 'no-store',
  });

  if (!res.ok) return { ok: false, error: 'Gagal mengirim kode OTP, coba lagi.' };

  const data = await res.json();
  return { ok: true, email, devOtp: data.devOtp };
}

export interface VerifyOtpState {
  error?: string;
}

export async function verifyOtpAction(_prev: VerifyOtpState | undefined, formData: FormData): Promise<VerifyOtpState> {
  const email = String(formData.get('email') ?? '');
  const code = String(formData.get('code') ?? '');

  const res = await fetch(`${API_URL}/auth/customer/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
    cache: 'no-store',
  });

  if (!res.ok) return { error: 'Kode OTP salah atau kedaluwarsa.' };

  const data = await res.json();
  await setSession(data.accessToken);
  redirect('/orders');
}
