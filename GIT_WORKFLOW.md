# Standar Operasional Prosedur (SOP) Git Harian — Hulubalang

Panduan alur kerja (*daily workflow*) saat berpindah-pindah pengerjaan antara **Windows** dan **Mac**, dengan aturan wajib **Push ke branch & Merge ke `main`** di akhir hari kerja.

---

## 🌅 1. Awal Hari (Sebelum Mulai Coding)

Pastikan branch Anda selalu mengambil update terbaru dari `main`:

### Di Windows:
```bash
git checkout dev-windows
git merge main
```

### Di Mac:
```bash
git checkout dev-mac
git pull origin main
git merge main
```

---

## 💻 2. Saat Sedang Mengerjakan Fitur
Bekerjalah seperti biasa di branch masing-masing (`dev-windows` di PC Windows, `dev-mac` di laptop Mac).

---

## 🌙 3. Akhir Hari / Selesai Sesi (Wajib Push & Merge ke Main)

Lakukan 3 langkah ringkas ini sebelum mematikan komputer:

### A. Jika Selesai dari Windows:
```bash
# 1. Simpan dan push perubahan di branch dev-windows
git add .
git commit -m "feat/fix: rangkuman pekerjaan hari ini dari windows"
git push origin dev-windows

# 2. Gabungkan (Merge) ke branch main
git checkout main
git merge dev-windows
git push origin main

# 3. Kembali ke branch dev-windows
git checkout dev-windows
```

---

### B. Jika Selesai dari Mac:
```bash
# 1. Simpan dan push perubahan di branch dev-mac
git add .
git commit -m "feat/fix: rangkuman pekerjaan hari ini dari mac"
git push origin dev-mac

# 2. Gabungkan (Merge) ke branch main
git checkout main
git pull origin main
git merge dev-mac
git push origin main

# 3. Kembali ke branch dev-mac
git checkout dev-mac
```

---

## 🚀 Keuntungan Alur Ini:
1. **Branch `main` selalu berisi versi stabil paling baru** yang siap dilihat klien / manajemen di Vercel (`hulubalang-pss.vercel.app`).
2. **Riwayat pengerjaan tetap rapi** tercatat apakah dikerjakan dari Windows atau Mac.
3. **Bebas konflik (conflict-free):** Saat Anda pindah dari Windows ke Mac (atau sebaliknya), Anda cukup menjalankan `git pull origin main && git merge main`.
