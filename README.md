# Hulubalang — TMS PT Putra Seganti Setungguan

Implementasi awal (MVP Fase 1 & 2) dari spesifikasi di `Spesifikasi Teknis - Sistem PT PSS.docx`: Web User (company profile + portal pelanggan) dan Web Admin (internal + driver + penjaga pool), dengan backend bersama dan verifikasi pool-to-pool real-time.

## Struktur

```
apps/
  api/         Backend NestJS + Prisma + PostgreSQL + Socket.IO
  web-user/    Next.js — company profile publik + portal pelanggan (login OTP)
  web-admin/   Next.js — dashboard internal (Marketing/Operation/Finance/Management/Admin)
               + tampilan mobile untuk Driver & Penjaga Pool
```

Web User dan Web Admin adalah aplikasi terpisah yang berbagi satu backend (`api`).

## Prasyarat

- Node.js 20.9+
- Docker (untuk PostgreSQL)

## Setup

```bash
npm install                     # install semua workspace sekaligus
docker compose up -d db         # PostgreSQL di localhost:5433

cd apps/api
npx prisma migrate dev          # buat schema database
npx prisma db seed              # isi akun default & master data pool
```

Env sudah disiapkan di masing-masing app (`apps/api/.env`, `apps/web-user/.env.local`, `apps/web-admin/.env.local`) untuk kebutuhan development lokal.

## Menjalankan (3 terminal terpisah)

```bash
npm run dev:api      # http://localhost:3001
npm run dev:user     # http://localhost:3000 — Web User
npm run dev:admin    # http://localhost:3002 — Web Admin
```

## Akun Default (dari seed)

| Role | Email | Password |
|---|---|---|
| Admin | admin@pss.co.id | password123 |
| Marketing | marketing@pss.co.id | password123 |
| Operation | operation@pss.co.id | password123 |
| Finance | finance@pss.co.id | password123 |
| Management | management@pss.co.id | password123 |
| Driver | driver1@pss.co.id / driver2@pss.co.id | password123 |
| Penjaga Pool | keeper.bekasi@pss.co.id / keeper.surabaya@pss.co.id | password123 |

Pelanggan contoh: `customer@abc.co.id` — login di Web User pakai email + OTP (lihat bagian di bawah).

## Alur Uji Coba Pool-to-Pool End-to-End

1. **Web User** (`localhost:3000`) → Login Pelanggan → masukkan `customer@abc.co.id` → kode OTP **ditampilkan langsung di halaman** (mode development, belum terhubung ke email/WA sungguhan) → masuk.
2. Buat order baru dengan 1+ unit kendaraan.
3. **Web Admin** (`localhost:3002`) → login sebagai `marketing@pss.co.id` → buka order → klik **Konfirmasi Order**.
4. Login sebagai `operation@pss.co.id` → buka order yang sama → **Assign Trip** (pilih driver & ETA).
5. Login sebagai `driver1@pss.co.id` (atau driver yang dipilih) → menu **Tugas Saya** → tandai **Pickup**, lalu **Laporkan Tiba di Pool**.
6. Login sebagai `keeper.bekasi@pss.co.id` → menu **Verifikasi Pool** → klik **Verifikasi**.
7. Kembali ke tab **Web User** yang masih terbuka di halaman tracking trip (`/trips/[id]`) — status akan berubah **secara real-time** tanpa refresh, menampilkan checkpoint baru dan tanda ✓ terverifikasi.

## Keterbatasan MVP Saat Ini (lihat Bab 13 Roadmap di spesifikasi)

- **OTP & notifikasi**: kode OTP login pelanggan saat ini di-log ke console API dan ditampilkan langsung di UI (mode dev) — belum terintegrasi ke email/WhatsApp sungguhan.
- **Foto bukti checkpoint**: field `photoUrl` sudah ada di data model, tapi form upload foto dari driver belum dibangun (baru catatan teks).
- **Dokumen** (DO/PO, BSTK, POD, Surat Jalan) dan **Invoice**: model data sudah ada di schema, UI manajemennya (Fase 3) belum dibangun.
- **Reporting Management** (Fase 4) masih berupa angka ringkas di dashboard, belum ada grafik/laporan detail.

## Tech Stack

Next.js 16 (App Router, Server Actions) × 2, NestJS 10, Prisma + PostgreSQL, Socket.IO untuk real-time, JWT untuk sesi (OTP untuk pelanggan, email+password untuk internal).
