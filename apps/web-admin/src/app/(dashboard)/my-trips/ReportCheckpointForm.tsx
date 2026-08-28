'use client';

import { useActionState } from 'react';
import { reportCheckpointAction } from './actions';
import type { Pool } from '@/lib/types';

export function ReportCheckpointForm({ tripId, pools }: { tripId: string; pools: Pool[] }) {
  const [state, action, pending] = useActionState(reportCheckpointAction, undefined);

  return (
    <form action={action} className="mt-2 space-y-2 rounded-md bg-slate-50 p-3">
      <input type="hidden" name="tripId" value={tripId} />
      <div>
        <label className="block text-xs font-medium text-slate-600">Pool tujuan</label>
        <select name="poolId" required className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm">
          <option value="">Pilih pool</option>
          {pools.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600">Catatan (opsional)</label>
        <input name="reportNote" className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm" placeholder="Kondisi unit saat tiba..." />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {pending ? 'Mengirim...' : 'Laporkan Tiba di Pool'}
      </button>
      {state?.ok && <p className="text-sm text-green-700">Laporan terkirim, menunggu verifikasi penjaga pool.</p>}
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
