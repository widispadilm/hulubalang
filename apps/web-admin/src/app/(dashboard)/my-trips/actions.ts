'use server';

import { revalidatePath } from 'next/cache';
import { api, ApiError } from '@/lib/api';

export async function pickupTripAction(tripId: string) {
  try {
    await api.post(`/trips/${tripId}/pickup`);
    revalidatePath('/my-trips');
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: e instanceof ApiError ? e.message : 'Gagal update pickup' };
  }
}

export async function reportCheckpointAction(_prev: { ok: boolean; error?: string } | undefined, formData: FormData) {
  const tripId = String(formData.get('tripId') ?? '');
  const poolId = String(formData.get('poolId') ?? '');
  const reportNote = String(formData.get('reportNote') ?? '') || undefined;

  try {
    await api.post('/checkpoints/report', { tripId, poolId, reportNote });
    revalidatePath('/my-trips');
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: e instanceof ApiError ? e.message : 'Gagal melaporkan checkpoint' };
  }
}
