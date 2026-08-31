import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/session';
import { ordersService } from '@/server/services/orders.service';
import { tripsService } from '@/server/services/trips.service';
import { checkpointsService } from '@/server/services/checkpoints.service';

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default async function DashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  const role = session.user.role;

  if (role === 'DRIVER') {
    const trips = await tripsService.findMineAsDriver(session.user.id);
    const active = trips.filter((t) => !['DELIVERED', 'CANCELED'].includes(t.status));
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ringkasan Tugas Driver</h1>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard label="Trip Aktif" value={active.length} />
          <StatCard label="Total Trip Ditugaskan" value={trips.length} />
        </div>
      </div>
    );
  }

  if (role === 'POOL_KEEPER') {
    const pending = await checkpointsService.findPending(session.user);
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ringkasan Penjaga Pool</h1>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard label="Menunggu Verifikasi Fisik" value={pending.length} />
        </div>
      </div>
    );
  }

  const orders = await ordersService.findAllInternal();
  const pending = orders.filter((o) => o.status === 'PENDING').length;
  const confirmed = orders.filter((o) => o.status === 'CONFIRMED').length;
  const activeTrips = orders.flatMap((o) => o.trips).filter((t) => !['DELIVERED', 'CANCELED', 'REQUESTED'].includes(t.status)).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard Utama</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Order Menunggu Konfirmasi" value={pending} />
        <StatCard label="Order Terkonfirmasi" value={confirmed} />
        <StatCard label="Trip Berjalan" value={activeTrips} />
        <StatCard label="Total Order Keseluruhan" value={orders.length} />
      </div>
    </div>
  );
}
