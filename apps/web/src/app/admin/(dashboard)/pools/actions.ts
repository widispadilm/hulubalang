'use server';

import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/session';
import { poolsService } from '@/server/services/pools.service';

export async function createPoolAction(_prev: { ok: boolean; error?: string } | undefined, formData: FormData) {
  const session = await getAdminSession();
  if (!session) return { ok: false as const, error: 'Sesi berakhir, silakan login kembali' };

  const name = String(formData.get('name') ?? '');
  const address = String(formData.get('address') ?? '');

  if (!name || !address) {
    return { ok: false as const, error: 'Nama dan alamat pool wajib diisi' };
  }

  try {
    await poolsService.create({ name, address });
    revalidatePath('/admin/pools');
    return { ok: true as const };
  } catch (e: any) {
    return { ok: false as const, error: e.message ?? 'Gagal menambah pool' };
  }
}
