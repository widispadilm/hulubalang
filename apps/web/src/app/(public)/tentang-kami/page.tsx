import Link from 'next/link';

export const metadata = {
  title: 'Tentang Kami | PT Putra Seganti Setungguan',
  description: 'Sejarah, Visi, dan Misi PT Putra Seganti Setungguan (PT PSS).',
};

const PARTNERS = ['Hyundai', 'Toyota', 'Mitsubishi Motors', 'Orix', 'MNC', 'Nestle'];

export default function TentangKamiPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <div className="absolute top-0 right-0 h-96 w-96 -translate-y-1/3 translate-x-1/3 rounded-full bg-pss-green-500/20 blur-3xl z-0" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-pss-green-400 to-emerald-300">PT PSS</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Melangkah pasti sejak 2001. Membangun kepercayaan melalui pengiriman kendaraan yang aman dan tepat waktu ke seluruh penjuru Nusantara.
          </p>
        </div>
      </section>

      {/* Sejarah & Profil */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-pss-green-200 bg-pss-green-50 px-3 py-1 text-xs font-semibold text-pss-green-600 mb-6">
              Sejarah Kami
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Dari CV Guta Mandiri Hingga PT PSS</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                <strong>PT Putra Seganti Setungguan (PT PSS)</strong> memiliki akar sejarah yang panjang dalam dunia logistik kendaraan di Indonesia. Perjalanan kami dimulai pada tahun 2001 di bawah bendera CV Guta Mandiri.
              </p>
              <p>
                Berkat dedikasi, kepercayaan pelanggan, dan standar operasional yang terus ditingkatkan, kami resmi bertransformasi menjadi Perseroan Terbatas (PT) pada tahun 2017. Transformasi ini menandai komitmen kami untuk melayani skala korporasi yang lebih besar dengan sistem manajemen yang lebih terstruktur.
              </p>
              <p>
                Hari ini, PT PSS telah menjadi mitra andalan bagi berbagai pabrikan otomotif terkemuka (ATPM), institusi perbankan dan pembiayaan, hingga pelanggan individu yang membutuhkan jasa ekspedisi darat dan laut yang terjamin keamanannya.
              </p>
            </div>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-100 flex items-center justify-center">
            {/* Fallback image if no real image exists */}
            <div className="absolute inset-0 bg-gradient-to-br from-pss-green-50 to-slate-100" />
            <div className="relative z-10 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pss-green-500 text-white text-3xl font-black mx-auto mb-4 shadow-lg shadow-pss-green-500/30">
                P
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Est. 2001</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="bg-slate-50 py-20 border-y border-slate-100">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Visi & Misi</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Menjadi ujung tombak logistik kendaraan di Indonesia dengan berpegang teguh pada prinsip P.A.S.T.I.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-pss-green-500/30 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pss-green-50 text-pss-green-500 mb-6">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Visi</h3>
              <p className="text-slate-600 leading-relaxed">
                Menjadi perusahaan jasa ekspedisi kendaraan darat dan laut terdepan di Indonesia yang mengutamakan kepuasan pelanggan, keamanan unit, dan ketepatan waktu pengiriman melalui layanan berstandar internasional.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-pss-green-500/30 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pss-green-50 text-pss-green-500 mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Misi</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="text-pss-green-500 mt-1">✓</span>
                  <span>Menyediakan layanan pengiriman kendaraan yang aman, cepat, dan terlindungi asuransi menyeluruh.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pss-green-500 mt-1">✓</span>
                  <span>Membangun kemitraan jangka panjang (Ikatan Mitra) yang saling menguntungkan dengan pelanggan korporat maupun individu.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pss-green-500 mt-1">✓</span>
                  <span>Mengembangkan teknologi pelacakan (tracking) real-time demi kenyamanan pelanggan.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Klien & Mitra */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Dipercaya Oleh Industri</h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-12">
          Kami bangga menjadi bagian dari rantai pasok (supply chain) berbagai perusahaan terkemuka di Indonesia.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {PARTNERS.map((p) => (
            <div key={p} className="flex h-20 px-8 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm font-bold text-slate-400 text-xl grayscale hover:grayscale-0 hover:text-pss-green-600 hover:border-pss-green-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              {p}
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <Link href="/layanan/self-drive" className="inline-flex rounded-full bg-pss-green-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-pss-green-500/40 hover:bg-pss-green-600 hover:shadow-xl hover:-translate-y-1 transition-all">
            Lihat Layanan Kami
          </Link>
        </div>
      </section>
    </div>
  );
}
