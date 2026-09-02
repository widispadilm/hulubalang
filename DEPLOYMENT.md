# Panduan Deployment 100% Gratis di Vercel (Next.js + Supabase)

Sistem **Hulubalang TMS** kini menggunakan arsitektur **Full-Stack Next.js** yang terhubung langsung ke **Supabase** via **Prisma ORM** dan **Supabase Realtime**.

Anda hanya membutuhkan **1 Akun Vercel** dan **1 Akun Supabase** — **100% Gratis, 0 Rupiah, dan Tanpa Kartu Kredit sama sekali.**

---

## 1. Status Database Supabase Anda

- **Region:** `ap-south-1`
- **Connection URI (Prisma):** ambil dari dashboard Supabase → **Project Settings → Database → Connection string → URI**, lalu simpan sebagai `DATABASE_URL`.

> ⚠️ **Jangan menuliskan password database, `JWT_SECRET`, atau API key di file ini.**
> Semua nilai rahasia disimpan di **Environment Variables Vercel** dan file `.env` lokal
> (`.env` sudah masuk `.gitignore`). File ini ikut ter-commit ke GitHub — apa pun yang
> ditulis di sini bisa terbaca orang lain.

### Membuat tabel & mengisi data awal

Database yang baru dibuat masih kosong. Jalankan sekali dari komputer lokal, dengan
`DATABASE_URL` yang menunjuk ke Supabase:

```bash
npm run prisma:push --workspace=apps/web   # buat semua tabel
npm run prisma:seed --workspace=apps/web   # isi akun default & data contoh
```

Tanpa langkah ini, aplikasi akan ter-deploy dengan sukses tetapi **semua percobaan login gagal**
karena tabelnya kosong.

---

## 2. Cara Deploy ke Vercel (1 Kali Klik)

1. Buka **[Vercel.com](https://vercel.com)** $\rightarrow$ Login dengan akun **GitHub** Anda.
2. Klik **Add New...** $\rightarrow$ Pilih **Project**.
3. Pilih repository **Hulubalang** dari daftar repository GitHub Anda.
4. Pada halaman konfigurasi project:
   - **Project Name:** `hulubalang` (atau nama pilihan Anda)
   - **Framework Preset:** `Next.js`
   - **Root Directory:** Klik *Edit* dan pilih folder **`apps/web`** — **wajib**, karena repo ini
     monorepo. Kalau dibiarkan di root, build akan "sukses" tetapi semua halaman balas **404**.
   - Pastikan **Include files outside of the root directory in the Build Step** dalam keadaan
     **Enabled** (dependency-nya di-hoist ke root repo oleh npm workspaces).
5. Buka accordion **Environment Variables**, masukkan 4 variabel ini (nilainya ambil dari
   dashboard Supabase Anda, jangan dari dokumen ini):

| Nama Variabel | Sumber Nilai |
|---|---|
| `DATABASE_URL` | Supabase → Project Settings → Database → Connection string (URI) |
| `JWT_SECRET` | Bebas, string acak panjang — buat sendiri, jangan dipakai ulang dari contoh |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon/public key |

   Centang environment **Production**, **Preview**, dan **Development** untuk keempatnya, supaya
   deployment preview dari branch lain tidak ikut error.

6. Klik tombol **Deploy** dan tunggu 1–2 menit hingga selesai!

> **Catatan penting soal "prebuilt deployment":** jangan deploy dengan
> `vercel deploy --prebuilt`. Deployment prebuilt mengunggah hasil build lokal apa adanya,
> sehingga **mengabaikan Root Directory dan Environment Variables** — gejalanya deployment
> terlihat sukses tetapi semua halaman balas `404: NOT_FOUND`. Biarkan Vercel yang membangun,
> yaitu lewat push ke branch `main` atau `npx vercel --prod` (tanpa `--prebuilt`).

---

## 3. Struktur URL Setelah Live

Aplikasi Anda kini memiliki domain resmi Hulubalang:

- **Domain Utama:** **`https://hulubalang.vercel.app`**
- **Website Publik (Company Profile):** `https://hulubalang.vercel.app`
- **Login Pelanggan:** `https://hulubalang.vercel.app/login`
- **Portal Order & Live Tracking:** `https://hulubalang.vercel.app/orders`
- **Login Admin / Internal:** `https://hulubalang.vercel.app/admin/login`
- **Dashboard Admin:** `https://hulubalang.vercel.app/admin/dashboard`
- **Tugas Mobile Driver:** `https://hulubalang.vercel.app/admin/my-trips`
- **Verifikasi Mobile Pool Keeper:** `https://hulubalang.vercel.app/admin/checkpoints`

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
