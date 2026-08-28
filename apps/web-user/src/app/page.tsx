import Link from 'next/link';
import { getSession } from '@/lib/session';

const SERVICES = [
  {
    title: 'Self Drive',
    desc: 'Driver profesional PSS mengantar kendaraan Anda langsung ke tujuan, cocok untuk pengiriman cepat jarak menengah.',
  },
  {
    title: 'Tow Car',
    desc: 'Pengiriman menggunakan truk towing khusus — satu truk untuk satu kendaraan, menjaga unit tetap dalam kondisi prima.',
  },
];

const VEHICLE_TYPES = [
  'Motor',
  'Mobil Standar',
  'Mobil Mewah / Sport',
  'Mobil Baru dari Showroom',
  'Mobil Tidak Berfungsi',
  'Alat Berat s.d. 5 Ton',
];

const PARTNERS = ['Hyundai', 'Toyota', 'Mitsubishi Motors', 'Orix', 'MNC', 'Nestle'];

export default async function HomePage() {
  const session = await getSession();

  return (
    <div>
      <header className="border-b border-slate-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight">PT Putra Seganti Setungguan</span>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#layanan" className="hover:text-slate-900">Layanan</a>
            <a href="#tentang" className="hover:text-slate-900">Tentang Kami</a>
            <a href="#kontak" className="hover:text-slate-900">Kontak</a>
            <Link
              href={session ? '/orders' : '/login'}
              className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
            >
              {session ? 'Portal Saya' : 'Login Pelanggan'}
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Sejak 2001</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Jasa Ekspedisi Kendaraan Darat &amp; Laut ke Seluruh Indonesia
          </h1>
          <p className="mt-4 max-w-xl text-slate-300">
            Diverse Services, Safe &amp; Trustworthy, Prime Service, Timely Delivery, Partner Commitment — P.A.S.T.I.
            Layanan pengiriman kendaraan Anda.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href={session ? '/orders/new' : '/login'} className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100">
              Buat Order Sekarang
            </Link>
            <a href="#layanan" className="rounded-md border border-slate-600 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
              Lihat Layanan
            </a>
          </div>
        </div>
      </section>

      <section id="layanan" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold">Layanan Kami</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-400">Door-to-Door · Port-to-Door</p>
            </div>
          ))}
        </div>

        <h3 className="mt-10 text-lg font-semibold">Jenis Kendaraan yang Kami Tangani</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {VEHICLE_TYPES.map((v) => (
            <span key={v} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700">
              {v}
            </span>
          ))}
        </div>
      </section>

      <section id="tentang" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold">Tentang Kami</h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            PT Putra Seganti Setungguan (PT PSS) berawal dari CV Guta Mandiri yang berdiri sejak 2001, dan resmi menjadi PT
            pada tahun 2017. Kami melayani ekspedisi kendaraan darat dan laut ke seluruh Indonesia, dipercaya oleh berbagai
            perusahaan otomotif dan institusi keuangan.
          </p>
          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">Dipercaya Oleh</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {PARTNERS.map((p) => (
                <span key={p} className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="kontak" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold">Kontak</h2>
        <div className="mt-4 grid gap-2 text-sm text-slate-600">
          <p>Jl. Raya Kalimalang No.40, Jatimulya, Bekasi Timur</p>
          <p>Telp: (021) 4567891 · WhatsApp: 081296866705</p>
          <p>Email: rickygumay@putrasegantisetungguan.com</p>
          <p>Operasional 24/7</p>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} PT Putra Seganti Setungguan.
      </footer>
    </div>
  );
}
