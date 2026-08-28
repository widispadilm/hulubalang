import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { logoutAction } from './actions';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/login');

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-bold text-slate-900">
            PT Putra Seganti Setungguan
          </Link>
          <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
            <Link href="/orders" className="hover:text-slate-900">Order Saya</Link>
            <Link href="/orders/new" className="hover:text-slate-900">Buat Order</Link>
            <span className="text-xs text-slate-400">{session.user.email}</span>
            <form action={logoutAction}>
              <button type="submit" className="hover:text-slate-900">Keluar</button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
