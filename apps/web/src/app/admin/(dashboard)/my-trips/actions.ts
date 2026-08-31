'use server';

import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/session';
import { tripsService } from '@/server/services/trips.service';
import { checkpointsService } from '@/server/services/checkpoints.service';

export async function pickupTripAction(tripId: string) {
  const session = await getAdminSession();
  if (!session) return { ok: false as const, error: 'Sesi berakhir, silakan login kembali' };

  try {
    await tripsService.pickup(tripId, session.user);
    revalidatePath('/admin/my-trips');
    revalidatePath('/admin/orders');
    return { ok: true as const };
  } catch (e: any) {
    return { ok: false as const, error: e.message ?? 'Gagal update pickup' };
  }
}

export async function reportCheckpointAction(_prev: { ok: boolean; error?: string } | undefined, formData: FormData) {
  const session = await getAdminSession();
  if (!session) return { ok: false as const, error: 'Sesi berakhir, silakan login kembali' };

  const tripId = String(formData.get('tripId') ?? '');
  const poolId = String(formData.get('poolId') ?? '');
  const reportNote = String(formData.get('reportNote') ?? '') || undefined;

  try {
    await checkpointsService.report(session.user.id, { tripId, poolId, reportNote });
    revalidatePath('/admin/my-trips');
    revalidatePath('/admin/checkpoints');
    return { ok: true as const };
  } catch (e: any) {
    return { ok: false as const, error: e.message ?? 'Gagal melaporkan checkpoint' };
  }
}
