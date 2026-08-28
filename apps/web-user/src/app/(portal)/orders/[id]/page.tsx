import Link from 'next/link';
import { api } from '@/lib/api';
import type { Order } from '@/lib/types';
import { StatusBadge } from '@/lib/status-badge';

export default async function OrderDetailPage({ params }: PageProps<'/orders/[id]'>) {
  const { id } = await params;
  const order = await api.get<Order>(`/orders/${id}`);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{order.orderNumber ?? 'Menunggu nomor order'}</h1>
          <p className="text-sm text-slate-500">
            {order.originCity} → {order.destinationCity} · PIC {order.pic}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {order.status === 'PENDING' && (
        <p className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Order Anda sedang menunggu konfirmasi dari tim Marketing kami.
        </p>
      )}

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Unit Kendaraan</h2>
      <div className="mt-3 space-y-3">
        {order.trips.map((trip) => (
          <Link
            key={trip.id}
            href={`/trips/${trip.id}`}
            className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  {trip.tripNumber ?? 'Menunggu trip number'} — {trip.vehicleBrand} {trip.vehicleModel} ({trip.plateNumber})
                </p>
                <p className="text-xs text-slate-500">{trip.shipmentType === 'TOWING' ? 'Towing' : 'Self Drive'}</p>
              </div>
              <StatusBadge status={trip.status} />
            </div>
            <p className="mt-2 text-xs font-medium text-slate-400">Lihat status pengiriman real-time →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
