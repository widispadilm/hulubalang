import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/session';
import { checkpointsService } from '@/server/services/checkpoints.service';
import { VerifyForm } from './VerifyForm';

export default async function CheckpointsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const pending = await checkpointsService.findPending(session.user);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Verifikasi Checkpoint Pool-to-Pool</h1>
      <p className="mt-1 text-sm text-slate-500">
        Daftar laporan kedatangan unit fisik dari driver yang menunggu verifikasi di pool Anda.
      </p>

      <div className="mt-6 space-y-4">
        {pending.map((cp) => (
          <div key={cp.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-900 text-base">
                  {cp.trip?.tripNumber ?? 'Trip'} — {cp.trip?.vehicleBrand} {cp.trip?.vehicleModel} ({cp.trip?.plateNumber})
                </p>
                <p className="text-sm text-slate-500 mt-0.5">
                  Lokasi Pool: <span className="font-semibold text-slate-800">{cp.pool.name}</span> · Dilaporkan oleh {cp.reportedBy.name} pada{' '}
                  {new Date(cp.reportedAt).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
            
            {cp.reportNote && (
              <p className="mt-2 text-sm text-slate-700 bg-slate-50 border border-slate-100 rounded p-2.5">
                Catatan Driver: &quot;{cp.reportNote}&quot;
              </p>
            )}

            <div className="mt-3 pt-3 border-t border-slate-100">
              <VerifyForm checkpointId={cp.id} />
            </div>
          </div>
        ))}
        {pending.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
            Tidak ada laporan kedatangan yang menunggu verifikasi saat ini.
          </p>
        )}
      </div>
    </div>
  );
}
