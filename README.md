# Hulubalang — TMS PT Putra Seganti Setungguan (PT PSS)

Sistem Informasi Manajemen Transportasi & Ekspedisi Kendaraan (TMS) PT Putra Seganti Setungguan berbasis **Full-Stack Next.js 16**, **Prisma ORM**, dan **Supabase PostgreSQL & Realtime**.

---

## 🌐 Website & Aplikasi Live (Production)

- **Domain:** **[https://hulubalang.vercel.app](https://hulubalang.vercel.app)**

### Akses Halaman:
1. **Company Profile PT PSS:** [https://hulubalang.vercel.app](https://hulubalang.vercel.app)
2. **Portal Pelanggan (Order & Live Tracking):** [https://hulubalang.vercel.app/login](https://hulubalang.vercel.app/login)
3. **Portal Admin, Operasional, Driver & Pool Keeper:** [https://hulubalang.vercel.app/admin/login](https://hulubalang.vercel.app/admin/login)

---

## 🔑 Kredensial Uji Coba Default

### 1. Internal Staff & Lapangan (Password untuk SEMUA: `password123`)
| Role / Peran | Email | Password | Fungsi & Akses |
|---|---|---|---|
| **Admin** | `admin@pss.co.id` | `password123` | Akses penuh dashboard, order, trip, master pool |
| **Marketing** | `marketing@pss.co.id` | `password123` | Konfirmasi order baru dari pelanggan |
| **Operation** | `operation@pss.co.id` | `password123` | Penugasan Driver, set ETA, generate Trip ID |
| **Finance** | `finance@pss.co.id` | `password123` | Monitoring penagihan & invoice |
| **Management** | `management@pss.co.id` | `password123` | Monitoring laporan performa armada |
| **Driver 1 (Budi)** | `driver1@pss.co.id` | `password123` | Antarmuka Mobile: Pickup unit & lapor tiba di pool |
| **Driver 2 (Slamet)** | `driver2@pss.co.id` | `password123` | Antarmuka Mobile: Pickup unit & lapor tiba di pool |
| **Penjaga Pool Bekasi** | `keeper.bekasi@pss.co.id` | `password123` | Antarmuka Mobile: Verifikasi fisik unit di Pool Bekasi |
| **Penjaga Pool Surabaya** | `keeper.surabaya@pss.co.id` | `password123` | Antarmuka Mobile: Verifikasi fisik unit di Pool Surabaya |

### 2. Pelanggan (Customer Portal)
- **Email:** `customer@abc.co.id`
- **Metode Login:** OTP (*One-Time Password*) — Masukkan email, klik minta OTP, masukkan kode OTP 6 digit.

---

## 🏗️ Arsitektur Sistem

```
apps/
  web/         Full-Stack Next.js 16 (App Router + Server Actions + Supabase Realtime + Prisma)
               - Company Profile Publik (/tentang-kami, /layanan, /artikel)
               - Portal Pelanggan (/login, /orders, /trips/[id])
               - Portal Internal & Lapangan (/admin/dashboard, /admin/my-trips, /admin/checkpoints)
```

- **Database:** PostgreSQL di **Supabase** (Region `ap-south-1`).
- **Realtime:** Supabase Realtime Channel untuk Live Tracking armada kendaraan tanpa WebSocket server terpisah.
- **Hosting:** Vercel (100% Serverless & Edge Ready).

---

## 💻 Menjalankan Secara Lokal

```bash
# 1. Install dependencies
npm install

# 2. Siapkan environment variable
#    Buat file apps/web/.env berisi DATABASE_URL & JWT_SECRET
#    (contoh untuk PostgreSQL via Docker: docker compose up -d db)

# 3. Buat tabel & isi data awal
npm run prisma:push --workspace=apps/web
npm run prisma:seed --workspace=apps/web

# 4. Jalankan aplikasi web
npm run dev

# Buka http://localhost:3000 di browser
```

> **Penting:** database baru (termasuk Supabase yang baru dibuat) wajib di-seed dulu.
> Tanpa itu tabelnya kosong dan semua percobaan login akan gagal.

---

## 📄 Dokumentasi Tambahan
- [Panduan Deployment Vercel](DEPLOYMENT.md)
- [Walkthrough & Riwayat Perubahan](walkthrough.md)
- [Panduan Penggunaan](Panduan_Penggunaan_Hulubalang.md)
