'use client';

import { useActionState } from 'react';
import { createPoolAction } from './actions';

export function CreatePoolForm() {
  const [state, action, pending] = useActionState(createPoolAction, undefined);

  return (
    <form action={action} className="mt-6 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <label className="block text-xs font-semibold text-slate-700">Nama Pool / Depot</label>
        <input name="name" required className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-pss-green-500 focus:outline-none" placeholder="Mis. Pool Semarang" />
      </div>
      <div className="flex-1 min-w-[240px]">
        <label className="block text-xs font-semibold text-slate-700">Alamat Lengkap Pool</label>
        <input name="address" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-pss-green-500 focus:outline-none" placeholder="Jl. Raya Utama No..." />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 cursor-pointer shadow-sm"
      >
        {pending ? 'Menyimpan...' : '+ Tambah Pool Baru'}
      </button>
      {state?.error && <p className="w-full text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
