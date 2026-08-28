import { api } from '@/lib/api';
import type { Pool } from '@/lib/types';
import { CreatePoolForm } from './CreatePoolForm';

export default async function PoolsPage() {
  const pools = await api.get<Pool[]>('/pools');

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Master Pool</h1>
      <ul className="mt-6 space-y-2">
        {pools.map((p) => (
          <li key={p.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="font-semibold text-slate-900">{p.name}</p>
            <p className="text-sm text-slate-500">{p.address}</p>
          </li>
        ))}
      </ul>
      <CreatePoolForm />
    </div>
  );
}
