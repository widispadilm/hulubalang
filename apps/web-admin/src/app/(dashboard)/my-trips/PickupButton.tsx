'use client';

import { useActionState } from 'react';
import { pickupTripAction } from './actions';

export function PickupButton({ tripId }: { tripId: string }) {
  const [state, action, pending] = useActionState(() => pickupTripAction(tripId), undefined);

  return (
    <form action={action}>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
      >
        {pending ? '...' : 'Tandai Sudah Diambil (Pickup)'}
      </button>
      {state?.error && <p className="mt-1 text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
