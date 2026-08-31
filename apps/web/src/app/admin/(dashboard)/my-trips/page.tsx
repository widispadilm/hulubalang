import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/session';
import { tripsService } from '@/server/services/trips.service';
import { poolsService } from '@/server/services/pools.service';
import { StatusBadge } from '@/lib/status-badge';
import { PickupButton } from './PickupButton';
import { ReportCheckpointForm } from './ReportCheckpointForm';

export default async function MyTripsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const [trips, pools] = await Promise.all([
    tripsService.findMineAsDriver(session.user.id),
    poolsService.findAll(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Tugas Pengiriman Driver</h1>
      <p className="mt-1 text-sm text-slate-500">Kelola pengambilan unit dan laporkan kedatangan di setiap pool checkpoint.</p>

      <div className="mt-6 space-y-4">
        {trips.map((trip) => (
          <div key={trip.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-900">
                  {trip.tripNumber ?? 'Belum ada nomor trip'} — {trip.vehicleBrand} {trip.vehicleModel} ({trip.plateNumber})
                </p>
                <p className="text-xs text-slate-500">
                  {trip.shipmentType === 'TOWING' ? 'Towing' : 'Self Drive'}
                  {trip.eta ? ` · Estimasi Tiba (ETA): ${new Date(trip.eta).toLocaleDateString('id-ID')}` : ''}
                </p>
              </div>
              <StatusBadge status={trip.status} />
            </div>

            {trip.status === 'ASSIGNED' && (
              <div className="mt-3">
                <PickupButton tripId={trip.id} />
              </div>
            )}

            {['VEHICLE_PICKED_UP', 'IN_TRANSIT', 'AT_POOL'].includes(trip.status) && (
              <div className="mt-3">
                <ReportCheckpointForm tripId={trip.id} pools={pools} />
              </div>
            )}

            {trip.checkpoints.length > 0 && (
              <ul className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-sm text-slate-600">
                {trip.checkpoints.map((cp) => (
                  <li key={cp.id} className="flex items-center gap-2">
                    <StatusBadge status={cp.status} /> 
                    <span className="font-medium text-slate-800">{cp.pool.name}</span> — {new Date(cp.reportedAt).toLocaleString('id-ID')}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {trips.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
            Belum ada trip yang ditugaskan kepada Anda saat ini.
          </p>
        )}
      </div>
    </div>
  );
}
