'use client';

import { useActionState } from 'react';
import { reportCheckpointAction } from './actions';
import type { Pool } from '@/lib/types';

export function ReportCheckpointForm({ tripId, pools }: { tripId: string; pools: Pool[] }) {
  const [state, action, pending] = useActionState(reportCheckpointAction, undefined);

  return (
    <form action={action} className="mt-2 space-y-2.5 rounded-md bg-amber-50/70 border border-amber-200/80 p-3.5">
      <input type="hidden" name="tripId" value={tripId} />
      <div>
        <label className="block text-xs font-semibold text-slate-700">Pilih Pool Tujuan Kedatangan</label>
        <select name="poolId" required className="mt-1 w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-sm text-slate-900 bg-white">
          <option value="">-- Pilih Lokasi Pool --</option>
          {pools.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700">Catatan Kondisi Unit (opsional)</label>
        <input name="reportNote" className="mt-1 w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-sm text-slate-900 bg-white" placeholder="Contoh: Unit tiba dalam kondisi bersih, bodi mulus..." />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
      >
        {pending ? 'Mengirim Laporan...' : '📍 Laporkan Tiba di Pool'}
      </button>
      {state?.ok && <p className="text-sm font-medium text-green-700">✓ Laporan terkirim! Menunggu verifikasi fisik oleh penjaga pool.</p>}
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
