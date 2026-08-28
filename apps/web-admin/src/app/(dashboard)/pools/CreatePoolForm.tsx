'use client';

import { useActionState } from 'react';
import { createPoolAction } from './actions';

export function CreatePoolForm() {
  const [state, action, pending] = useActionState(createPoolAction, undefined);

  return (
    <form action={action} className="mt-4 flex flex-wrap items-end gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <label className="block text-xs font-medium text-slate-600">Nama Pool</label>
        <input name="name" required className="mt-1 rounded-md border border-slate-300 px-2 py-1.5 text-sm" placeholder="Pool Semarang" />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-slate-600">Alamat</label>
        <input name="address" required className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm" placeholder="Jl. ..." />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {pending ? 'Menyimpan...' : 'Tambah Pool'}
      </button>
      {state?.error && <p className="w-full text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
