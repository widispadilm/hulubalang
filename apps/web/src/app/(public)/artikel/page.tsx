import Image from 'next/image';

export const metadata = {
  title: 'Artikel & Kegiatan | PT Putra Seganti Setungguan',
  description: 'Berita terbaru, kegiatan operasional, dan artikel seputar ekspedisi kendaraan PT PSS.',
};

// Dummy Data
const ARTICLES = [
  {
    id: 1,
    title: 'Pengiriman 50 Unit Fleet Baru untuk Operasional Tambang di Kalimantan',
    excerpt: 'Tim PT PSS sukses menyelesaikan pengiriman 50 unit kendaraan double cabin ke area pertambangan di Kalimantan Timur tepat waktu tanpa kendala berarti.',
    date: '12 Agustus 2026',
    category: 'Kegiatan Operasional',
    imageUrl: '/hero-bg.png', // Using existing truck image as placeholder
  },
  {
    id: 2,
    title: 'Pentingnya Asuransi Pengiriman Kendaraan Antar Pulau',
    excerpt: 'Memahami risiko pengiriman kendaraan antar pulau via jalur laut dan mengapa asuransi menyeluruh (All Risk) sangat krusial bagi ketenangan Anda.',
    date: '05 Agustus 2026',
    category: 'Edukasi & Tips',
    imageUrl: '/hero-bg.png', 
  },
  {
    id: 3,
    title: 'Peresmian Kantor Cabang Baru PT PSS di Surabaya',
    excerpt: 'Dalam rangka memperluas jangkauan layanan logistik di wilayah timur Indonesia, PT PSS resmi membuka cabang baru di Tanjung Perak, Surabaya.',
    date: '28 Juli 2026',
    category: 'Berita Perusahaan',
    imageUrl: '/hero-bg.png', 
  },
  {
    id: 4,
    title: 'Perbedaan Self Drive dan Towing: Mana yang Cocok Untuk Anda?',
    excerpt: 'Panduan lengkap memilih layanan pengiriman kendaraan yang paling efisien sesuai dengan jenis mobil, jarak, dan anggaran yang Anda miliki.',
    date: '15 Juli 2026',
    category: 'Edukasi & Tips',
    imageUrl: '/hero-bg.png', 
  },
];

export default function ArtikelPage() {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Artikel & <span className="text-pss-green-500">Kegiatan</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Ikuti terus pembaruan terbaru seputar operasional, edukasi logistik, dan aktivitas pengiriman kendaraan oleh tim PT PSS di seluruh Indonesia.
          </p>
        </div>
      </section>

      {/* Article Grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article key={article.id} className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-pss-green-500/10 hover:border-pss-green-500/30 transition-all duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <Image 
                  src={article.imageUrl} 
                  alt={article.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-pss-green-600 rounded-full shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-xs font-semibold text-slate-400 mb-3">{article.date}</p>
                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-pss-green-600 transition-colors line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-auto">
                  <span className="inline-flex items-center text-sm font-bold text-pss-green-500 group-hover:text-pss-green-600 transition-colors cursor-pointer">
                    Baca Selengkapnya 
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Pagination Dummy */}
        <div className="mt-16 flex justify-center gap-2">
          <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
            ←
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-pss-green-500 text-white font-bold shadow-md shadow-pss-green-500/30">
            1
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-pss-green-500/30">
            2
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-pss-green-500/30">
            3
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-pss-green-500/30">
            →
          </button>
        </div>
      </section>
    </div>
  );
}
