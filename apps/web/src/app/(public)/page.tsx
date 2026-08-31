import Link from 'next/link';
import Image from 'next/image';
import { Bike, Car, CarFront, Sparkles, Wrench, Tractor } from 'lucide-react';
import { getCustomerSession } from '@/lib/session';

const PASTI = [
  { letter: 'P', title: 'Pelayanan Beragam' },
  { letter: 'A', title: 'Aman & Terpercaya' },
  { letter: 'S', title: 'Servis Prima' },
  { letter: 'T', title: 'Tepat Waktu' },
  { letter: 'I', title: 'Ikatan Mitra' },
];

const SERVICES = [
  {
    title: 'Self Drive',
    desc: 'Driver profesional PSS mengantar kendaraan Anda langsung ke tujuan, cocok untuk pengiriman cepat jarak menengah.',
    imageUrl: '/self-drive.png',
  },
  {
    title: 'Tow Car',
    desc: 'Pengiriman menggunakan truk towing khusus — satu truk untuk satu kendaraan, menjaga unit tetap dalam kondisi prima.',
    imageUrl: '/tow-car.png',
  },
];

const VEHICLE_TYPES = [
  { name: 'Motor', icon: Bike, desc: 'Skuter hingga motor besar' },
  { name: 'Mobil Standar', icon: Car, desc: 'MPV, SUV, & Sedan' },
  { name: 'Mobil Mewah', icon: Sparkles, desc: 'Luxury & Sport Cars' },
  { name: 'Mobil Baru', icon: CarFront, desc: 'Langsung dari Showroom' },
  { name: 'Mobil Rusak', icon: Wrench, desc: 'Mogok / Tidak Berfungsi' },
  { name: 'Alat Berat', icon: Tractor, desc: 'Maksimal beban 5 Ton' },
];

const PARTNERS_IMGS = [
  '/partners/KLPM.webp',
  '/partners/logo-takari.webp',
  '/partners/Mitsubishi_motors.webp',
  '/partners/orix.webp',
  '/partners/mnc.webp',
  '/partners/interbat.webp',
  '/partners/nestle.webp',
  '/partners/cakrawala.webp',
  '/partners/mobrent.webp',
  '/partners/moladin.webp',
  '/partners/hyundai.webp',
  '/partners/plaza_toyota.webp'
];

const FAQS = [
  {
    q: 'Apa PT PSS merupakan pemain baru di industri ini?',
    a: 'Tidak, secara badan hukum PT PSS resmi berdiri pada tahun 2017. Namun, perusahaan kami merupakan wujud transformasi dan pengembangan dari CV. Guta Mandiri yang sudah berpengalaman luas mengawal pengiriman kendaraan sejak tahun 2001. Sehingga, jam terbang kami di industri ini sudah lebih dari 2 dekade.'
  },
  {
    q: 'Apa saja layanan pengiriman yang disediakan?',
    a: 'Layanan yang kami sediakan adalah Self-Drive dan Towing Car dengan opsi Door to Door Service dan Port to Door Service.'
  },
  {
    q: 'Unit apa saja yang dapat dikirimkan?',
    a: 'Kami melayani berbagai jenis kendaraan, mulai dari motor (skuter hingga motor besar), mobil standar, mobil mewah (luxury/sport cars), mobil baru dari showroom, mobil mogok, hingga alat berat dengan maksimal beban 5 ton (seperti traktor, ekskavator, forklift, dan genset).'
  },
  {
    q: 'Wilayah mana saja yang dicakup oleh layanan PT PSS?',
    a: 'Kami melayani pengiriman ke seluruh wilayah Indonesia melalui integrasi jalur darat dan laut.'
  },
  {
    q: 'Bagaimana PT PSS menjamin keselamatan dan kebersihan selama perjalanan?',
    a: 'Pengiriman menggunakan armada towing kami dipastikan menggunakan Straping (Tali Pengikat) yang kokoh dan aman serta kami menjamin unit yang diterima akan dilakukan pencucian terlebih dahulu sehingga unit diterima dalam keadaan bersih dan aman.'
  }
];

