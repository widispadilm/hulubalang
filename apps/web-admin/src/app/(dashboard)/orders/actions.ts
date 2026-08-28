'use server';

import { revalidatePath } from 'next/cache';
import { api, ApiError } from '@/lib/api';

export async function confirmOrderAction(orderId: string) {
  try {
    await api.post(`/orders/${orderId}/confirm`);
    revalidatePath(`/orders/${orderId}`);
    revalidatePath('/orders');
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: e instanceof ApiError ? e.message : 'Gagal konfirmasi order' };
  }
}

export async function assignTripAction(tripId: string, formData: FormData) {
  const driverId = String(formData.get('driverId') ?? '');
  const eta = String(formData.get('eta') ?? '');
  const shipmentType = String(formData.get('shipmentType') ?? '') || undefined;

  try {
    await api.post(`/trips/${tripId}/assign`, {
      driverId,
      eta: new Date(eta).toISOString(),
      shipmentType,
    });
    revalidatePath('/orders');
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: e instanceof ApiError ? e.message : 'Gagal menugaskan trip' };
  }
}

export async function updateTripStatusAction(tripId: string, status: string) {
  try {
    await api.post(`/trips/${tripId}/status`, { status });
    revalidatePath('/orders');
    revalidatePath('/trips');
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: e instanceof ApiError ? e.message : 'Gagal mengubah status' };
  }
}
