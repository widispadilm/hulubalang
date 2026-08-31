import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/session';
import { logoutAction } from './actions';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Map as MapIcon, 
  CheckSquare, 
  Truck, 
  Warehouse, 
  LogOut 
} from 'lucide-react';

const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'MARKETING', 'OPERATION', 'FINANCE', 'MANAGEMENT', 'DRIVER', 'POOL_KEEPER'] },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, roles: ['ADMIN', 'MARKETING', 'OPERATION', 'FINANCE', 'MANAGEMENT'] },
  { href: '/admin/trips', label: 'Trips', icon: MapIcon, roles: ['ADMIN', 'OPERATION', 'MANAGEMENT', 'FINANCE'] },
  { href: '/admin/checkpoints', label: 'Verifikasi Pool', icon: CheckSquare, roles: ['ADMIN', 'OPERATION', 'POOL_KEEPER'] },
  { href: '/admin/my-trips', label: 'Tugas Saya', icon: Truck, roles: ['DRIVER'] },
  { href: '/admin/pools', label: 'Master Pool', icon: Warehouse, roles: ['ADMIN', 'OPERATION'] },
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
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const items = NAV.filter((item) => item.roles.includes(session.user.role));
  const userInitial = session.user.email.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen bg-pss-base pb-16 md:pb-0">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-slate-200 bg-white p-4 shadow-sm z-10">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pss-green-500 text-white font-bold shadow-md">
            {userInitial}
          </div>
          <div className="overflow-hidden">
            <p className="truncate text-sm font-bold text-slate-900">{session.user.email}</p>
            <span className="mt-0.5 inline-block rounded bg-pss-green-50/50 border border-pss-green-500/20 px-2 py-0.5 text-[10px] font-semibold text-pss-green-600">
              {ROLE_LABEL[session.user.role] ?? session.user.role}
            </span>
          </div>
        </div>
        
        <nav className="flex flex-1 flex-col gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-pss-green-50 hover:text-pss-green-600 transition-colors"
              >
                <Icon className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <form action={logoutAction} className="mt-6 border-t border-slate-100 pt-4 px-2">
          <button type="submit" className="group flex w-full items-center gap-3 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors cursor-pointer">
            <LogOut className="h-5 w-5 opacity-70 group-hover:opacity-100" />
            Keluar
          </button>
        </form>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-white/80 backdrop-blur-md border-t border-slate-200 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className="flex flex-col items-center gap-1 p-3 text-slate-500 hover:text-pss-green-600 transition-colors active:scale-95"
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
        <form action={logoutAction}>
          <button type="submit" className="flex flex-col items-center gap-1 p-3 text-slate-500 hover:text-red-600 transition-colors active:scale-95 cursor-pointer">
            <LogOut className="h-5 w-5" />
            <span className="text-[10px] font-medium">Keluar</span>
          </button>
        </form>
      </nav>

      <main className="flex-1 overflow-x-hidden p-4 md:p-8">{children}</main>
    </div>
  );
}
