import { api } from '@/lib/api';
import type { Trip, Pool } from '@/lib/types';
import { StatusBadge } from '@/lib/status-badge';
import { PickupButton } from './PickupButton';
import { ReportCheckpointForm } from './ReportCheckpointForm';

export default async function MyTripsPage() {
  const [trips, pools] = await Promise.all([api.get<Trip[]>('/trips/mine'), api.get<Pool[]>('/pools')]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Tugas Pengiriman Saya</h1>
      <div className="mt-6 space-y-4">
        {trips.map((trip) => (
          <div key={trip.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-900">
                  {trip.tripNumber} — {trip.vehicleBrand} {trip.vehicleModel} ({trip.plateNumber})
                </p>
                <p className="text-xs text-slate-500">
                  {trip.shipmentType === 'TOWING' ? 'Towing' : 'Self Drive'}
                  {trip.eta ? ` · ETA ${new Date(trip.eta).toLocaleDateString('id-ID')}` : ''}
                </p>
              </div>
              <StatusBadge status={trip.status} />
            </div>

            {trip.status === 'ASSIGNED' && <div className="mt-2">{<PickupButton tripId={trip.id} />}</div>}

            {['VEHICLE_PICKED_UP', 'IN_TRANSIT', 'AT_POOL'].includes(trip.status) && (
              <ReportCheckpointForm tripId={trip.id} pools={pools} />
            )}

            {trip.checkpoints.length > 0 && (
              <ul className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-sm text-slate-600">
                {trip.checkpoints.map((cp) => (
                  <li key={cp.id}>
                    <StatusBadge status={cp.status} /> {cp.pool.name} — {new Date(cp.reportedAt).toLocaleString('id-ID')}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {trips.length === 0 && <p className="text-slate-400">Belum ada trip yang ditugaskan.</p>}
      </div>
    </div>
  );
}
