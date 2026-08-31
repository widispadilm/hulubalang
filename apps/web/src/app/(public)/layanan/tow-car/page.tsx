import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Layanan Towing (Tow Car) | PT Putra Seganti Setungguan',
  description: 'Layanan derek gendong VIP untuk mobil baru, sport, atau kendaraan tidak berfungsi. Keamanan maksimal (1 truk 1 mobil).',
};

export default function TowCarPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <div className="absolute top-0 right-0 h-[30rem] w-[30rem] -translate-y-1/2 translate-x-1/3 rounded-full bg-pss-green-500/20 blur-3xl z-0" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-400 mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              Layanan VIP / Premium
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
              Towing (Tow Car) <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pss-green-400 to-emerald-300">Aman & Eksklusif</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Pengiriman kendaraan menggunakan armada truk towing khusus dengan sistem &quot;satu truk untuk satu mobil&quot;. Pilihan terbaik untuk mobil baru, mobil pameran, mobil sport, atau kendaraan yang mogok/rusak.
            </p>
            <Link href="/orders/new" className="inline-flex rounded-full bg-pss-green-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-pss-green-500/40 hover:bg-pss-green-600 hover:shadow-xl hover:-translate-y-1 transition-all">
              Pesan Towing Sekarang
            </Link>
          </div>
          <div className="relative hidden md:block">
            {/* Image for Tow Car */}
            <div className="w-full aspect-square max-w-sm ml-auto relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700 group">
              <Image 
                src="/tow-car.png"
                alt="Hulubalang Tow Car"
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
          <h2 className="text-3xl font-bold text-slate-900">Mengapa Memilih Towing Kami?</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Memberikan perlindungan maksimal agar kendaraan Anda tiba di tujuan dalam kondisi sama persis seperti saat berangkat.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-pss-green-500/30 transition-all duration-300 group">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pss-green-50 text-pss-green-500 mb-6 group-hover:bg-pss-green-500 group-hover:text-white transition-colors">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Nol Kilometer Bertambah</h3>
            <p className="text-slate-600 leading-relaxed">
              Karena kendaraan dinaikkan ke atas truk, jarak tempuh (odometer) mobil Anda tidak akan bertambah. Sangat cocok untuk mobil baru dari dealer/showroom.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-pss-green-500/30 transition-all duration-300 group">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pss-green-50 text-pss-green-500 mb-6 group-hover:bg-pss-green-500 group-hover:text-white transition-colors">
              <span className="text-2xl">🔧</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Keausan Mesin Nol</h3>
            <p className="text-slate-600 leading-relaxed">
              Mesin mobil Anda mati selama perjalanan. Bebas dari risiko ban aus, debu berlebih, benturan krikil aspal, atau kelelahan mesin untuk rute jarak jauh.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-pss-green-500/30 transition-all duration-300 group">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pss-green-50 text-pss-green-500 mb-6 group-hover:bg-pss-green-500 group-hover:text-white transition-colors">
              <span className="text-2xl">🚨</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Bisa Untuk Mobil Mogok</h3>
            <p className="text-slate-600 leading-relaxed">
              Dilengkapi dengan mesin derek hidrolik (winch) untuk menarik mobil mogok atau mobil tabrakan naik ke atas bak truk dengan aman tanpa merusak rangka.
            </p>
          </div>
        </div>
      </section>

      {/* Jenis Armada Towing */}
      <section className="bg-slate-50 border-y border-slate-200 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Jenis Armada Kami</h2>
                <p className="text-slate-600">PT PSS memiliki armada truk towing modern yang dirawat secara berkala untuk menjamin kelancaran pengiriman.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-6 items-start">
                <div className="bg-pss-green-50 p-4 rounded-xl text-pss-green-600 font-black text-2xl">01</div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Towing Flatbed (Standar)</h4>
                  <p className="text-slate-600 text-sm">Bak truk datar, cocok untuk hampir semua jenis mobil penumpang standar (SUV, MPV, Sedan).</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-6 items-start">
                <div className="bg-pss-green-50 p-4 rounded-xl text-pss-green-600 font-black text-2xl">02</div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Towing Hidrolik Khusus</h4>
                  <p className="text-slate-600 text-sm">Bak truk bisa turun hingga menyentuh aspal. Sangat aman untuk mobil sport (ground clearance rendah) agar bumper tidak tergores saat naik ke truk.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -top-10 -right-10 text-9xl opacity-10">🚚</div>
              <h3 className="text-xl font-bold mb-6 relative z-10">Cocok Digunakan Untuk:</h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-pss-green-500"></div>
                  <span>Mobil Baru dari Showroom ke Rumah</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-pss-green-500"></div>
                  <span>Mobil Sport, Supercar, atau Mobil Antik</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-pss-green-500"></div>
                  <span>Mobil Pameran / Pindah Cabang Dealer</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-pss-green-500"></div>
                  <span>Evakuasi Mobil Mogok di Luar Kota</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-pss-green-500"></div>
                  <span>Alat berat kecil s.d 5 ton (Forklift/Genset)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
