'use client';

import { useActionState } from 'react';
import { rejectCheckpointAction, verifyCheckpointAction } from './actions';

export function VerifyForm({ checkpointId }: { checkpointId: string }) {
  const [verifyState, verifyAction, verifyPending] = useActionState(
    (_p: { ok: boolean; error?: string } | undefined, fd: FormData) => verifyCheckpointAction(checkpointId, fd),
    undefined,
  );
  const [rejectState, rejectAction, rejectPending] = useActionState(
    (_p: { ok: boolean; error?: string } | undefined, fd: FormData) => rejectCheckpointAction(checkpointId, fd),
    undefined,
  );

  return (
    <div className="mt-3 flex flex-wrap items-start gap-2">
      <form action={verifyAction} className="flex items-center gap-2">
        <input name="verifyNote" placeholder="Catatan verifikasi (opsional)" className="rounded-md border border-slate-300 px-2.5 py-1.5 text-sm text-slate-900 bg-white" />
        <button
          type="submit"
          disabled={verifyPending}
          className="rounded-md bg-green-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50 cursor-pointer shadow-sm"
        >
          {verifyPending ? '...' : '✓ Verifikasi (Unit Sesuai)'}
        </button>
      </form>
      <form action={rejectAction} className="flex items-center gap-2">
        <input name="verifyNote" placeholder="Alasan penolakan" required className="rounded-md border border-slate-300 px-2.5 py-1.5 text-sm text-slate-900 bg-white" />
        <button
          type="submit"
          disabled={rejectPending}
          className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 cursor-pointer"
        >
          {rejectPending ? '...' : 'Tolak'}
        </button>
      </form>
      {(verifyState?.error || rejectState?.error) && (
        <p className="w-full text-sm text-red-600">{verifyState?.error ?? rejectState?.error}</p>
      )}
    </div>
  );
}
