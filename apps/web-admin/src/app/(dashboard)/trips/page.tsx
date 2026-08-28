import Link from 'next/link';
import { api } from '@/lib/api';
import type { Trip } from '@/lib/types';
import { StatusBadge } from '@/lib/status-badge';

export default async function TripsPage() {
  const trips = await api.get<Trip[]>('/trips');

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Semua Trip</h1>
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Trip Number</th>
              <th className="px-4 py-3">Kendaraan</th>
              <th className="px-4 py-3">Driver</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {trips.map((t) => (
              <tr key={t.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{t.tripNumber ?? '—'}</td>
                <td className="px-4 py-3">
                  {t.vehicleBrand} {t.vehicleModel} ({t.plateNumber})
                </td>
                <td className="px-4 py-3">{t.driver?.name ?? '—'}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={t.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/orders/${t.orderId}`} className="text-sm font-medium text-slate-900 underline">
                    Lihat Order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
