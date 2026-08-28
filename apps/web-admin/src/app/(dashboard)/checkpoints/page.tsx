import { api } from '@/lib/api';
import type { TripCheckpoint } from '@/lib/types';
import { VerifyForm } from './VerifyForm';

export default async function CheckpointsPage() {
  const pending = await api.get<TripCheckpoint[]>('/checkpoints/pending');

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Verifikasi Pool-to-Pool</h1>
      <p className="mt-1 text-sm text-slate-500">
        Daftar laporan kedatangan unit dari driver yang menunggu verifikasi fisik di pool.
      </p>

      <div className="mt-6 space-y-4">
        {pending.map((cp) => (
          <div key={cp.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="font-semibold text-slate-900">
              {cp.trip?.tripNumber} — {cp.trip?.vehicleBrand} {cp.trip?.vehicleModel} ({cp.trip?.plateNumber})
            </p>
            <p className="text-sm text-slate-500">
              Pool tujuan: <span className="font-medium">{cp.pool.name}</span> · Dilaporkan oleh {cp.reportedBy.name} pada{' '}
              {new Date(cp.reportedAt).toLocaleString('id-ID')}
            </p>
            {cp.reportNote && <p className="mt-1 text-sm italic text-slate-600">&quot;{cp.reportNote}&quot;</p>}

            <VerifyForm checkpointId={cp.id} />
          </div>
        ))}
        {pending.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-400">
            Tidak ada laporan yang menunggu verifikasi.
          </p>
        )}
      </div>
    </div>
  );
}
