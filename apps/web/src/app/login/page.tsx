'use client';

import { useActionState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { requestOtpAction, verifyOtpAction } from './actions';

export default function LoginPage() {
  const [requestState, requestAction, requestPending] = useActionState(requestOtpAction, undefined);
  const [verifyState, verifyAction, verifyPending] = useActionState(verifyOtpAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  const step = requestState?.ok ? 'otp' : 'email';

  // Auto-submit in dev mode or with demo OTP
  useEffect(() => {
    if (step === 'otp' && requestState?.devOtp && formRef.current) {
      const timer = setTimeout(() => {
        formRef.current?.requestSubmit();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [step, requestState?.devOtp]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <Link href="/" className="text-xs font-medium text-slate-400 hover:text-slate-600">← Kembali ke beranda</Link>
        <h1 className="mt-2 text-xl font-bold text-slate-900">Login Pelanggan</h1>
        <p className="mt-1 text-sm text-slate-500">Masuk dengan email yang terdaftar. Kami akan mengirimkan kode OTP.</p>

        {step === 'email' && (
          <form action={requestAction} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                name="email"
                type="email"
                required
                defaultValue="customer@abc.co.id"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                placeholder="customer@abc.co.id"
              />
            </div>
            {requestState?.error && <p className="text-sm text-red-600">{requestState.error}</p>}
            <button
              type="submit"
              disabled={requestPending}
              className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {requestPending ? 'Mengirim...' : 'Kirim Kode OTP'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form ref={formRef} action={verifyAction} className="mt-6 space-y-4">
            <input type="hidden" name="email" value={requestState?.email} />
            <p className="text-sm text-slate-600">
              Kode OTP telah dibuat untuk <span className="font-medium">{requestState?.email}</span>.
            </p>
            {requestState?.devOtp && (
              <p className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
                Mode demonstrasi — Kode OTP Anda: <span className="font-mono font-bold">{requestState.devOtp}</span>
              </p>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700">Kode OTP</label>
              <input
                name="code"
                required
                maxLength={6}
                defaultValue={requestState?.devOtp || ''}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-center text-lg tracking-[0.5em] focus:border-slate-500 focus:outline-none"
                placeholder="------"
              />
            </div>
            {verifyState?.error && <p className="text-sm text-red-600">{verifyState.error}</p>}
            <button
              type="submit"
              disabled={verifyPending}
              className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {verifyPending ? 'Memverifikasi...' : 'Masuk'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
