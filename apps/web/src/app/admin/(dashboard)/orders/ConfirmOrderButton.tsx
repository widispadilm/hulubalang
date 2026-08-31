'use client';

import { useActionState } from 'react';
import { confirmOrderAction } from './actions';

export function ConfirmOrderButton({ orderId }: { orderId: string }) {
  const [state, action, pending] = useActionState(() => confirmOrderAction(orderId), undefined);

  return (
    <form action={action}>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-pss-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pss-green-600 disabled:opacity-50 cursor-pointer shadow-sm"
      >
        {pending ? 'Memproses...' : '✓ Konfirmasi Order (Marketing)'}
      </button>
      {state?.error && <p className="mt-2 text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
