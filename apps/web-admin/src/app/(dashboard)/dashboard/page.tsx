import { getSession } from '@/lib/session';
import { api } from '@/lib/api';
import type { Order, Trip } from '@/lib/types';

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default async function DashboardPage() {
  const session = await getSession();
  const role = session!.user.role;

  if (role === 'DRIVER') {
    const trips = await api.get<Trip[]>('/trips/mine');
    const active = trips.filter((t) => !['DELIVERED', 'CANCELED'].includes(t.status));
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ringkasan Tugas Driver</h1>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard label="Trip Aktif" value={active.length} />
          <StatCard label="Total Trip" value={trips.length} />
        </div>
      </div>
    );
  }

  if (role === 'POOL_KEEPER') {
    const pending = await api.get<unknown[]>('/checkpoints/pending');
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ringkasan Penjaga Pool</h1>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard label="Menunggu Verifikasi" value={pending.length} />
        </div>
      </div>
    );
  }

  const orders = await api.get<Order[]>('/orders');
  const pending = orders.filter((o) => o.status === 'PENDING').length;
  const confirmed = orders.filter((o) => o.status === 'CONFIRMED').length;
  const activeTrips = orders.flatMap((o) => o.trips).filter((t) => !['DELIVERED', 'CANCELED', 'REQUESTED'].includes(t.status)).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Order Menunggu Konfirmasi" value={pending} />
        <StatCard label="Order Terkonfirmasi" value={confirmed} />
        <StatCard label="Trip Berjalan" value={activeTrips} />
        <StatCard label="Total Order" value={orders.length} />
      </div>
    </div>
  );
}
