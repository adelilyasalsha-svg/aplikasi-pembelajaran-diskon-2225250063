
# CLAUDE.md
# Panduan Claude Code

## 1. Informasi Proyek

Proyek ini merupakan Aplikasi Pembelajaran Diskon berbasis website untuk siswa SMP kelas 7.

Aplikasi dibuat untuk membantu siswa memahami materi diskon melalui pembelajaran interaktif.

## 2. Teknologi

Teknologi yang digunakan:
- React
- Vite
- JavaScript
- CSS
- Supabase
- Vercel

## 3. Struktur Folder

```text
aplikasi-pembelajaran-diskon-2225250063/
│
├── public/
│   ├── anak-smp.png
│   ├── game-boneka.png
│   ├── game-cover.png
│   ├── game-headphone.png
│   ├── game-sepatu.png
│   ├── game-tas.png
│   ├── musik-belajar.mp3
│   └── icons.svg
│
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── supabase.js
│
├── .env
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── DESIGN.md
├── PRD.md
└── CLAUDE.md
```

## 4. Fitur Aplikasi

Aplikasi memiliki beberapa fitur utama:

1. Identitas siswa.
2. Dashboard pembelajaran.
3. Materi diskon.
4. Pretest.
5. Latihan soal.
6. Posttest.
7. Kalkulator diskon.
8. Game edukasi.
9. Musik pembelajaran.

## 5. Panduan Desain

Gunakan tema Purple Candy.

Palet warna:
- Background: #F7F4FC
- Primary Purple: #8B5BD6
- Dark Purple: #6540A5
- Materi: #C5A5F0
- Pretest: #FFE4A3
- Latihan: #F8C5D9
- Posttest: #BFE8CF
- Card: #FFFFFF

Font:
- Fredoka
- Nunito

## 6. Aturan Pengembangan

1. Jangan menghapus fitur yang sudah berjalan.
2. Pertahankan struktur aplikasi.
3. Jangan mengubah fungsi tanpa alasan yang jelas.
4. Pertahankan desain responsif.
5. Gunakan komponen dan class CSS yang sudah tersedia jika memungkinkan.
6. Jangan menghapus gambar dan aset yang digunakan.
7. Pastikan tampilan konsisten di seluruh halaman.
8. Periksa error setelah melakukan perubahan.

## 7. Perintah Menjalankan Aplikasi

Menjalankan development server:

```bash
npm run dev
```

Membuat build:

```bash
npm run build
```

## 8. Keamanan

- Jangan membagikan isi file .env.
- Jangan memasukkan Supabase service_role key ke frontend.
- Jangan menghapus konfigurasi Supabase tanpa izin.
- Jangan melakukan perubahan database tanpa memahami dampaknya.

## 9. Tujuan Pengembangan

Pastikan setiap perubahan membantu meningkatkan kualitas aplikasi sebagai media pembelajaran matematika yang menarik, interaktif, mudah digunakan, dan responsif.
