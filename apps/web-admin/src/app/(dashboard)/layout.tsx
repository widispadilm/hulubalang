import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/session';
import { logoutAction } from './actions';

const NAV = [
  { href: '/dashboard', label: 'Dashboard', roles: ['ADMIN', 'MARKETING', 'OPERATION', 'FINANCE', 'MANAGEMENT', 'DRIVER', 'POOL_KEEPER'] },
  { href: '/orders', label: 'Orders', roles: ['ADMIN', 'MARKETING', 'OPERATION', 'FINANCE', 'MANAGEMENT'] },
  { href: '/trips', label: 'Trips', roles: ['ADMIN', 'OPERATION', 'MANAGEMENT', 'FINANCE'] },
  { href: '/checkpoints', label: 'Verifikasi Pool', roles: ['ADMIN', 'OPERATION', 'POOL_KEEPER'] },
  { href: '/my-trips', label: 'Tugas Saya', roles: ['DRIVER'] },
  { href: '/pools', label: 'Master Pool', roles: ['ADMIN', 'OPERATION'] },
];

const ROLE_LABEL: Record<string, string> = {
  ADMIN: 'Admin',
  MARKETING: 'Marketing',
  OPERATION: 'Operation',
  FINANCE: 'Finance',
  MANAGEMENT: 'Management',
  DRIVER: 'Driver',
  POOL_KEEPER: 'Penjaga Pool',
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/login');

  const items = NAV.filter((item) => item.roles.includes(session.user.role));

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-60 shrink-0 border-r border-slate-200 bg-white p-4">
        <div className="mb-6 px-2">
          <p className="text-sm font-bold text-slate-900">PSS Web Admin</p>
          <p className="text-xs text-slate-500">{session.user.email}</p>
          <span className="mt-1 inline-block rounded bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-white">
            {ROLE_LABEL[session.user.role] ?? session.user.role}
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="mt-6 px-2">
          <button type="submit" className="text-xs text-slate-500 hover:text-slate-800">
            Keluar
          </button>
        </form>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
