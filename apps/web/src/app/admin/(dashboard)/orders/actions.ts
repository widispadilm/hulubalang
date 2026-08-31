'use server';

import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/lib/session';
import { ordersService } from '@/server/services/orders.service';
import { tripsService } from '@/server/services/trips.service';
import type { ShipmentType, TripStatus } from '@prisma/client';

export async function confirmOrderAction(orderId: string) {
  const session = await getAdminSession();
  if (!session) return { ok: false as const, error: 'Sesi berakhir, silakan login kembali' };

  try {
    await ordersService.confirm(orderId, session.user.id);
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath('/admin/orders');
    return { ok: true as const };
  } catch (e: any) {
    return { ok: false as const, error: e.message ?? 'Gagal konfirmasi order' };
  }
}

export async function assignTripAction(tripId: string, formData: FormData) {
  const session = await getAdminSession();
  if (!session) return { ok: false as const, error: 'Sesi berakhir, silakan login kembali' };

  const driverId = String(formData.get('driverId') ?? '');
  const eta = String(formData.get('eta') ?? '');
  const shipmentType = String(formData.get('shipmentType') ?? '') as ShipmentType || undefined;

  try {
    await tripsService.assign(tripId, session.user.id, {
      driverId,
      eta,
      shipmentType,
    });
    revalidatePath('/admin/orders');
    revalidatePath('/admin/trips');
    return { ok: true as const };
  } catch (e: any) {
    return { ok: false as const, error: e.message ?? 'Gagal menugaskan trip' };
  }
}

export async function updateTripStatusAction(tripId: string, status: string) {
  const session = await getAdminSession();
  if (!session) return { ok: false as const, error: 'Sesi berakhir, silakan login kembali' };

  try {
    await tripsService.updateStatus(tripId, status as TripStatus);
    revalidatePath('/admin/orders');
    revalidatePath('/admin/trips');
    return { ok: true as const };
  } catch (e: any) {
    return { ok: false as const, error: e.message ?? 'Gagal mengubah status' };
  }
}
