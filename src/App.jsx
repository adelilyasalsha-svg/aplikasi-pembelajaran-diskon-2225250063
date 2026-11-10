
import { useState } from 'react'
import { supabase } from './supabase'
import './App.css'

const soal = [
  {
    pertanyaan: 'Apa yang dimaksud dengan diskon?',
    pilihan: [
      'Kenaikan harga barang',
      'Potongan harga barang',
      'Pajak barang',
      'Harga asli barang'
    ],
    jawaban: 1
  },
  {
    pertanyaan: 'Sebuah tas seharga Rp100.000 mendapat diskon 20%. Berapa potongan harganya?',
    pilihan: ['Rp10.000', 'Rp20.000', 'Rp30.000', 'Rp40.000'],
    jawaban: 1
  },
  {
    pertanyaan: 'Jika harga baju Rp80.000 mendapat diskon 25%, berapa harga diskonnya?',
    pilihan: ['Rp10.000', 'Rp15.000', 'Rp20.000', 'Rp25.000'],
    jawaban: 2
  },
  {
    pertanyaan: 'Sebuah sepatu seharga Rp200.000 mendapat diskon 10%. Berapa harga setelah diskon?',
    pilihan: ['Rp170.000', 'Rp180.000', 'Rp190.000', 'Rp200.000'],
    jawaban: 1
  },
  {
    pertanyaan: 'Rumus untuk menghitung besar diskon adalah ...',
    pilihan: [
      'Harga awal + persentase diskon',
      'Harga awal × persentase diskon',
      'Harga awal − persentase diskon',
      'Harga awal ÷ persentase diskon'
    ],
    jawaban: 1
  }
]

const soalLatihan = [
  {
    pertanyaan: 'Sebuah buku seharga Rp50.000 mendapat diskon 10%. Berapa besar diskonnya?',
    pilihan: ['Rp2.000', 'Rp5.000', 'Rp10.000', 'Rp15.000'],
    jawaban: 1
  },
  {
    pertanyaan: 'Harga sebuah tas Rp150.000 mendapat diskon 20%. Berapa harga setelah diskon?',
    pilihan: ['Rp100.000', 'Rp110.000', 'Rp120.000', 'Rp130.000'],
    jawaban: 2
  },
  {
    pertanyaan: 'Sebuah baju seharga Rp80.000 mendapat diskon 25%. Berapa besar potongan harganya?',
    pilihan: ['Rp10.000', 'Rp20.000', 'Rp25.000', 'Rp30.000'],
    jawaban: 1
  }
]

const soalPosttest = [
  {
    pertanyaan: 'Diskon merupakan istilah lain dari ...',
    pilihan: [
      'Tambahan harga',
      'Pajak pembelian',
      'Potongan harga',
      'Keuntungan penjual'
    ],
    jawaban: 2
  },
  {
    pertanyaan: 'Harga sebuah jam Rp120.000 mendapat diskon 10%. Berapa besar diskonnya?',
    pilihan: ['Rp10.000', 'Rp12.000', 'Rp15.000', 'Rp20.000'],
    jawaban: 1
  },
  {
    pertanyaan: 'Sebuah sepatu seharga Rp250.000 mendapat diskon 20%. Berapa harga setelah diskon?',
    pilihan: ['Rp150.000', 'Rp200.000', 'Rp210.000', 'Rp220.000'],
    jawaban: 1
  },
  {
    pertanyaan: 'Jika harga awal barang Rp100.000 dan potongan harganya Rp15.000, maka harga akhirnya adalah ...',
    pilihan: ['Rp75.000', 'Rp80.000', 'Rp90.000', 'Rp85.000'],
    jawaban: 3
  },
  {
    pertanyaan: 'Sebuah barang seharga Rp200.000 mendapat diskon 15%. Berapa besar potongan harganya?',
    pilihan: ['Rp15.000', 'Rp20.000', 'Rp30.000', 'Rp35.000'],
    jawaban: 2
  }
]

