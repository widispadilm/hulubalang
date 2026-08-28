'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { StatusBadge } from '@/lib/status-badge';
import type { Trip } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';
const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? 'http://localhost:3001';

export function TrackingClient({ initialTrip, token, customerId }: { initialTrip: Trip; token: string; customerId: string }) {
  const [trip, setTrip] = useState(initialTrip);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const socket = io(WS_URL, { auth: { token } });

    socket.on('connect', () => {
      setLive(true);
      socket.emit('join', `trip:${initialTrip.id}`);
      socket.emit('join', `customer:${customerId}`);
    });

    socket.on('disconnect', () => setLive(false));

    socket.on('trip:update', async (payload: { id: string }) => {
      if (payload.id !== initialTrip.id) return;
      const res = await fetch(`${API_URL}/trips/${initialTrip.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      if (res.ok) setTrip(await res.json());
    });

    return () => {
      socket.disconnect();
    };
  }, [initialTrip.id, customerId, token]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{trip.tripNumber}</h1>
          <p className="text-sm text-slate-500">
            {trip.vehicleBrand} {trip.vehicleModel} ({trip.plateNumber})
          </p>
        </div>
        <div className="text-right">
          <StatusBadge status={trip.status} />
          <p className="mt-1 text-xs text-slate-400">
            <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${live ? 'bg-green-500' : 'bg-slate-300'}`} />
            {live ? 'Live' : 'Menghubungkan...'}
          </p>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Riwayat Perjalanan</h2>
      <ol className="mt-4 space-y-4 border-l-2 border-slate-200 pl-6">
        {trip.checkpoints.length === 0 && <p className="text-sm text-slate-400">Belum ada checkpoint tercatat.</p>}
        {trip.checkpoints.map((cp) => (
          <li key={cp.id} className="relative">
            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-slate-900" />
            <p className="text-sm font-semibold text-slate-900">{cp.pool.name}</p>
            <p className="text-xs text-slate-500">
              Dilaporkan tiba oleh driver pada {new Date(cp.reportedAt).toLocaleString('id-ID')}
            </p>
            {cp.verifiedBy ? (
              <p className="mt-1 text-xs font-medium text-green-700">
                ✓ Terverifikasi oleh penjaga pool {cp.verifiedAt && `· ${new Date(cp.verifiedAt).toLocaleString('id-ID')}`}
              </p>
            ) : (
              <p className="mt-1 text-xs font-medium text-amber-700">Menunggu verifikasi penjaga pool...</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
