'use server';

import { redirect } from 'next/navigation';
import { setSession } from '@/lib/session';

const API_URL = process.env.API_URL ?? 'http://localhost:3001/api';

export async function loginAction(_prevState: { error?: string } | undefined, formData: FormData) {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  const res = await fetch(`${API_URL}/auth/internal/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    cache: 'no-store',
  });

  if (!res.ok) {
    return { error: 'Email atau password salah.' };
  }

  const data = await res.json();
  await setSession(data.accessToken);
  redirect('/dashboard');
}