function LearningIllustration() {
  return (
    <div className="shopping-illustration">
      <div className="illustration-decoration decoration-one">✦</div>
      <div className="illustration-decoration decoration-two">＋</div>
      <div className="illustration-decoration decoration-three">✧</div>

      <div className="illustration-card">
        <div className="illustration-circle">
          <span>%</span>
        </div>

        <div className="illustration-book">
          <svg viewBox="0 0 220 160" fill="none">
            <path
              d="M110 42C83 24 48 25 19 36V126C51 115 83 116 110 134V42Z"
              fill="#FFFFFF"
              stroke="#7965C9"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path
              d="M110 42C137 24 172 25 201 36V126C169 115 137 116 110 134V42Z"
              fill="#F8F3FF"
              stroke="#7965C9"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path d="M110 42V134" stroke="#7965C9" strokeWidth="5"/>
            <path d="M39 57C57 51 77 52 91 60" stroke="#D5C8FF" strokeWidth="5" strokeLinecap="round"/>
            <path d="M39 76C57 70 77 71 91 79" stroke="#D5C8FF" strokeWidth="5" strokeLinecap="round"/>
            <path d="M129 60C145 52 164 51 182 57" stroke="#D5C8FF" strokeWidth="5" strokeLinecap="round"/>
            <path d="M129 79C145 71 164 70 182 76" stroke="#D5C8FF" strokeWidth="5" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="illustration-pencil">✏️</div>
        <div className="illustration-star">⭐</div>
      </div>

      <div className="illustration-caption">
        <span>Belajar</span>
        <span>Berhitung</span>
        <span>Berprestasi!</span>
      </div>
    </div>
  )
}

