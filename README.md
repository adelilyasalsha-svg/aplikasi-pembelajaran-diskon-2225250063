# Aplikasi Pembelajaran Diskon Berbasis AI

Aplikasi Pembelajaran Diskon Berbasis AI merupakan media pembelajaran interaktif yang dirancang untuk membantu siswa SMP memahami materi diskon dalam aritmetika sosial. Aplikasi ini dilengkapi dengan Asisten Belajar AI yang dapat memberikan penjelasan, petunjuk, dan bimbingan penyelesaian soal secara bertahap.

## 🎯 Tujuan Pengembangan

Aplikasi ini dikembangkan untuk:
- Membantu siswa memahami konsep diskon.
- Meningkatkan kemampuan siswa dalam menyelesaikan masalah matematika sehari-hari.
- Memberikan pengalaman belajar yang interaktif dan mudah dipahami.
- Membantu siswa belajar secara mandiri melalui bimbingan AI.

## ✨ Fitur Aplikasi

1. **Materi Pembelajaran Diskon**  
   Membantu siswa mempelajari konsep dan perhitungan diskon.

2. **Asisten Belajar AI**  
   Menyediakan layanan tanya jawab mengenai materi diskon menggunakan AI.

3. **Bimbingan Bertahap**  
   Membantu siswa memahami masalah, membangun konsep, serta menerapkan dan memeriksa hasil perhitungan.

4. **Tahapan Pembelajaran**  
   Terdiri dari tiga fase:
   - Fase 1: Pahami Masalah.
   - Fase 2: Bangun Konsep.
   - Fase 3: Terapkan dan Periksa.

5. **Mode Belajar dan Latihan**  
   Mendukung kegiatan belajar melalui penjelasan konsep dan petunjuk penyelesaian soal.

## 🧠 Pendekatan Pembelajaran

Pengembangan aplikasi ini menggunakan dua landasan pembelajaran:

- **Reciprocal Mediation Theory (RMT)** dari Kinard dan Kozulin (2008), sebagai pendekatan untuk membimbing proses berpikir siswa melalui tahapan pembelajaran.
- **Cognitive Load Theory**, untuk membantu mengatur beban kognitif siswa melalui penyajian materi dan petunjuk secara bertahap.

## 🛠️ Teknologi yang Digunakan

- React
- Vite
- JavaScript
- Node.js
- Express.js
- Google Gemini API
- CSS

## 📁 Struktur Proyek

```text
aplikasi-pembelajaran-diskon-2225250063/
│
├── public/
├── src/
│   ├── AsistenBelajar.jsx
│   └── ...
│
├── server/
│   ├── index.js
│   ├── prompt.js
│   └── .env
│
├── index.html
├── package.json
├── .gitignore
└── README.md
```

## ⚙️ Cara Menjalankan Aplikasi

### 1. Clone Repository

```bash
git clone https://github.com/adelilyasalsha-svg/aplikasi-pembelajaran-diskon-2225250063.git
```

### 2. Masuk ke Folder Proyek

```bash
cd aplikasi-pembelajaran-diskon-2225250063
```

### 3. Instal Dependensi

```bash
npm install
```

### 4. Atur API Key Gemini

Buat file `.env` di dalam folder `server`, kemudian isi dengan:

```env
GEMINI_API_KEY=isi_api_key_milikmu
GEMINI_MODEL=gemini-3.5-flash-lite
```

Ganti `isi_api_key_milikmu` dengan API Key Gemini milik sendiri.

**Penting:** Jangan mengunggah file `.env` atau membagikan API Key ke publik.

### 5. Jalankan Backend

Buka terminal dan jalankan:

```bash
node server/index.js
```

### 6. Jalankan Frontend

Buka terminal baru, kemudian jalankan:

```bash
npm run dev
```

Buka alamat lokal yang ditampilkan oleh Vite di browser.

## 🔐 Keamanan

API Key Gemini disimpan pada sisi backend melalui file `.env` agar tidak ditampilkan secara langsung pada kode frontend maupun repository GitHub.

## 👩‍💻 Pengembang

**Adelilya Salsha**

Proyek ini dikembangkan sebagai aplikasi pembelajaran matematika pada materi diskon dalam aritmetika sosial.

---

*Dikembangkan untuk mendukung pembelajaran matematika yang interaktif, bertahap, dan mudah dipahami siswa.*