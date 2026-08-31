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
        className="rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 cursor-pointer shadow-sm"
      >
        {pending ? 'Memproses...' : '🚗 Tandai Sudah Diambil (Pickup)'}
      </button>
      {state?.error && <p className="mt-1 text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
