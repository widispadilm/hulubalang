'use server';

import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/session';
import { checkpointsService } from '@/server/services/checkpoints.service';

export async function verifyCheckpointAction(checkpointId: string, formData: FormData) {
  const session = await getAdminSession();
  if (!session) return { ok: false as const, error: 'Sesi berakhir, silakan login kembali' };

  const verifyNote = String(formData.get('verifyNote') ?? '') || undefined;
  try {
    await checkpointsService.verify(checkpointId, session.user.id, verifyNote);
    revalidatePath('/admin/checkpoints');
    revalidatePath('/admin/orders');
    revalidatePath('/admin/trips');
    return { ok: true as const };
  } catch (e: any) {
    return { ok: false as const, error: e.message ?? 'Gagal verifikasi' };
  }
}

export async function rejectCheckpointAction(checkpointId: string, formData: FormData) {
  const session = await getAdminSession();
  if (!session) return { ok: false as const, error: 'Sesi berakhir, silakan login kembali' };

  const verifyNote = String(formData.get('verifyNote') ?? '');
  try {
    await checkpointsService.reject(checkpointId, session.user.id, verifyNote);
    revalidatePath('/admin/checkpoints');
    return { ok: true as const };
  } catch (e: any) {
    return { ok: false as const, error: e.message ?? 'Gagal menolak laporan' };
  }
}