export default async function HomePage() {
  const session = await getCustomerSession();

  return (
    <>

      {/* Hero Section with Image Background */}
      <section className="relative overflow-hidden pt-24 pb-40 text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg.png" 
            alt="Car Carrier Truck on Highway" 
            fill 
            className="object-cover" 
            priority
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-slate-900/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />
        </div>
        
        {/* Abstract Green Glow */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-pss-green-500/30 blur-3xl z-0" />
        
        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-pss-green-500/30 bg-pss-green-500/20 px-3 py-1 text-xs font-semibold text-pss-green-400 mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pss-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pss-green-500"></span>
              </span>
              Sejak 2001
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight leading-tight sm:text-5xl md:text-6xl lg:leading-[1.1] text-white">
              Ekspedisi Kendaraan <span className="text-transparent bg-clip-text bg-gradient-to-r from-pss-green-400 to-emerald-300">Darat &amp; Laut</span> Terpercaya.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200 leading-relaxed mx-auto md:mx-0">
              Menjangkau seluruh pelosok Indonesia dengan layanan prima. Kami memastikan kendaraan Anda tiba dengan aman, tepat waktu, dan terpantau secara real-time.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link href={session ? '/orders/new' : '/login'} className="w-full sm:w-auto rounded-full bg-pss-green-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-pss-green-500/40 hover:bg-pss-green-600 hover:shadow-xl hover:shadow-pss-green-500/50 hover:-translate-y-1 transition-all text-center">
                Buat Order Sekarang
              </Link>
              <a href="https://wa.me/6281296866705" target="_blank" rel="noreferrer" className="w-full sm:w-auto rounded-full border border-white/30 bg-white/5 backdrop-blur-sm px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 hover:border-white/50 transition-all flex items-center justify-center gap-2">
                <span>💬</span> Konsultasi WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* P.A.S.T.I Section - Interactive Cards */}
      <section className="mx-auto max-w-6xl px-6 py-12 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {PASTI.map((item) => (
            <div key={item.letter} className="group bg-white rounded-3xl p-6 shadow-md shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center aspect-square hover:shadow-2xl hover:shadow-pss-green-500/20 hover:-translate-y-2 hover:border-pss-green-500/30 transition-all duration-300 cursor-default">
              <span className="text-5xl md:text-6xl font-black text-pss-green-500 group-hover:scale-110 transition-transform duration-300 mb-2">
                {item.letter}
              </span>
              <span className="text-xs font-bold text-center text-slate-700 group-hover:text-pss-green-600 transition-colors">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Layanan Kami */}
      <section id="layanan" className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">Layanan Unggulan Kami</h2>
          <p className="mt-4 text-slate-600 max-w-2xl">Solusi logistik kendaraan yang disesuaikan dengan kebutuhan Anda, baik untuk perorangan maupun perusahaan skala besar.</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {SERVICES.map((s) => (
            <div key={s.title} className="group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 hover:border-pss-green-500/30 transition-all duration-300 flex flex-col">
              <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                <Image 
                  src={s.imageUrl} 
                  alt={s.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-6 left-8 text-white z-10">
                  <h3 className="text-2xl font-bold">{s.title}</h3>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1 relative z-10 bg-white">
                <p className="text-slate-600 leading-relaxed flex-1">{s.desc}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:bg-pss-green-50 group-hover:text-pss-green-600 transition-colors">
                    Door-to-Door · Port-to-Door
                  </span>
                  <Link href={s.title === 'Self Drive' ? '/layanan/self-drive' : '/layanan/tow-car'} className="flex h-10 w-10 items-center justify-center rounded-full bg-pss-green-50 text-pss-green-600 group-hover:bg-pss-green-500 group-hover:text-white transition-colors">
                    <span className="text-lg font-bold">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32">
          <div className="text-center md:text-left mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Spesialisasi Kendaraan</h3>
            <p className="text-slate-600">Berpengalaman menangani berbagai jenis kendaraan dengan SOP pengiriman khusus.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {VEHICLE_TYPES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.name} className="group flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-pss-green-500/10 hover:border-pss-green-200 transition-all duration-300 hover:-translate-y-1">
                  <div className="h-14 w-14 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-pss-green-500 group-hover:scale-110 group-hover:bg-pss-green-50 transition-all duration-300 mb-4">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-center mb-1 group-hover:text-pss-green-600 transition-colors">{v.name}</h4>
                  <p className="text-xs text-slate-500 text-center leading-tight">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Kami */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Partner Kami</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-12">PT Putra Seganti Setungguan bangga telah dipercaya oleh berbagai perusahaan otomotif, institusi pembiayaan, dan korporasi multinasional.</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
            {PARTNERS_IMGS.map((src, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 aspect-[3/2] flex items-center justify-center grayscale hover:grayscale-0 hover:shadow-md hover:border-pss-green-200 transition-all duration-300">
                <div className="relative w-full h-full">
                  <Image src={src} alt="Partner Logo" fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600">Pertanyaan yang sering diajukan seputar layanan logistik PT PSS.</p>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <details key={idx} className="group border border-slate-200 rounded-2xl bg-white overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-slate-900 bg-slate-50 hover:bg-slate-100 transition-colors font-semibold">
                <span className="text-lg">{idx + 1}. {faq.q}</span>
                <span className="shrink-0 rounded-full bg-white p-1.5 text-slate-900 sm:p-3 shadow-sm group-open:-rotate-45 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5 shrink-0 transition duration-300 group-open:-rotate-45" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 py-6 border-t border-slate-100 bg-white">
                <p className="leading-relaxed text-slate-600">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Full CTA Section */}
      <section className="relative overflow-hidden bg-pss-green-600 py-24 text-white">
        <div className="absolute top-0 right-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-pss-green-400/30 blur-3xl z-0" />
        <div className="absolute bottom-0 left-0 h-96 w-96 translate-y-1/3 -translate-x-1/3 rounded-full bg-emerald-700/50 blur-3xl z-0" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Ingin berpartner dengan kami?
          </h2>
          <p className="text-lg md:text-xl text-pss-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Dapatkan penawaran terbaik untuk pengiriman kendaraan perusahaan maupun personal Anda. Tim kami siap membantu mencarikan solusi logistik yang paling efisien.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={session ? '/orders/new' : '/login'} className="w-full sm:w-auto rounded-full bg-white px-8 py-4 text-sm font-extrabold text-pss-green-600 shadow-xl hover:bg-slate-50 hover:scale-105 transition-all">
              Buat Order Sekarang
            </Link>
            <a href="https://wa.me/6281296866705" target="_blank" rel="noreferrer" className="w-full sm:w-auto rounded-full border-2 border-white/30 bg-transparent px-8 py-4 text-sm font-bold text-white hover:bg-white/10 hover:border-white transition-all flex items-center justify-center gap-2">
              <span>💬</span> Konsultasi WhatsApp
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
