'use client';

import { useActionState } from 'react';
import { updateTripStatusAction } from './actions';

const STATUS_OPTIONS = [
  ['IN_TRANSIT', 'Dalam Perjalanan'],
  ['AT_ORIGIN_PORT', 'Di Pelabuhan Asal'],
  ['ON_VESSEL', 'Di Atas Kapal'],
  ['AT_DESTINATION_PORT', 'Di Pelabuhan Tujuan'],
  ['OUT_FOR_DELIVERY', 'Menuju Pengiriman'],
  ['DELIVERED', 'Terkirim'],
  ['DELAY', 'Delay'],
  ['HOLD', 'Ditahan'],
  ['CLAIM', 'Klaim Asuransi'],
  ['CANCELED', 'Dibatalkan'],
] as const;

export function TripStatusForm({ tripId }: { tripId: string }) {
  const [state, action, pending] = useActionState(
    (_prev: { ok: boolean; error?: string } | undefined, formData: FormData) =>
      updateTripStatusAction(tripId, String(formData.get('status'))),
    undefined,
  );

  return (
    <form action={action} className="mt-2 flex items-center gap-2">
      <select name="status" required className="rounded-md border border-slate-300 px-2 py-1.5 text-sm text-slate-900 bg-white">
        <option value="">Ubah status manual...</option>
        {STATUS_OPTIONS.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50 cursor-pointer"
      >
        {pending ? '...' : 'Update'}
      </button>
      {state?.error && <span className="text-sm text-red-600">{state.error}</span>}
    </form>
  );
}
