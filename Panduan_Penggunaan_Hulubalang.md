# Panduan Penggunaan Portal Admin Hulubalang

Dokumen ini berisi panduan penggunaan sistem informasi Web Admin Hulubalang (`http://localhost:3002`) berdasarkan peran (*role*) masing-masing pengguna. 

Setiap pengguna hanya akan melihat menu yang relevan dengan tanggung jawab mereka saat melakukan *login* ke dalam sistem.

---

## 1. Role: Admin (ADMIN)
**Deskripsi:** Memiliki hak akses tertinggi dalam sistem dan dapat mengakses hampir seluruh modul operasional.
**Menu yang diakses:**
- **Dashboard:** Melihat ringkasan seluruh order, order terkonfirmasi, perjalanan (*trip*) aktif, dan total order keseluruhan.
- **Orders:** Melihat, mengelola, dan memperbarui status pesanan dari pelanggan.
- **Trips:** Memantau seluruh perjalanan armada, menugaskan driver, dan melihat status pengiriman.
- **Verifikasi Pool:** Memantau proses serah terima dan pengecekan kendaraan di pool.
- **Master Pool:** Mengelola data lokasi pool, kapasitas, dan informasi operasional pool.

---

## 2. Role: Operation (OPERATION)
**Deskripsi:** Tim lapangan yang bertanggung jawab atas kelancaran armada dan distribusi pengiriman.
**Menu yang diakses:**
- **Dashboard:** Memantau metrik operasional utama secara *real-time*.
- **Orders:** Memastikan order yang masuk dapat diakomodasi oleh ketersediaan armada.
- **Trips:** Mengatur jadwal perjalanan, menentukan rute, dan menugaskan *driver* untuk setiap order.
- **Verifikasi Pool:** Memastikan setiap kendaraan melewati prosedur *checkpoint* dengan benar.
- **Master Pool:** Mengawasi data dan kapasitas pool fisik perusahaan.

---

## 3. Role: Marketing (MARKETING)
**Deskripsi:** Tim yang berhadapan langsung dengan permintaan pelanggan dan fokus pada penjualan/layanan.
**Menu yang diakses:**
- **Dashboard:** Melihat status pesanan untuk dapat memberikan *update* cepat kepada pelanggan.
- **Orders:** Menerima pesanan baru, melakukan validasi awal, dan mengonfirmasi pesanan (dari *Pending* menjadi *Confirmed*).

---

## 4. Role: Finance (FINANCE)
**Deskripsi:** Tim keuangan yang bertugas memverifikasi pembayaran dan memantau biaya operasional.
**Menu yang diakses:**
- **Dashboard:** Melihat volume order yang berjalan untuk proyeksi pendapatan.
- **Orders:** Memeriksa status tagihan (*invoice*) dan memastikan pembayaran pelanggan telah diselesaikan sebelum/sesudah order.
- **Trips:** Memantau perjalanan untuk perhitungan uang jalan *driver* atau klaim operasional perjalanan.

---

## 5. Role: Management (MANAGEMENT)
**Deskripsi:** Pihak eksekutif yang membutuhkan gambaran besar (*helicopter view*) dari operasional bisnis.
**Menu yang diakses:**
- **Dashboard:** Memantau KPI bisnis, total order, dan performa keseluruhan.
- **Orders:** Melihat rekapitulasi permintaan pelanggan.
- **Trips:** Melihat rekapitulasi efisiensi pengiriman dan utilitas armada secara makro.

---

## 6. Role: Driver (DRIVER)
**Deskripsi:** Pengemudi armada *towing* atau *self-drive* yang terjun langsung ke lapangan. (*Dioptimalkan untuk penggunaan via Mobile/HP*).
**Menu yang diakses:**
- **Dashboard Khusus Driver:** Melihat ringkasan "Trip Aktif" dan "Total Trip" yang telah diselesaikan.
- **Tugas Saya (My Trips):** 
  - Melihat detail penugasan yang diberikan oleh tim Operation.
  - Memperbarui status perjalanan (misal: Menuju Lokasi, Unit Diangkut, Selesai).
  - Melakukan *upload* bukti foto pengiriman.

---

## 7. Role: Penjaga Pool (POOL_KEEPER)
**Deskripsi:** Petugas fisik di titik lokasi Pool (Gudang/Titik Transit) yang melakukan pengecekan unit.
**Menu yang diakses:**
- **Dashboard Khusus Penjaga Pool:** Melihat angka "Menunggu Verifikasi" secara *real-time* untuk mengetahui kendaraan mana yang akan segera tiba atau perlu diproses.
- **Verifikasi Pool:**
  - Menerima kedatangan kendaraan (baik armada Hulubalang maupun unit milik pelanggan).
  - Melakukan inspeksi kondisi fisik (*checkpoint*).
  - Menyetujui atau menolak status serah terima unit di dalam pool.

---

> **Tip Keamanan:** Selalu pastikan Anda keluar (*Logout*) dengan menekan tombol **Keluar** di bagian bawah menu navigasi setelah selesai menggunakan sistem, terutama jika menggunakan perangkat bersama (komputer pool/kantor).
