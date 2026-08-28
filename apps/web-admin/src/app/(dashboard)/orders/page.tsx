import Link from 'next/link';
import { api } from '@/lib/api';
import type { Order } from '@/lib/types';
import { StatusBadge } from '@/lib/status-badge';

export default async function OrdersPage() {
  const orders = await api.get<Order[]>('/orders');

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">No. Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Rute</th>
              <th className="px-4 py-3">Unit</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">{o.orderNumber ?? '—'}</td>
                <td className="px-4 py-3">{o.customer.companyName}</td>
                <td className="px-4 py-3">
                  {o.originCity} → {o.destinationCity}
                </td>
                <td className="px-4 py-3">{o.trips.length}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={o.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/orders/${o.id}`} className="text-sm font-medium text-slate-900 underline">
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  Belum ada order.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
