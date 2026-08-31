'use server';

import { redirect } from 'next/navigation';
import { authService } from '@/server/services/auth.service';
import { setAdminSession } from '@/lib/session';

export async function loginAction(_prevState: { error?: string } | undefined, formData: FormData) {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    return { error: 'Email dan password wajib diisi.' };
  }

  let role = '';
  try {
    const data = await authService.internalLogin(email, password);
    await setAdminSession(data.accessToken);
    role = data.user.role;
  } catch (err: any) {
    return { error: err.message ?? 'Email atau password salah.' };
  }

  if (role === 'DRIVER') {
    redirect('/admin/my-trips');
  } else if (role === 'POOL_KEEPER') {
    redirect('/admin/checkpoints');
  } else {
    redirect('/admin/dashboard');
  }
}
