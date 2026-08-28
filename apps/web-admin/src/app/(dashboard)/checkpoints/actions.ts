'use server';

import { revalidatePath } from 'next/cache';
import { api, ApiError } from '@/lib/api';

export async function verifyCheckpointAction(checkpointId: string, formData: FormData) {
  const verifyNote = String(formData.get('verifyNote') ?? '') || undefined;
  try {
    await api.post(`/checkpoints/${checkpointId}/verify`, { verifyNote });
    revalidatePath('/checkpoints');
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: e instanceof ApiError ? e.message : 'Gagal verifikasi' };
  }
}

export async function rejectCheckpointAction(checkpointId: string, formData: FormData) {
  const verifyNote = String(formData.get('verifyNote') ?? '');
  try {
    await api.post(`/checkpoints/${checkpointId}/reject`, { verifyNote });
    revalidatePath('/checkpoints');
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: e instanceof ApiError ? e.message : 'Gagal menolak laporan' };
  }
}
