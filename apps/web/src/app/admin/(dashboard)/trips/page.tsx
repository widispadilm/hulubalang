import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/session';
import { tripsService } from '@/server/services/trips.service';
import { StatusBadge } from '@/lib/status-badge';

export default async function TripsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const trips = await tripsService.findAllInternal();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Monitoring Semua Trip</h1>
      <p className="mt-1 text-sm text-slate-500">Pantau status armada dan penugasan driver di seluruh rute.</p>

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
              <tr key={t.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-900">{t.tripNumber ?? 'Belum Ditugaskan'}</td>
                <td className="px-4 py-3">
                  {t.vehicleBrand} {t.vehicleModel} ({t.plateNumber})
                </td>
                <td className="px-4 py-3">{t.driver?.name ?? '—'}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={t.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/orders/${t.orderId}`} className="text-sm font-semibold text-pss-green-600 hover:text-pss-green-700 underline">
                    Lihat Order
                  </Link>
                </td>
              </tr>
            ))}
            {trips.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  Belum ada trip aktif.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
