import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/session';
import { poolsService } from '@/server/services/pools.service';
import { CreatePoolForm } from './CreatePoolForm';

export default async function PoolsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const pools = await poolsService.findAll();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Master Pool Transit</h1>
      <p className="mt-1 text-sm text-slate-500">Kelola titik lokasi gudang dan depot transit serah-terima unit PT PSS.</p>

      <ul className="mt-6 space-y-3">
        {pools.map((p) => (
          <li key={p.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-start justify-between">
            <div>
              <p className="font-semibold text-slate-900 text-base">{p.name}</p>
              <p className="text-sm text-slate-500 mt-0.5">{p.address}</p>
              {p.keepers && p.keepers.length > 0 && (
                <p className="text-xs text-pss-green-600 mt-2 font-medium">
                  Penjaga: {p.keepers.map((k) => k.name).join(', ')}
                </p>
              )}
            </div>
            <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded">Aktif</span>
          </li>
        ))}
      </ul>
      
      <CreatePoolForm />
    </div>
  );
}
