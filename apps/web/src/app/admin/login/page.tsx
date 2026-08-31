'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { loginAction } from './actions';

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <Link href="/" className="text-xs font-medium text-slate-400 hover:text-slate-600">← Kembali ke Website</Link>
        <h1 className="mt-2 text-xl font-bold text-slate-900">Portal Internal Hulubalang</h1>
        <p className="mt-1 text-sm text-slate-500">Masuk untuk Admin, Marketing, Operation, Finance, Driver, dan Penjaga Pool.</p>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email Internal</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-pss-green-500 focus:outline-none focus:ring-1 focus:ring-pss-green-500"
              placeholder="admin@pss.co.id"
              defaultValue="admin@pss.co.id"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-pss-green-500 focus:outline-none focus:ring-1 focus:ring-pss-green-500"
              placeholder="••••••••"
              defaultValue="password123"
            />
          </div>

          {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
          >
            {pending ? 'Memproses...' : 'Masuk ke Sistem'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 space-y-1">
          <p className="font-semibold text-slate-600">Akun Uji Coba Default (Password: password123):</p>
          <p>• Admin: admin@pss.co.id</p>
          <p>• Marketing: marketing@pss.co.id</p>
          <p>• Operation: operation@pss.co.id</p>
          <p>• Driver: driver1@pss.co.id</p>
          <p>• Penjaga Pool: keeper.bekasi@pss.co.id</p>
        </div>
      </div>
    </div>
  );
}
