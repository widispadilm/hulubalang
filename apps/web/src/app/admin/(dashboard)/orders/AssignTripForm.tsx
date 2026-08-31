'use client';

import { useActionState } from 'react';
import { assignTripAction } from './actions';
import type { InternalUserRef } from '@/lib/types';

export function AssignTripForm({ tripId, drivers }: { tripId: string; drivers: InternalUserRef[] }) {
  const [state, action, pending] = useActionState(
    (_prev: { ok: boolean; error?: string } | undefined, formData: FormData) => assignTripAction(tripId, formData),
    undefined,
  );

  return (
    <form action={action} className="mt-2 flex flex-wrap items-end gap-2 rounded-md bg-slate-50 p-3 border border-slate-200">
      <div>
        <label className="block text-xs font-medium text-slate-600">Tugaskan Driver</label>
        <select name="driverId" required className="mt-1 rounded-md border border-slate-300 px-2 py-1.5 text-sm text-slate-900 bg-white">
          <option value="">Pilih Driver</option>
          {drivers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600">Estimasi Tiba (ETA)</label>
        <input name="eta" type="datetime-local" required className="mt-1 rounded-md border border-slate-300 px-2 py-1.5 text-sm text-slate-900 bg-white" />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600">Jenis Pengiriman</label>
        <select name="shipmentType" className="mt-1 rounded-md border border-slate-300 px-2 py-1.5 text-sm text-slate-900 bg-white">
          <option value="">(tidak diubah)</option>
          <option value="TOWING">Towing</option>
          <option value="SELF_DRIVE">Self Drive</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
      >
        {pending ? 'Menyimpan...' : 'Assign Trip'}
      </button>
      {state?.error && <p className="w-full text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