function QuestionScreen({
  judul,
  deskripsi,
  daftarSoal,
  jawaban,
  setJawaban,
  selesai,
  hasil,
  kembali
}) {
  const [nomor, setNomor] = useState(0)

  const soalAktif = daftarSoal[nomor]
  const sudahMenjawab = jawaban[nomor] !== undefined
  const semuaTerjawab = daftarSoal.every(
    (_, index) => jawaban[index] !== undefined
  )

  const pilihJawaban = (index) => {
    if (hasil !== null) return

    setJawaban((sebelumnya) => ({
      ...sebelumnya,
      [nomor]: index
    }))
  }

  const hitungNilai = () => {
    const benar = daftarSoal.filter(
      (item, index) => jawaban[index] === item.jawaban
    ).length

    return Math.round((benar / daftarSoal.length) * 100)
  }

  if (hasil !== null) {
    return (
      <div className="quiz-container">
        <div className="quiz-card result-quiz-card">
          <div className="result-icon">🎉</div>
          <p className="section-label">{judul}</p>
          <h2>{judul} Selesai!</h2>
          <p>Kamu telah menyelesaikan semua soal. Kerja bagus!</p>

          <div className="score-circle">
            <span>{hasil}</span>
            <small>Nilai</small>
          </div>

          <p>
            Jawaban benar:{' '}
            {daftarSoal.filter(
              (item, index) => jawaban[index] === item.jawaban
            ).length}{' '}
            dari {daftarSoal.length} soal.
          </p>

          <button className="primary-button full-button" onClick={kembali}>
            Kembali ke Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <button className="back-button" onClick={kembali}>
          ← Kembali
        </button>

        <p className="section-label">{judul}</p>
        <h2>{deskripsi}</h2>

        <div className="quiz-progress">
          <div className="progress-info">
            <span>Progres pengerjaan</span>
            <strong>{nomor + 1}/{daftarSoal.length}</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${((nomor + 1) / daftarSoal.length) * 100}%`
              }}
            />
          </div>
        </div>

        <h3 className="question-title">{soalAktif.pertanyaan}</h3>

        <div className="answer-list">
          {soalAktif.pilihan.map((pilihan, index) => (
            <button
              key={index}
              className={`answer-option ${
                jawaban[nomor] === index ? 'selected' : ''
              }`}
              onClick={() => pilihJawaban(index)}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {pilihan}
            </button>
          ))}
        </div>

        <div className="quiz-navigation">
          <button
            className="secondary-button"
            disabled={nomor === 0}
            onClick={() => setNomor(nomor - 1)}
          >
            Sebelumnya
          </button>

          {nomor < daftarSoal.length - 1 ? (
            <button
              className="primary-button"
              disabled={!sudahMenjawab}
              onClick={() => setNomor(nomor + 1)}
            >
              Selanjutnya →
            </button>
          ) : (
            <button
              className="primary-button"
              disabled={!semuaTerjawab}
              onClick={() => selesai(hitungNilai())}
            >
              Selesaikan →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [halaman, setHalaman] = useState('identitas')
  const [namaSiswa, setNamaSiswa] = useState('')
  const [kelasSiswa, setKelasSiswa] = useState('')

  const [jawaban, setJawaban] = useState({})
  const [hasil, setHasil] = useState(null)

  const [jawabanLatihan, setJawabanLatihan] = useState({})
  const [nilaiLatihan, setNilaiLatihan] = useState(null)

  const [jawabanPosttest, setJawabanPosttest] = useState({})
  const [nilaiPosttest, setNilaiPosttest] = useState(null)

  const [refleksi, setRefleksi] = useState('')

  const [sedangMenyimpan, setSedangMenyimpan] = useState(false)
  const [statusSimpan, setStatusSimpan] = useState('')
  const [sudahDisimpan, setSudahDisimpan] = useState(false)

  const mulaiBelajar = (e) => {
    e.preventDefault()

    if (!namaSiswa.trim() || !kelasSiswa.trim()) return

    setHalaman('dashboard')
  }

  const gantiSiswa = () => {
    setNamaSiswa('')
    setKelasSiswa('')

    setJawaban({})
    setHasil(null)

    setJawabanLatihan({})
    setNilaiLatihan(null)

    setJawabanPosttest({})
    setNilaiPosttest(null)

    setRefleksi('')
    setStatusSimpan('')
    setSudahDisimpan(false)
    setSedangMenyimpan(false)

    setHalaman('identitas')
  }

  const simpanHasil = async (nilai) => {
    setNilaiPosttest(nilai)
    setSedangMenyimpan(true)
    setStatusSimpan('')

    try {
      const { error } = await supabase
        .from('hasil_belajar')
        .insert([
          {
            nama_siswa: namaSiswa.trim(),
            nilai_pretest: hasil,
            nilai_latihan: nilaiLatihan,
            nilai_posttest: nilai
          }
        ])

      if (error) {
        console.error('Gagal menyimpan:', error)
        setStatusSimpan(
          'Nilai belum berhasil disimpan. Silakan periksa koneksi Supabase.'
        )
      } else {
        setStatusSimpan('Hasil belajar berhasil disimpan!')
        setSudahDisimpan(true)
      }
    } catch (error) {
      console.error('Kesalahan koneksi:', error)
      setStatusSimpan(
        'Terjadi kesalahan koneksi. Hasil tetap dapat dilihat di halaman ini.'
      )
    } finally {
      setSedangMenyimpan(false)
      setHalaman('hasil')
    }
  }

  const daftarNilai = [
    { nama: 'Pretest', nilai: hasil },
    { nama: 'Latihan', nilai: nilaiLatihan },
    { nama: 'Posttest', nilai: nilaiPosttest }
  ]

  const nilaiTerisi = daftarNilai.filter(
    (item) => item.nilai !== null
  )

  const rataRata = nilaiTerisi.length > 0
    ? Math.round(
        nilaiTerisi.reduce((total, item) => total + item.nilai, 0) /
        nilaiTerisi.length
      )
    : null

  const selisihNilai =
    hasil !== null && nilaiPosttest !== null
      ? nilaiPosttest - hasil
      : null

  const kesimpulanEvaluasi = () => {
    if (hasil === null && nilaiPosttest === null) {
      return 'Kamu belum mengerjakan Pretest dan Posttest. Mulailah mengerjakan soal untuk melihat perkembangan pemahamanmu.'
    }

    if (hasil === null || nilaiPosttest === null) {
      return 'Data belum lengkap. Selesaikan Pretest dan Posttest agar perkembangan hasil belajarmu dapat dibandingkan.'
    }

    if (selisihNilai > 0) {
      return `Hebat! Nilai Posttest meningkat ${selisihNilai} poin dibandingkan Pretest. Hal ini menunjukkan adanya perkembangan pemahaman setelah belajar.`
    }

    if (selisihNilai < 0) {
      return `Nilai Posttest turun ${Math.abs(selisihNilai)} poin dibandingkan Pretest. Jangan berkecil hati, pelajari kembali materi dan contoh soal diskon.`
    }

    return 'Nilai Pretest dan Posttest sama. Terus berlatih agar pemahamanmu tentang materi diskon semakin baik.'
  }

  return (
    <div className="app">
      <header className="main-header">
        <div className="header-brand">
          <div className="brand-icon">📚</div>
          <div>
            <h2>Belajar Diskon</h2>
            <p>MEDIA PEMBELAJARAN MATEMATIKA</p>
          </div>
        </div>

        {halaman !== 'identitas' && (
          <div className="header-user">
            <span>👤 {namaSiswa} · {kelasSiswa}</span>
            <button onClick={gantiSiswa}>Ganti Siswa</button>
          </div>
        )}
      </header>

      <main className="main-content">
        {halaman === 'identitas' && (
          <section className="welcome-section">
            <div className="welcome-content">
              <div className="welcome-badge">
                ✨ MEDIA PEMBELAJARAN MATEMATIKA
              </div>

              <h1>
                Yuk, Belajar
                <span>Diskon!</span>
              </h1>

              <p className="welcome-description">
                Belajar memahami konsep diskon, menghitung potongan harga,
                dan menyelesaikan masalah matematika dalam kehidupan
                sehari-hari dengan cara yang menyenangkan.
              </p>

              <div className="welcome-points">
                <div>📖 Materi mudah dipahami</div>
                <div>✏️ Latihan soal interaktif</div>
                <div>🏆 Tantang kemampuanmu</div>
              </div>

              <LearningIllustration />
            </div>

            <div className="welcome-form-card">
              <div className="form-icon">🌷</div>
              <p className="form-overline">SIAP UNTUK BELAJAR?</p>
              <h2>Selamat Datang!</h2>
              <p className="form-description">
                Kenalan dulu, yuk! Isi identitasmu sebelum memulai
                pembelajaran.
              </p>

              <form onSubmit={mulaiBelajar}>
                <div className="form-group">
                  <label htmlFor="namaSiswa">Nama Lengkap</label>
                  <input
                    id="namaSiswa"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={namaSiswa}
                    onChange={(e) => setNamaSiswa(e.target.value)}
                    maxLength={40}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="kelasSiswa">Kelas</label>
                  <input
                    id="kelasSiswa"
                    type="text"
                    placeholder="Contoh: VII A"
                    value={kelasSiswa}
                    onChange={(e) => setKelasSiswa(e.target.value)}
                    maxLength={20}
                    required
                  />
                </div>

                <button type="submit" className="primary-button full-button">
                  Mulai Belajar <span>→</span>
                </button>
              </form>

              <div className="welcome-note">
                💜 Selamat belajar dan semangat!
              </div>
            </div>
          </section>
        )}

        {halaman === 'dashboard' && (
          <section className="dashboard-section">
            <div className="dashboard-welcome">
              <div className="dashboard-welcome-text">
                <p className="section-label">MEDIA PEMBELAJARAN MATEMATIKA</p>
                <h1>Halo, {namaSiswa}!</h1>
                <p className="dashboard-class">Kelas {kelasSiswa}</p>
                <p>
                  Selamat datang di pembelajaran materi diskon. Yuk, mulai
                  belajar dan tingkatkan pemahamanmu!
                </p>
              </div>
              <LearningIllustration />
            </div>

            <div className="menu-heading">
              <div>
                <p className="section-label">MULAI PETUALANGANMU</p>
                <h2>Menu Pembelajaran</h2>
              </div>
              <span>🌟</span>
            </div>

            <div className="menu-grid">
              <button className="menu-card menu-purple" onClick={() => setHalaman('materi')}>
                <span className="menu-icon">📖</span>
                <h3>Materi</h3>
                <p>Pelajari pengertian dan rumus diskon.</p>
                <span className="menu-arrow">Pelajari →</span>
              </button>

              <button className="menu-card menu-yellow" onClick={() => setHalaman('pretest')}>
                <span className="menu-icon">📝</span>
                <h3>Pretest</h3>
                <p>Ukur pemahaman awalmu tentang diskon.</p>
                <span className="menu-arrow">Mulai →</span>
              </button>

              <button className="menu-card menu-pink" onClick={() => setHalaman('latihan')}>
                <span className="menu-icon">✏️</span>
                <h3>Latihan</h3>
                <p>Asah kemampuanmu dengan soal latihan.</p>
                <span className="menu-arrow">Berlatih →</span>
              </button>

              <button className="menu-card menu-green" onClick={() => setHalaman('posttest')}>
                <span className="menu-icon">🏆</span>
                <h3>Posttest</h3>
                <p>Uji kembali pemahamanmu setelah belajar.</p>
                <span className="menu-arrow">Mulai →</span>
              </button>

              <button className="menu-card menu-purple" onClick={() => setHalaman('evaluasi')}>
                <span className="menu-icon">📊</span>
                <h3>Evaluasi</h3>
                <p>Lihat rekap nilai dan perkembangan belajarmu.</p>
                <span className="menu-arrow">Lihat Evaluasi →</span>
              </button>
            </div>
          </section>
        )}

        {halaman === 'materi' && (
          <section className="material-section">
            <button className="back-button" onClick={() => setHalaman('dashboard')}>
              ← Kembali ke Menu
            </button>

            <p className="section-label">MATERI PEMBELAJARAN</p>
            <h1>Mengenal Diskon 📚</h1>

            <div className="material-card">
              <h2>1. Pengertian Diskon</h2>
              <p>
                Diskon adalah potongan harga yang diberikan penjual kepada
                pembeli sehingga harga barang menjadi lebih murah dari harga
                awalnya.
              </p>
            </div>

            <div className="material-card">
              <h2>2. Rumus Menghitung Diskon</h2>
              <p>Untuk menghitung diskon, gunakan rumus berikut:</p>
              <div className="formula-box">
                Besar Diskon = Harga Awal × Persentase Diskon
              </div>
              <div className="formula-box">
                Harga Setelah Diskon = Harga Awal − Besar Diskon
              </div>
              <p>
                Ingat, persentase diskon harus diubah menjadi bentuk desimal
                atau dibagi 100 sebelum dikalikan dengan harga awal.
              </p>
            </div>

            <div className="material-card">
              <h2>3. Contoh Soal</h2>
              <p>
                Sebuah baju memiliki harga awal Rp100.000 dan mendapatkan
                diskon sebesar 20%. Berapakah harga yang harus dibayar?
              </p>

              <p><strong>Diketahui:</strong></p>
              <ul>
                <li>Harga awal = Rp100.000</li>
                <li>Diskon = 20%</li>
              </ul>

              <p><strong>Penyelesaian:</strong></p>
              <p>Diskon = 20% × Rp100.000</p>
              <p>Diskon = Rp20.000</p>
              <p>Harga akhir = Rp100.000 − Rp20.000</p>
              <p><strong>Harga akhir = Rp80.000</strong></p>
            </div>

            <div className="material-card">
              <h2>4. Kesimpulan</h2>
              <p>
                Untuk menentukan harga setelah diskon, kita harus menghitung
                terlebih dahulu besar potongan harga, kemudian mengurangkannya
                dari harga awal.
              </p>
            </div>

            <button className="primary-button" onClick={() => setHalaman('pretest')}>
              Mulai Pretest →
            </button>
          </section>
        )}

        {halaman === 'pretest' && (
          <QuestionScreen
            judul="Pretest"
            deskripsi="Kerjakan soal berikut untuk mengetahui pemahaman awalmu."
            daftarSoal={soal}
            jawaban={jawaban}
            setJawaban={setJawaban}
            hasil={hasil}
            selesai={(nilai) => setHasil(nilai)}
            kembali={() => setHalaman('dashboard')}
          />
        )}

        {halaman === 'latihan' && (
          <QuestionScreen
            judul="Latihan"
            deskripsi="Yuk, berlatih menghitung diskon!"
            daftarSoal={soalLatihan}
            jawaban={jawabanLatihan}
            setJawaban={setJawabanLatihan}
            hasil={nilaiLatihan}
            selesai={(nilai) => setNilaiLatihan(nilai)}
            kembali={() => setHalaman('dashboard')}
          />
        )}

        {halaman === 'posttest' && (
          <QuestionScreen
            judul="Posttest"
            deskripsi="Uji pemahamanmu setelah mempelajari materi diskon."
            daftarSoal={soalPosttest}
            jawaban={jawabanPosttest}
            setJawaban={setJawabanPosttest}
            hasil={nilaiPosttest}
            selesai={simpanHasil}
            kembali={() => setHalaman('dashboard')}
          />
        )}

        {halaman === 'evaluasi' && (
          <section className="result-section">
            <div className="result-card">
              <button
                className="back-button"
                onClick={() => setHalaman('dashboard')}
              >
                ← Kembali ke Menu
              </button>

              <div className="result-icon">📊</div>
              <p className="section-label">EVALUASI PEMBELAJARAN</p>
              <h1>Hasil Belajarmu</h1>
              <p>
                Berikut adalah ringkasan hasil belajar {namaSiswa} pada materi
                diskon.
              </p>

              <div className="result-summary">
                <div>
                  <span>Nama Siswa</span>
                  <strong>{namaSiswa}</strong>
                </div>
                <div>
                  <span>Kelas</span>
                  <strong>{kelasSiswa}</strong>
                </div>
                <div>
                  <span>Nilai Pretest</span>
                  <strong>{hasil ?? 'Belum dikerjakan'}</strong>
                </div>
                <div>
                  <span>Nilai Latihan</span>
                  <strong>{nilaiLatihan ?? 'Belum dikerjakan'}</strong>
                </div>
                <div>
                  <span>Nilai Posttest</span>
                  <strong>{nilaiPosttest ?? 'Belum dikerjakan'}</strong>
                </div>
                <div>
                  <span>Rata-rata Nilai</span>
                  <strong>{rataRata ?? 'Belum tersedia'}</strong>
                </div>
              </div>

              <div className="material-card">
                <h2>Perkembangan Nilai</h2>

                {selisihNilai !== null ? (
                  <>
                    <p>
                      Nilai Pretest: <strong>{hasil}</strong>
                    </p>
                    <p>
                      Nilai Posttest: <strong>{nilaiPosttest}</strong>
                    </p>
                    <p>
                      Selisih nilai:{' '}
                      <strong>
                        {selisihNilai > 0 ? '+' : ''}
                        {selisihNilai} poin
                      </strong>
                    </p>
                  </>
                ) : (
                  <p>
                    Perbandingan nilai akan muncul setelah Pretest dan
                    Posttest selesai dikerjakan.
                  </p>
                )}

                <p>{kesimpulanEvaluasi()}</p>
              </div>

              <div className="material-card">
                <h2>Refleksi Pembelajaran ✨</h2>
                <p>
                  Ceritakan pengalamanmu setelah mempelajari materi diskon.
                </p>

                <label htmlFor="refleksiSiswa">
                  Apa hal baru yang kamu pahami setelah belajar diskon?
                </label>
                <textarea
                  id="refleksiSiswa"
                  value={refleksi}
                  onChange={(e) => setRefleksi(e.target.value)}
                  placeholder="Tuliskan refleksimu di sini..."
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginTop: '10px',
                    borderRadius: '12px',
                    border: '1px solid #d8d2e8',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
                <p>
                  Refleksi ini dapat kamu gunakan untuk mengingat kembali
                  pengalaman belajarmu.
                </p>
              </div>

              <button
                className="primary-button full-button"
                onClick={() => setHalaman('dashboard')}
              >
                Kembali ke Menu Pembelajaran
              </button>
            </div>
          </section>
        )}

        {halaman === 'hasil' && (
          <section className="result-section">
            <div className="result-card">
              <div className="result-icon">🎉</div>
              <p className="section-label">HASIL PEMBELAJARAN</p>
              <h1>Pembelajaran Selesai!</h1>
              <p>
                Hebat, {namaSiswa}! Kamu sudah menyelesaikan rangkaian
                pembelajaran materi diskon.
              </p>

              <div className="result-summary">
                <div>
                  <span>Nama</span>
                  <strong>{namaSiswa}</strong>
                </div>
                <div>
                  <span>Kelas</span>
                  <strong>{kelasSiswa}</strong>
                </div>
                <div>
                  <span>Nilai Pretest</span>
                  <strong>{hasil ?? '-'}</strong>
                </div>
                <div>
                  <span>Nilai Latihan</span>
                  <strong>{nilaiLatihan ?? '-'}</strong>
                </div>
                <div>
                  <span>Nilai Posttest</span>
                  <strong>{nilaiPosttest ?? '-'}</strong>
                </div>
              </div>

              {sedangMenyimpan && <p>Menyimpan hasil belajar...</p>}
              {statusSimpan && <p>{statusSimpan}</p>}
              {sudahDisimpan && <p>Data nilai berhasil disimpan.</p>}

              <button
                className="primary-button full-button"
                onClick={() => setHalaman('evaluasi')}
              >
                Lihat Evaluasi Pembelajaran →
              </button>
            </div>
          </section>
        )}
      </main>

      <footer className="main-footer">
        <p>Belajar Matematika dengan Menyenangkan 💜</p>
        <small>Media Pembelajaran Matematika · Materi Diskon</small>
      </footer>
    </div>
  )
}

export default App
