import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getCustomerSession } from '@/lib/session';
import { ordersService } from '@/server/services/orders.service';
import { StatusBadge } from '@/lib/status-badge';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getCustomerSession();
  if (!session) redirect('/login');

  let order;
  try {
    order = await ordersService.findOneAuthorized(id, session.user);
  } catch {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{order.orderNumber ?? 'Menunggu konfirmasi Marketing'}</h1>
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

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Unit Kendaraan ({order.trips.length})</h2>
      <div className="mt-3 space-y-3">
        {order.trips.map((trip) => (
          <Link
            key={trip.id}
            href={`/trips/${trip.id}`}
            className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  {trip.tripNumber ?? 'Menunggu nomor trip'} — {trip.vehicleBrand} {trip.vehicleModel} ({trip.plateNumber})
                </p>
                <p className="text-xs text-slate-500">{trip.shipmentType === 'TOWING' ? 'Towing' : 'Self Drive'}</p>
              </div>
              <StatusBadge status={trip.status} />
            </div>
            <p className="mt-2 text-xs font-medium text-pss-green-600">Lihat status pengiriman real-time →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
