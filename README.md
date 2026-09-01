# Hulubalang — TMS PT Putra Seganti Setungguan (PT PSS)

Sistem Informasi Manajemen Transportasi & Ekspedisi Kendaraan (TMS) PT Putra Seganti Setungguan berbasis **Full-Stack Next.js 16**, **Prisma ORM**, dan **Supabase PostgreSQL & Realtime**.

---

## 🌐 Website & Aplikasi Live (Production)

- **Domain Utama:** **[https://hulubalang-pss.vercel.app](https://hulubalang-pss.vercel.app)**
- **Domain Alternatif:** **[https://hulubalang-tms.vercel.app](https://hulubalang-tms.vercel.app)**

### Akses Halaman:
1. **Company Profile PT PSS:** [https://hulubalang-pss.vercel.app](https://hulubalang-pss.vercel.app)
2. **Portal Pelanggan (Order & Live Tracking):** [https://hulubalang-pss.vercel.app/login](https://hulubalang-pss.vercel.app/login)
3. **Portal Admin, Operasional, Driver & Pool Keeper:** [https://hulubalang-pss.vercel.app/admin/login](https://hulubalang-pss.vercel.app/admin/login)

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

# 2. Jalankan aplikasi web
npm run dev

# Buka http://localhost:3000 di browser
```

---

## 📄 Dokumentasi Tambahan
- [Panduan Deployment Vercel](file:///d:/Projects/Hulu/DEPLOYMENT.md)
- [Walkthrough & Riwayat Perubahan](file:///d:/Projects/Hulu/walkthrough.md)
