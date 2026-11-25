
// Bank soal Mathematical Literacy (materi diskon).
// Disimpan di BACKEND agar kunci jawaban tidak dikirim ke browser siswa.

export const PROBLEMS = {
  1: {
    indicator: "Mathematical Reasoning",
    text: `Memilih Toko Tas.

Dina ingin membeli tas yang harga awalnya Rp200.000.
Toko A memberi diskon 25%.
Toko B memberi diskon 20%, lalu potongan tambahan Rp15.000.
Toko C memberi diskon 10%, lalu diskon 10% lagi dari harga setelah diskon pertama.

Dina ingin membayar sesedikit mungkin. Di toko mana Dina sebaiknya membeli tas? Jelaskan alasan matematis Anda.`,
    answerKeys: ["Toko B", "145.000"],
    focus:
      "Bandingkan harga akhir ketiga toko. Diskon kedua Toko C dihitung dari harga setelah diskon pertama, bukan harga awal. Siswa perlu memberikan alasan matematis atas pilihannya.",
  },

  2: {
    indicator: "Formulating Situations Mathematically",
    text: `Belanja Perlengkapan Sekolah.

Bu Sari membeli 3 kemeja seragam seharga Rp85.000 per potong dan 2 topi seharga Rp25.000 per buah. Toko memberi diskon 20% khusus untuk kemeja, sedangkan topi tidak didiskon. Bu Sari membawa uang Rp300.000.

Ubahlah situasi tersebut menjadi model matematika untuk menentukan apakah uang Bu Sari cukup, kemudian selesaikan.`,
    answerKeys: ["254.000", "46.000"],
    focus:
      "Identifikasi informasi relevan, susun model matematika, hitung diskon kemeja dan harga topi, tentukan total pembayaran, lalu bandingkan dengan uang Bu Sari dan hitung kembalian.",
  },

  3: {
    indicator: "Employing Mathematical Concepts, Facts, and Procedures",
    text: `Harga Sepatu.

Sebuah sepatu diberi diskon 35%. Rani membayar sepatu tersebut sebesar Rp156.000 setelah diskon.

Berapakah harga awal sepatu dan besar diskonnya? Tunjukkan langkah perhitungan Anda.`,
    answerKeys: ["240.000", "84.000"],
    focus:
      "Persentase yang dibayar adalah 65% dari harga awal. Gunakan model 65% × harga awal = Rp156.000 untuk mencari harga awal dan besar diskon.",
  },

  4: {
    indicator: "Interpreting, Applying, and Evaluating Mathematical Outcomes",
    text: `Diskon Bertingkat.

Sebuah toko memasang tulisan "Diskon 50% + 20%" pada baju yang harga awalnya Rp200.000. Budi menyimpulkan bahwa total diskonnya 70%, sehingga ia hanya perlu membayar 30% × Rp200.000 = Rp60.000.

Apakah Anda setuju dengan kesimpulan Budi? Tentukan harga yang sebenarnya harus dibayar dan jelaskan alasan Anda.`,
    answerKeys: ["80.000", "60%"],
    focus:
      "Evaluasi klaim Budi. Hitung diskon pertama, hitung diskon kedua dari harga setelah diskon pertama, tentukan total potongan dan harga akhir, lalu jelaskan mengapa persentase diskon tidak boleh langsung dijumlahkan.",
  },
};
