# Panduan Deployment 100% Gratis di Vercel (Next.js + Supabase)

Sistem **Hulubalang TMS** kini menggunakan arsitektur **Full-Stack Next.js** yang terhubung langsung ke **Supabase** via **Prisma ORM** dan **Supabase Realtime**.

Anda hanya membutuhkan **1 Akun Vercel** dan **1 Akun Supabase** — **100% Gratis, 0 Rupiah, dan Tanpa Kartu Kredit sama sekali.**

---

## 1. Status Database Supabase Anda

Database Supabase Anda sudah aktif dan terisi data:
- **Supabase URL:** `https://iimcidhaqldpujjbhdvi.supabase.co`
- **Region:** `ap-south-1`
- **Connection URI (Prisma):**
  ```env
  DATABASE_URL="postgresql://postgres.iimcidhaqldpujjbhdvi:hulubalang123@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?schema=public"
  ```
- **Tabel & Data Seed:** Sudah otomatis terbuat dan diisi akun default.

---

## 2. Cara Deploy ke Vercel (1 Kali Klik)

1. Buka **[Vercel.com](https://vercel.com)** $\rightarrow$ Login dengan akun **GitHub** Anda.
2. Klik **Add New...** $\rightarrow$ Pilih **Project**.
3. Pilih repository **Hulubalang** dari daftar repository GitHub Anda.
4. Pada halaman konfigurasi project:
   - **Project Name:** `hulubalang` (atau nama pilihan Anda)
   - **Framework Preset:** `Next.js`
   - **Root Directory:** Klik *Edit* dan pilih folder **`apps/web`**.
5. Buka accordion **Environment Variables**, masukkan 4 variabel ini:

| Nama Variabel | Nilai / Value |
|---|---|
| `DATABASE_URL` | `postgresql://postgres.iimcidhaqldpujjbhdvi:hulubalang123@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?schema=public` |
| `JWT_SECRET` | `hulubalang_super_secret_jwt_key_12345` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://iimcidhaqldpujjbhdvi.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_fSUe0gRNCSfVM0YdlOR1EA_2q3k6VUb` |

6. Klik tombol **Deploy** dan tunggu 1–2 menit hingga selesai!

---

## 3. Struktur URL Setelah Live

Aplikasi Anda kini memiliki domain resmi Hulubalang:

- **Domain Utama:** **`https://hulubalang-pss.vercel.app`** atau **`https://hulubalang-tms.vercel.app`**
- **Website Publik (Company Profile):** `https://hulubalang-pss.vercel.app`
- **Login Pelanggan:** `https://hulubalang-pss.vercel.app/login`
- **Portal Order & Live Tracking:** `https://hulubalang-pss.vercel.app/orders`
- **Login Admin / Internal:** `https://hulubalang-pss.vercel.app/admin/login`
- **Dashboard Admin:** `https://hulubalang-pss.vercel.app/admin/dashboard`
- **Tugas Mobile Driver:** `https://hulubalang-pss.vercel.app/admin/my-trips`
- **Verifikasi Mobile Pool Keeper:** `https://hulubalang-pss.vercel.app/admin/checkpoints`

---

## 4. Akun Uji Coba Default

| Peran (Role) | Email | Password |
|---|---|---|
| **Admin** | `admin@pss.co.id` | `password123` |
| **Marketing** | `marketing@pss.co.id` | `password123` |
| **Operation** | `operation@pss.co.id` | `password123` |
| **Driver 1** | `driver1@pss.co.id` | `password123` |
| **Driver 2** | `driver2@pss.co.id` | `password123` |
| **Penjaga Pool Bekasi** | `keeper.bekasi@pss.co.id` | `password123` |
| **Penjaga Pool Sby** | `keeper.surabaya@pss.co.id` | `password123` |
| **Pelanggan Contoh** | `customer@abc.co.id` | *Login via OTP* |
