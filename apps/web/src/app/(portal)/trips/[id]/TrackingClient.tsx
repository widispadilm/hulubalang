'use client';

import { useEffect, useState, useTransition } from 'react';
import { supabase } from '@/lib/supabase';
import { StatusBadge } from '@/lib/status-badge';
import type { Trip } from '@/lib/types';
import { getTripAction } from './actions';

export function TrackingClient({ initialTrip }: { initialTrip: Trip }) {
  const [trip, setTrip] = useState(initialTrip);
  const [live, setLive] = useState(true);
  const [, startTransition] = useTransition();

  const refresh = () => {
    startTransition(async () => {
      const updated = await getTripAction(initialTrip.id);
      if (updated) setTrip(updated);
    });
  };

  useEffect(() => {
    // Realtime listener via Supabase
    const channel = supabase
      .channel(`realtime:trip:${initialTrip.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Trip', filter: `id=eq.${initialTrip.id}` },
        () => {
          refresh();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'TripCheckpoint', filter: `tripId=eq.${initialTrip.id}` },
        () => {
          refresh();
        }
      )
      .subscribe((status) => {
        setLive(status === 'SUBSCRIBED');
      });

    // Fallback periodic refresh every 5 seconds
    const interval = setInterval(refresh, 5000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [initialTrip.id]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{trip.tripNumber ?? 'Menunggu Trip Number'}</h1>
          <p className="text-sm text-slate-500">
            {trip.vehicleBrand} {trip.vehicleModel} ({trip.plateNumber})
          </p>
        </div>
        <div className="text-right">
          <StatusBadge status={trip.status} />
          <p className="mt-1 text-xs text-slate-400 flex items-center justify-end gap-1.5">
            <span className={`inline-block h-2 w-2 rounded-full ${live ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
            {live ? 'Realtime Live' : 'Menghubungkan...'}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Riwayat Checkpoint Perjalanan</h2>
        
        {trip.checkpoints.length === 0 ? (
          <p className="text-sm text-slate-400 py-4">Belum ada checkpoint tercatat. Driver akan memperbarui saat tiba di pool.</p>
        ) : (
          <ol className="space-y-6 border-l-2 border-slate-200 pl-6 my-2">
            {trip.checkpoints.map((cp) => (
              <li key={cp.id} className="relative">
                <span className={`absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full ring-4 ring-white ${
                  cp.status === 'VERIFIED' ? 'bg-green-600' : 'bg-amber-500'
                }`} />
                <p className="text-sm font-semibold text-slate-900">{cp.pool.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dilaporkan tiba oleh driver pada {new Date(cp.reportedAt).toLocaleString('id-ID')}
                </p>
                {cp.reportNote && (
                  <p className="text-xs text-slate-600 bg-slate-50 rounded p-2 mt-1.5 border border-slate-100">
                    Catatan Driver: &quot;{cp.reportNote}&quot;
                  </p>
                )}
                {cp.verifiedBy ? (
                  <p className="mt-2 text-xs font-semibold text-green-700 flex items-center gap-1">
                    ✓ Terverifikasi oleh {cp.verifiedBy.name} {cp.verifiedAt && `· ${new Date(cp.verifiedAt).toLocaleString('id-ID')}`}
                  </p>
                ) : (
                  <p className="mt-2 text-xs font-medium text-amber-700 bg-amber-50 rounded px-2 py-1 inline-block">
                    ⏳ Menunggu verifikasi fisik dari penjaga pool...
                  </p>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
