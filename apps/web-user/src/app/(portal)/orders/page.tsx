import Link from 'next/link';
import { api } from '@/lib/api';
import type { Order } from '@/lib/types';
import { StatusBadge } from '@/lib/status-badge';

export default async function MyOrdersPage() {
  const orders = await api.get<Order[]>('/orders');

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Order Saya</h1>
        <Link href="/orders/new" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          + Buat Order Baru
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {orders.map((o) => (
          <Link
            key={o.id}
            href={`/orders/${o.id}`}
            className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">{o.orderNumber ?? 'Menunggu nomor order'}</p>
                <p className="text-sm text-slate-500">
                  {o.originCity} → {o.destinationCity} · {o.trips.length} unit
                </p>
              </div>
              <StatusBadge status={o.status} />
            </div>
          </Link>
        ))}
        {orders.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
            Belum ada order. Klik &quot;Buat Order Baru&quot; untuk mulai mengirim kendaraan.
          </p>
        )}
      </div>
    </div>
  );
}
