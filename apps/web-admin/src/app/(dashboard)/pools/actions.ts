'use server';

import { revalidatePath } from 'next/cache';
import { api, ApiError } from '@/lib/api';

export async function createPoolAction(_prev: { ok: boolean; error?: string } | undefined, formData: FormData) {
  const name = String(formData.get('name') ?? '');
  const address = String(formData.get('address') ?? '');
  try {
    await api.post('/pools', { name, address });
    revalidatePath('/pools');
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: e instanceof ApiError ? e.message : 'Gagal menambah pool' };
  }
}
