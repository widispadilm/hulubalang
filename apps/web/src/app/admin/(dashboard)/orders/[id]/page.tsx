import { notFound, redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/session';
import { ordersService } from '@/server/services/orders.service';
import { usersService } from '@/server/services/users.service';
import { StatusBadge } from '@/lib/status-badge';
import { ConfirmOrderButton } from '../ConfirmOrderButton';
import { AssignTripForm } from '../AssignTripForm';
import { TripStatusForm } from '../TripStatusForm';

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  const role = session.user.role;

  let order;
  try {
    order = await ordersService.findOneAuthorized(id, session.user);
  } catch {
    notFound();
  }

  const drivers = (role === 'OPERATION' || role === 'ADMIN') ? await usersService.findDrivers() : [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{order.orderNumber ?? 'Order Baru (belum dikonfirmasi)'}</h1>
          <p className="text-sm text-slate-500">
            {order.customer?.companyName ?? order.pic} · PIC {order.pic} · {order.originCity} → {order.destinationCity}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {order.specialInstruction && (
        <p className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900 border border-amber-200">
          Catatan: {order.specialInstruction}
        </p>
      )}

      {order.status === 'PENDING' && (role === 'MARKETING' || role === 'ADMIN') && (
        <div className="mt-4">
          <ConfirmOrderButton orderId={order.id} />
        </div>
      )}

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Unit Kendaraan ({order.trips.length})</h2>
      <div className="mt-3 space-y-4">
        {order.trips.map((trip) => (
          <div key={trip.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-900">
                  {trip.tripNumber ?? '(belum ada trip number)'} — {trip.vehicleBrand} {trip.vehicleModel} ({trip.plateNumber})
                </p>
                <p className="text-xs text-slate-500">
                  {trip.shipmentType === 'TOWING' ? 'Towing' : 'Self Drive'} · No. Rangka {trip.chassisNumber} · No. Mesin {trip.engineNumber}
                  {trip.driver ? ` · Driver: ${trip.driver.name}` : ''}
                  {trip.eta ? ` · ETA: ${new Date(trip.eta).toLocaleDateString('id-ID')}` : ''}
                </p>
              </div>
              <StatusBadge status={trip.status} />
            </div>

            {trip.status === 'REQUESTED' && order.status === 'CONFIRMED' && (role === 'OPERATION' || role === 'ADMIN') && (
              <AssignTripForm tripId={trip.id} drivers={drivers} />
            )}

            {!['REQUESTED', 'DELIVERED', 'CANCELED'].includes(trip.status) && (role === 'OPERATION' || role === 'ADMIN') && (
              <TripStatusForm tripId={trip.id} />
            )}

            {trip.checkpoints.length > 0 && (
              <div className="mt-3 border-t border-slate-100 pt-3">
                <p className="text-xs font-semibold uppercase text-slate-500">Riwayat Checkpoint Pool</p>
                <ul className="mt-2 space-y-1.5">
                  {trip.checkpoints.map((cp) => (
                    <li key={cp.id} className="text-sm text-slate-700">
                      <StatusBadge status={cp.status} />{' '}
                      <span className="font-medium">{cp.pool.name}</span> — dilaporkan {cp.reportedBy.name} (
                      {new Date(cp.reportedAt).toLocaleString('id-ID')})
                      {cp.verifiedBy && <> · diverifikasi {cp.verifiedBy.name}</>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
