import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/session';
import { ordersService } from '@/server/services/orders.service';
import { StatusBadge } from '@/lib/status-badge';

export default async function OrdersPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const orders = await ordersService.findAllInternal();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Manajemen Orders</h1>
      <p className="mt-1 text-sm text-slate-500">Kelola dan konfirmasi pesanan pengiriman dari seluruh pelanggan.</p>
      
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
              <tr key={o.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-900">{o.orderNumber ?? 'Belum Terkonfirmasi'}</td>
                <td className="px-4 py-3 font-medium text-slate-700">{o.customer?.companyName ?? o.pic}</td>
                <td className="px-4 py-3">
                  {o.originCity} → {o.destinationCity}
                </td>
                <td className="px-4 py-3">{o.trips.length}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={o.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/orders/${o.id}`} className="text-sm font-semibold text-pss-green-600 hover:text-pss-green-700 underline">
                    Detail / Proses
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
