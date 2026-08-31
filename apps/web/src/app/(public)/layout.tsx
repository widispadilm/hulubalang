import Link from 'next/link';
import { getCustomerSession, getAdminSession } from '@/lib/session';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const customerSession = await getCustomerSession();
  const adminSession = await getAdminSession();

  return (
    <div className="bg-pss-base min-h-screen font-sans selection:bg-pss-green-500 selection:text-white flex flex-col">
      {/* Sticky Glass Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-pss-green-500 text-white font-black group-hover:scale-105 transition-transform shadow-md shadow-pss-green-500/20">
              P
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-800 hidden sm:block">PT PSS</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-pss-green-500 transition-colors">Beranda</Link>
            <Link href="/tentang-kami" className="hover:text-pss-green-500 transition-colors">Tentang Kami</Link>
            <Link href="/artikel" className="hover:text-pss-green-500 transition-colors">Artikel</Link>
            <Link href="/layanan/self-drive" className="hover:text-pss-green-500 transition-colors">Self Drive</Link>
            <Link href="/layanan/tow-car" className="hover:text-pss-green-500 transition-colors">Tow Car</Link>
          </nav>
          <div className="flex items-center gap-3">
            {adminSession && (
              <Link
                href="/admin/dashboard"
                className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all"
              >
                Dashboard Admin
              </Link>
            )}
            <Link
              href={customerSession ? '/orders' : '/login'}
              className="rounded-full bg-pss-green-500 px-5 py-2 text-sm font-medium text-white shadow-md shadow-pss-green-500/30 hover:bg-pss-green-600 hover:shadow-lg hover:shadow-pss-green-500/40 hover:-translate-y-0.5 transition-all active:scale-95 whitespace-nowrap"
            >
              {customerSession ? 'Portal Saya' : 'Login Pelanggan'}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer / Kontak */}
      <footer className="bg-slate-900 pt-20 pb-10 text-white">
        <div className="mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-pss-green-500 font-black">P</div>
              <span className="text-xl font-bold tracking-tight">PT PSS</span>
            </div>
            <p className="text-slate-400 max-w-md">Layanan logistik kendaraan profesional dengan pengawasan real-time dan komitmen P.A.S.T.I.</p>
            <div className="mt-6">
              <Link href="/admin/login" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                🔒 Akses Internal Staff / Driver / Penjaga Pool
              </Link>
            </div>
          </div>
          <div className="grid gap-4 text-sm text-slate-300">
            <p className="font-bold text-white mb-2 text-lg">Hubungi Kami</p>
            <a href="https://maps.app.goo.gl/tMJab4vv9hhj2CvXA" target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-pss-green-400 transition-colors">
              <span className="mt-1">📍</span> Jl. Raya Kalimalang No.40, Jatimulya, Bekasi Timur
            </a>
            <p className="flex items-center gap-3">
              <span>📞</span> (021) 4567891
            </p>
            <a href="https://wa.me/6281296866705" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-pss-green-400 transition-colors">
              <span>💬</span> 081296866705 (WhatsApp)
            </a>
            <a href="mailto:rickygumay@putrasegantisetungguan.com" className="flex items-center gap-3 hover:text-pss-green-400 transition-colors">
              <span>✉️</span> rickygumay@putrasegantisetungguan.com
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} PT Putra Seganti Setungguan. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
