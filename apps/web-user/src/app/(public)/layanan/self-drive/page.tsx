import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Layanan Self Drive | PT Putra Seganti Setungguan',
  description: 'Layanan ekspedisi kendaraan via driver profesional PSS, aman dan cepat untuk jarak menengah.',
};

export default function SelfDrivePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <div className="absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl z-0" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-pss-green-500/30 bg-pss-green-500/20 px-3 py-1 text-xs font-semibold text-pss-green-400 mb-6 backdrop-blur-sm">
              Layanan Reguler
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
              Self Drive <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pss-green-400 to-emerald-300">Cepat & Ekonomis</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Pengiriman kendaraan jarak pendek hingga menengah yang ditangani langsung oleh pengemudi profesional PT PSS. Solusi cerdas dengan biaya yang lebih efisien tanpa mengorbankan keamanan.
            </p>
            <Link href="/orders/new" className="inline-flex rounded-full bg-pss-green-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-pss-green-500/40 hover:bg-pss-green-600 hover:shadow-xl hover:-translate-y-1 transition-all">
              Pesan Layanan Sekarang
            </Link>
          </div>
          <div className="relative hidden md:block">
            {/* Image for Self Drive */}
            <div className="w-full aspect-square max-w-sm ml-auto relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700 group">
              <Image 
                src="/self-drive.png"
                alt="Hulubalang Self Drive"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Mengapa Memilih Self Drive?</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Sangat direkomendasikan untuk pengiriman dalam kota, antar kota terdekat, hingga penyeberangan pulau via kapal roro.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-lg hover:border-pss-green-200 transition-all">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-pss-green-500 mb-6 shadow-sm border border-slate-100">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Biaya Lebih Efisien</h3>
            <p className="text-slate-600 leading-relaxed">
              Tidak memerlukan armada angkut (truk) tambahan, sehingga menekan biaya operasional. Pilihan tepat untuk budget yang ketat.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-lg hover:border-pss-green-200 transition-all">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-pss-green-500 mb-6 shadow-sm border border-slate-100">
              <span className="text-2xl">👨‍✈️</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Driver Berpengalaman</h3>
            <p className="text-slate-600 leading-relaxed">
              Unit Anda dikemudikan oleh tim driver internal PT PSS yang telah lulus seleksi ketat dan memiliki jam terbang tinggi di berbagai medan.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-lg hover:border-pss-green-200 transition-all">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-pss-green-500 mb-6 shadow-sm border border-slate-100">
              <span className="text-2xl">⏱️</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Waktu Tempuh Fleksibel</h3>
            <p className="text-slate-600 leading-relaxed">
              Kendaraan bisa langsung berangkat (door to door) setelah serah terima, tanpa harus menunggu jadwal atau kapasitas truk penuh.
            </p>
          </div>
        </div>
      </section>

      {/* Prosedur Pengiriman */}
      <section className="bg-slate-900 text-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">Prosedur Pengiriman</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pss-green-500 font-bold text-white shadow-lg">1</div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Check-in Unit</h4>
                    <p className="text-slate-400 text-sm">Tim kami akan memeriksa kondisi awal kendaraan Anda bersama-sama, mendokumentasikan goresan, volume BBM, hingga aksesoris yang ada di dalam mobil.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pss-green-500 font-bold text-white shadow-lg">2</div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Serah Terima Kunci & Dokumen</h4>
                    <p className="text-slate-400 text-sm">Penyerahan kunci dan STNK kendaraan. Kami akan membuatkan Berita Acara Serah Terima (BAST) resmi dari PT PSS.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pss-green-500 font-bold text-white shadow-lg">3</div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Perjalanan & Tracking</h4>
                    <p className="text-slate-400 text-sm">Driver kami mulai perjalanan. Anda dapat memantau pergerakan kendaraan Anda secara real-time via Portal Pelanggan.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pss-green-500 font-bold text-white shadow-lg">4</div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Tiba di Tujuan</h4>
                    <p className="text-slate-400 text-sm">Kendaraan tiba di lokasi yang disepakati. Dilakukan pengecekan akhir dan penandatanganan BAST penyelesaian.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-3xl p-10 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Butuh informasi asuransi?</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Seluruh kendaraan yang dikirimkan menggunakan PT PSS telah dilindungi oleh asuransi pengiriman darat/laut yang komprehensif. Hubungi tim kami untuk mendiskusikan nilai pertanggungan kendaraan Anda.
              </p>
              <a href="https://wa.me/6281296866705" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 px-6 py-3 font-bold hover:bg-pss-green-50 hover:text-pss-green-600 transition-colors w-full">
                <span>💬</span> Tanya Tim Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
