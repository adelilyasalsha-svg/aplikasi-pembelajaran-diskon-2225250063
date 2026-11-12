
import { useState, useRef, useEffect } from 'react'
import { supabase } from './supabase'
import './App.css'



const soal = [
  {
    pertanyaan: 'Apa yang dimaksud dengan diskon?',
    ilustrasi: '🏷️',
    pilihan: [
      'Kenaikan harga barang',
      'Potongan harga barang',
      'Pajak barang',
      'Harga asli barang'
    ],
    jawaban: 1,
    pembahasan: 'Diskon adalah potongan harga yang diberikan penjual kepada pembeli sehingga harga yang dibayar menjadi lebih rendah dari harga awal.'
  },
  {
    pertanyaan: 'Sebuah tas seharga Rp100.000 mendapat diskon 20%. Berapa besar potongan harganya?',
    ilustrasi: '👜',
    pilihan: ['Rp10.000', 'Rp20.000', 'Rp30.000', 'Rp40.000'],
    jawaban: 1,
    pembahasan: 'Potongan = 20/100 × Rp100.000 = Rp20.000. Jadi, besar potongan harganya adalah Rp20.000.'
  },
  {
    pertanyaan: 'Harga sebuah baju Rp80.000 mendapat diskon 25%. Berapa harga setelah diskon?',
    ilustrasi: '👕',
    pilihan: ['Rp50.000', 'Rp55.000', 'Rp60.000', 'Rp65.000'],
    jawaban: 2,
    pembahasan: 'Potongan = 25/100 × Rp80.000 = Rp20.000. Harga akhir = Rp80.000 − Rp20.000 = Rp60.000.'
  },
  {
    pertanyaan: 'Sebuah sepatu memiliki harga awal Rp200.000 dan harga setelah diskon Rp180.000. Berapa potongan harganya?',
    ilustrasi: '👟',
    pilihan: ['Rp10.000', 'Rp20.000', 'Rp30.000', 'Rp40.000'],
    jawaban: 1,
    pembahasan: 'Potongan = harga awal − harga akhir = Rp200.000 − Rp180.000 = Rp20.000.'
  },
  {
    pertanyaan: 'Jika harga awal barang Rp100.000 dan potongannya Rp10.000, berapa persentase diskonnya?',
    ilustrasi: '🧮',
    pilihan: ['5%', '10%', '15%', '20%'],
    jawaban: 1,
    pembahasan: 'Persentase diskon = (potongan / harga awal) × 100% = (Rp10.000 / Rp100.000) × 100% = 10%.'
  }
]

const soalLatihan = [
  {
    pertanyaan: 'Sebuah jaket memiliki harga awal Rp240.000 dan harga setelah diskon Rp180.000. Berapa persentase diskonnya?',
    ilustrasi: '🧥',
    pilihan: ['20%', '25%', '30%', '35%'],
    jawaban: 1,
    pembahasan: 'Potongan = Rp240.000 − Rp180.000 = Rp60.000. Persentase diskon = (Rp60.000 / Rp240.000) × 100% = 25%.'
  },
  {
    pertanyaan: 'Sebuah sepatu dijual dengan harga Rp160.000 setelah mendapat diskon 20%. Berapa harga awal sepatu tersebut?',
    ilustrasi: '👟',
    pilihan: ['Rp180.000', 'Rp190.000', 'Rp200.000', 'Rp220.000'],
    jawaban: 2,
    pembahasan: 'Harga awal = harga akhir / (1 − diskon/100) = Rp160.000 / (1 − 20/100) = Rp160.000 / 0,8 = Rp200.000.'
  },
  {
    pertanyaan: 'Sebuah tas seharga Rp300.000 mendapat diskon 15%. Berapa besar potongan harganya?',
    ilustrasi: '👜',
    pilihan: ['Rp30.000', 'Rp35.000', 'Rp45.000', 'Rp50.000'],
    jawaban: 2,
    pembahasan: 'Potongan = 15/100 × Rp300.000 = Rp45.000.'
  },
  {
    pertanyaan: 'Harga sebuah buku setelah diskon 10% adalah Rp90.000. Berapa harga awal buku tersebut?',
    ilustrasi: '📚',
    pilihan: ['Rp95.000', 'Rp100.000', 'Rp105.000', 'Rp110.000'],
    jawaban: 1,
    pembahasan: 'Harga awal = Rp90.000 / (1 − 10/100) = Rp90.000 / 0,9 = Rp100.000.'
  },
  {
    pertanyaan: 'Sebuah jam memiliki harga awal Rp400.000 dan mendapat diskon 25%. Berapa harga yang harus dibayar?',
    ilustrasi: '⌚',
    pilihan: ['Rp250.000', 'Rp280.000', 'Rp300.000', 'Rp350.000'],
    jawaban: 2,
    pembahasan: 'Potongan = 25/100 × Rp400.000 = Rp100.000. Harga akhir = Rp400.000 − Rp100.000 = Rp300.000.'
  }
]

const soalPosttest = [
  {
    pertanyaan: 'Sebuah toko memberikan diskon 20% untuk sebuah sepatu. Jika harga setelah diskon adalah Rp240.000, berapa harga awal sepatu tersebut?',
    ilustrasi: '👟',
    pilihan: ['Rp280.000', 'Rp290.000', 'Rp300.000', 'Rp320.000'],
    jawaban: 2,
    pembahasan: 'Harga awal = harga akhir / (1 − diskon/100) = Rp240.000 / 0,8 = Rp300.000.'
  },
  {
    pertanyaan: 'Sebuah tas memiliki harga awal Rp250.000. Setelah diskon, tas tersebut dijual seharga Rp200.000. Berapa persentase diskonnya?',
    ilustrasi: '👜',
    pilihan: ['15%', '20%', '25%', '30%'],
    jawaban: 1,
    pembahasan: 'Potongan = Rp250.000 − Rp200.000 = Rp50.000. Persentase diskon = (Rp50.000 / Rp250.000) × 100% = 20%.'
  },
  {
    pertanyaan: 'Sebuah toko memberikan diskon bertingkat 20% kemudian 10% untuk sebuah barang seharga Rp500.000. Berapa harga akhir barang tersebut?',
    ilustrasi: '🛍️',
    pilihan: ['Rp350.000', 'Rp360.000', 'Rp370.000', 'Rp400.000'],
    jawaban: 1,
    pembahasan: 'Diskon pertama = 20% × Rp500.000 = Rp100.000. Harga setelah diskon pertama = Rp400.000. Diskon kedua = 10% × Rp400.000 = Rp40.000. Harga akhir = Rp400.000 − Rp40.000 = Rp360.000.'
  },
  {
    pertanyaan: 'Sebuah barang seharga Rp400.000 mendapat diskon 15%. Berapa harga akhir barang tersebut?',
    ilustrasi: '🏷️',
    pilihan: ['Rp320.000', 'Rp330.000', 'Rp340.000', 'Rp350.000'],
    jawaban: 2,
    pembahasan: 'Potongan = 15/100 × Rp400.000 = Rp60.000. Harga akhir = Rp400.000 − Rp60.000 = Rp340.000.'
  },
  {
    pertanyaan: 'Sebuah baju dijual seharga Rp180.000 setelah mendapat diskon 10%. Berapa besar potongan harga yang diberikan?',
    ilustrasi: '👕',
    pilihan: ['Rp10.000', 'Rp15.000', 'Rp20.000', 'Rp25.000'],
    jawaban: 2,
    pembahasan: 'Harga awal = Rp180.000 / 0,9 = Rp200.000. Potongan = Rp200.000 − Rp180.000 = Rp20.000.'
  }
]



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

  const jumlahBenar = daftarSoal.filter(
    (item, index) => jawaban[index] === item.jawaban
  ).length

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
            Jawaban benar: {jumlahBenar} dari {daftarSoal.length} soal.
          </p>

          <div className="review-list">
            <h2>Pembahasan Semua Soal</h2>

            {daftarSoal.map((item, index) => {
              const benar = jawaban[index] === item.jawaban

              return (
                <div className="material-card" key={index}>
                  <h3>Soal {index + 1}</h3>

                  <div className="question-illustration">
                    <span>{item.ilustrasi || '🏷️'}</span>
                  </div>

                  <p><strong>{item.pertanyaan}</strong></p>

                  <p className={benar ? 'feedback-correct' : 'feedback-wrong'}>
                    {benar ? '✓ Jawaban kamu benar' : '✗ Jawaban kamu belum tepat'}
                  </p>

                  <p>
                    Jawaban kamu: {jawaban[index] !== undefined
                      ? item.pilihan[jawaban[index]]
                      : 'Belum dijawab'}
                  </p>

                  <p>
                    Jawaban yang benar: <strong>{item.pilihan[item.jawaban]}</strong>
                  </p>

                  <div className="explanation-area">
                    <div className="explanation-heading">
                      <span>💡</span>
                      <h4>Pembahasan</h4>
                    </div>
                    <p>{item.pembahasan}</p>
                  </div>
                </div>
              )
            })}
          </div>

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

        <div className="question-illustration">
          <span>{soalAktif.ilustrasi || '🏷️'}</span>
          <small>Ilustrasi Soal {nomor + 1}</small>
        </div>

        <h3 className="question-title">
          {soalAktif.pertanyaan}
        </h3>

        <div className="answer-list">
          {soalAktif.pilihan.map((pilihan, index) => {
            const dipilih = jawaban[nomor] === index
            const sudahAdaJawaban = sudahMenjawab
            const jawabanBenar = index === soalAktif.jawaban

            let kelas = 'answer-option'

            if (sudahAdaJawaban && jawabanBenar) {
              kelas += ' correct-answer'
            } else if (sudahAdaJawaban && dipilih && !jawabanBenar) {
              kelas += ' wrong-answer'
            } else if (dipilih) {
              kelas += ' selected'
            }

            return (
              <button
                key={index}
                className={kelas}
                onClick={() => pilihJawaban(index)}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                {pilihan}
              </button>
            )
          })}
        </div>

        {sudahMenjawab && (
          <div className={`answer-feedback ${
            jawaban[nomor] === soalAktif.jawaban
              ? 'feedback-correct'
              : 'feedback-wrong'
          }`}>
            <h3>
              {jawaban[nomor] === soalAktif.jawaban
                ? '✓ Jawaban kamu benar!'
                : '✗ Jawaban kamu belum tepat.'}
            </h3>

            {jawaban[nomor] !== soalAktif.jawaban && (
              <p>
                Jawaban yang benar adalah:{' '}
                <strong>{soalAktif.pilihan[soalAktif.jawaban]}</strong>
              </p>
            )}

            <div className="explanation-area">
              <div className="explanation-heading">
                <span>💡</span>
                <h4>Pembahasan</h4>
              </div>
              <p>{soalAktif.pembahasan}</p>
            </div>
          </div>
        )}

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

function MusikBelajar({ hentikanMusik = false }) {
  const audioRef = useRef(null)
  const [musikAktif, setMusikAktif] = useState(false)

  useEffect(() => {
    if (hentikanMusik && audioRef.current) {
      audioRef.current.pause()
      setMusikAktif(false)
    }
  }, [hentikanMusik])

  const toggleMusik = async () => {
    if (!audioRef.current) return

    if (musikAktif) {
      audioRef.current.pause()
      setMusikAktif(false)
    } else {
      if (hentikanMusik) return

      try {
        await audioRef.current.play()
        setMusikAktif(true)
      } catch (error) {
        console.error('Musik belum bisa diputar:', error)
      }
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/musik-belajar.mp3"
        loop
        onEnded={() => setMusikAktif(false)}
      />

      <button
        onClick={toggleMusik}
        className="tombol-musik"
        type="button"
        disabled={hentikanMusik}
      >
        {hentikanMusik
          ? '🔇 Musik dijeda'
          : musikAktif
            ? '🔊 Musik ON'
            : '🎵 Musik OFF'}
      </button>
    </>
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
  
const [diketahui, setDiketahui] = useState('')
const [ditanya, setDitanya] = useState('')
const [hargaAwal, setHargaAwal] = useState('')
const [persentaseDiskon, setPersentaseDiskon] = useState('')
const [jenisPerhitungan, setJenisPerhitungan] = useState('hargaAkhir')
const [hasilKalkulator, setHasilKalkulator] = useState(null)
const [hargaSetelahDiskon, setHargaSetelahDiskon] = useState('')
const [hargaAkhirInput, setHargaAkhirInput] = useState('')


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
  <MusikBelajar
    hentikanMusik={['pretest', 'latihan', 'posttest'].includes(halaman)}
  />
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

      <div className="welcome-students">
        <img
          src="/anak-smp.png"
          alt="Ilustrasi siswa SMP sedang belajar"
        />
        <div className="students-caption">
          💜 Belajar Matematika Jadi Menyenangkan!
        </div>
      </div>
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

      {/* MENU KALKULATOR DISKON */}
      <button className="menu-card menu-pink" onClick={() => setHalaman('kalkulator')}>
        <span className="menu-icon">🧮</span>
        <h3>Kalkulator Diskon</h3>
        <p>Pelajari dan praktikkan langkah menghitung diskon.</p>
        <span className="menu-arrow">Coba Sekarang →</span>
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

    <div className="material-content">
      <p className="section-label">MATERI PEMBELAJARAN</p>
      <h1>Mengenal Diskon 📚</h1>
      <p className="material-intro">
        Yuk, belajar memahami diskon dan cara menghitungnya
        melalui contoh dalam kehidupan sehari-hari!
      </p>

      {/* MATERI 1 */}
      <div className="material-card">
        <div className="material-heading">
          <span className="material-icon">🛍️ 🏷️</span>
          <h2>1. Pengertian Diskon</h2>
        </div>
        <p>
          Diskon adalah potongan harga yang diberikan penjual
          kepada pembeli sehingga harga barang menjadi lebih
          murah dari harga awalnya.
        </p>
        <p>
          Diskon biasanya diberikan untuk menarik minat pembeli,
          meningkatkan penjualan, dan menghabiskan persediaan barang.
        </p>
        <p><strong>Contoh:</strong></p>
        <p>
          Sebuah toko memberikan diskon 20% untuk sebuah tas.
          Artinya, pembeli mendapatkan potongan sebesar 20%
          dari harga awal tas tersebut.
        </p>
      </div>

      {/* MATERI 2 */}
      <div className="material-card">
        <div className="material-heading">
          <span className="material-icon">🎯</span>
          <h2>2. Tujuan dan Manfaat Diskon</h2>
        </div>
        <p>Diskon memiliki beberapa tujuan dan manfaat, yaitu:</p>
        <ul>
          <li>Menarik perhatian calon pembeli.</li>
          <li>Meningkatkan jumlah penjualan.</li>
          <li>Memberikan kesempatan membeli barang dengan harga lebih murah.</li>
          <li>Membantu penjual menghabiskan stok barang.</li>
          <li>Meningkatkan minat konsumen untuk berbelanja.</li>
        </ul>
      </div>

      {/* MATERI 3 */}
      <div className="material-card">
        <div className="material-heading">
          <span className="material-icon">📊</span>
          <h2>3. Bentuk dan Jenis Diskon</h2>
        </div>

        <h3>a. Diskon Persentase</h3>
        <p>
          Potongan harga yang dinyatakan dalam bentuk persen (%).
          Contohnya diskon 10%, 20%, atau 50%.
        </p>

        <h3>b. Diskon Potongan Langsung</h3>
        <p>
          Potongan harga yang diberikan dalam jumlah nominal tertentu.
          Contohnya potongan harga Rp20.000.
        </p>

        <h3>c. Diskon Bertingkat</h3>
        <p>
          Diskon yang diberikan lebih dari satu kali secara berurutan.
          Misalnya diskon 20% kemudian diskon tambahan 10%.
        </p>
      </div>

      {/* MATERI 4 */}
      <div className="material-card">
        <div className="material-heading">
          <span className="material-icon">🧮</span>
          <h2>4. Rumus Menghitung Diskon</h2>
        </div>

        <p>
          Dalam soal diskon, informasi yang diketahui dan yang
          ditanyakan bisa berbeda-beda. Oleh karena itu, kita perlu
          memilih rumus yang sesuai dengan permasalahan.
        </p>

        <h3>a. Mencari Harga Akhir</h3>
        <p>
          Jika diketahui harga awal dan persentase diskon,
          sedangkan yang ditanyakan adalah harga akhir.
        </p>
        <div className="formula-box">
          Potongan = (Diskon / 100) × Harga Awal
        </div>
        <div className="formula-box">
          Harga Akhir = Harga Awal − Potongan
        </div>

        <p><strong>Contoh:</strong> Harga awal Rp100.000 dengan diskon 20%.</p>
        <p>Potongan = (20 / 100) × Rp100.000</p>
        <p>Potongan = Rp20.000</p>
        <p>Harga akhir = Rp100.000 − Rp20.000</p>
        <div className="formula-box">
          Harga akhir = Rp80.000
        </div>

        <h3>b. Mencari Persentase Diskon</h3>
        <p>
          Jika diketahui harga awal dan harga akhir,
          sedangkan yang ditanyakan adalah persentase diskon.
        </p>
        <div className="formula-box">
          Potongan = Harga Awal − Harga Akhir
        </div>
        <div className="formula-box">
          Diskon = (Potongan / Harga Awal) × 100%
        </div>

        <p><strong>Contoh:</strong> Harga awal Rp100.000 dan harga akhir Rp80.000.</p>
        <p>Potongan = Rp100.000 − Rp80.000</p>
        <p>Potongan = Rp20.000</p>
        <p>Diskon = (Rp20.000 / Rp100.000) × 100%</p>
        <div className="formula-box">
          Diskon = 20%
        </div>

        <h3>c. Mencari Harga Awal</h3>
        <p>
          Jika diketahui harga akhir dan persentase diskon,
          sedangkan yang ditanyakan adalah harga awal.
        </p>
        <div className="formula-box">
          Harga Awal = Harga Akhir / (1 − Diskon / 100)
        </div>

        <p><strong>Contoh:</strong> Harga akhir Rp80.000 dengan diskon 20%.</p>
        <p>Harga awal = Rp80.000 / (1 − 20 / 100)</p>
        <p>Harga awal = Rp80.000 / 0,8</p>
        <div className="formula-box">
          Harga awal = Rp100.000
        </div>

        <h3>d. Mencari Besar Potongan Harga</h3>
        <p>
          Jika diketahui harga awal dan persentase diskon,
          sedangkan yang ditanyakan hanya besar potongannya.
        </p>
        <div className="formula-box">
          Potongan = (Diskon / 100) × Harga Awal
        </div>

        <p><strong>Contoh:</strong> Harga awal Rp100.000 dengan diskon 20%.</p>
        <p>Potongan = (20 / 100) × Rp100.000</p>
        <div className="formula-box">
          Potongan harga = Rp20.000
        </div>

        <p>
          <strong>Kesimpulan:</strong> Perhatikan informasi yang
          diketahui dan apa yang ditanyakan sebelum menentukan
          rumus yang akan digunakan.
        </p>
      </div>

      {/* MATERI 5 */}
      <div className="material-card">
        <div className="material-heading">
          <span className="material-icon">📝</span>
          <h2>5. Langkah-Langkah Menyelesaikan Soal Diskon</h2>
        </div>

        <p>
          Untuk menyelesaikan soal diskon, lakukan beberapa
          tahapan berikut agar mendapatkan jawaban yang tepat.
        </p>

        <h3>Langkah 1: Baca dan Pahami Soal</h3>
        <p>
          Bacalah soal dengan teliti untuk mengetahui informasi
          yang diberikan dan apa yang harus dicari.
        </p>

        <h3>Langkah 2: Tuliskan yang Diketahui</h3>
        <p>
          Catat informasi penting seperti harga awal barang,
          harga akhir, dan persentase diskon.
        </p>

        <h3>Langkah 3: Tentukan yang Ditanyakan</h3>
        <p>
          Perhatikan apakah soal meminta besar potongan harga,
          persentase diskon, harga awal, atau harga akhir.
        </p>

        <h3>Langkah 4: Tentukan Rumus</h3>
        <p>
          Pilih rumus yang sesuai dengan informasi dan pertanyaan
          dalam soal.
        </p>

        <h3>Langkah 5: Lakukan Perhitungan</h3>
        <p>
          Masukkan nilai yang diketahui ke dalam rumus,
          kemudian hitung secara berurutan.
        </p>

        <h3>Langkah 6: Tuliskan Kesimpulan</h3>
        <p>
          Tuliskan hasil akhir sesuai dengan pertanyaan
          yang terdapat dalam soal.
        </p>

        <div className="formula-box">
          Periksa kembali hasil perhitungan sebelum menentukan jawaban akhir.
        </div>
      </div>

      {/* MATERI 6 */}
      <div className="material-card">
        <div className="material-heading">
          <span className="material-icon">👕</span>
          <h2>6. Contoh Perhitungan Diskon</h2>
        </div>
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
        <p>Diskon = 20/100 × Rp100.000</p>
        <p>Diskon = Rp20.000</p>
        <p>Harga akhir = Rp100.000 − Rp20.000</p>

        <div className="formula-box">
          Harga akhir = Rp80.000
        </div>
      </div>

      {/* MATERI 7 */}
      <div className="material-card">
        <div className="material-heading">
          <span className="material-icon">👟 👜 📚</span>
          <h2>7. Penerapan Diskon dalam Kehidupan Sehari-hari</h2>
        </div>
        <p>
          Diskon sering ditemukan ketika kita berbelanja di toko,
          supermarket, pusat perbelanjaan, maupun toko online.
        </p>

        <h3>Contoh 1: Membeli Sepatu</h3>
        <p>Harga sepatu Rp200.000 dengan diskon 10%.</p>
        <p>Diskon = 10% × Rp200.000 = Rp20.000</p>
        <p><strong>Harga bayar = Rp180.000</strong></p>

        <h3>Contoh 2: Membeli Tas</h3>
        <p>Harga tas Rp150.000 dengan diskon 20%.</p>
        <p>Diskon = 20% × Rp150.000 = Rp30.000</p>
        <p><strong>Harga bayar = Rp120.000</strong></p>
      </div>

      {/* MATERI 8 */}
      <div className="material-card">
        <div className="material-heading">
          <span className="material-icon">🏷️ 🏷️</span>
          <h2>8. Memahami Diskon Bertingkat</h2>
        </div>
        <p>
          Diskon bertingkat adalah pemberian potongan harga
          secara berurutan. Setiap diskon berikutnya dihitung
          dari harga setelah diskon sebelumnya.
        </p>

        <p><strong>Contoh soal:</strong></p>
        <p>
          Sebuah barang seharga Rp200.000 mendapat diskon 20%
          kemudian diskon tambahan 10%. Berapa harga akhirnya?
        </p>

        <p><strong>Penyelesaian:</strong></p>
        <p>Diskon pertama = 20% × Rp200.000 = Rp40.000</p>
        <p>Harga setelah diskon pertama = Rp160.000</p>
        <p>Diskon kedua = 10% × Rp160.000 = Rp16.000</p>
        <p>Harga akhir = Rp160.000 − Rp16.000</p>

        <div className="formula-box">
          Harga akhir = Rp144.000
        </div>

        <p>
          Jadi, harga barang setelah mendapatkan dua kali
          diskon adalah Rp144.000.
        </p>
      </div>

      {/* MATERI 9 */}
      <div className="material-card">
        <div className="material-heading">
          <span className="material-icon">⭐ 📖</span>
          <h2>9. Rangkuman Materi</h2>
        </div>
        <ul>
          <li>Diskon merupakan potongan harga dari harga awal.</li>
          <li>Diskon dapat dinyatakan dalam bentuk persen atau nominal.</li>
          <li>Besar potongan dihitung dari harga awal dikalikan persentase diskon.</li>
          <li>Harga akhir diperoleh dengan mengurangi harga awal dengan potongan.</li>
          <li>Persentase diskon dapat dicari dari potongan dibagi harga awal.</li>
          <li>Harga awal dapat dicari jika harga akhir dan persentase diskon diketahui.</li>
          <li>Diskon bertingkat dihitung secara berurutan.</li>
        </ul>

        <div className="formula-box">
          Harga Akhir = Harga Awal − Besar Diskon
        </div>

        <p>
          Setelah mempelajari materi ini, kamu diharapkan mampu
          memahami konsep diskon dan menyelesaikan permasalahan
          diskon dalam kehidupan sehari-hari.
        </p>
      </div>
    </div>

    <button className="primary-button" onClick={() => setHalaman('pretest')}>
      Mulai Pretest →
    </button>
  </section>
)}

{halaman === 'kalkulator' && (
  <section className="material-section">
    <button
      className="back-button"
      onClick={() => setHalaman('dashboard')}
    >
      ← Kembali ke Menu
    </button>

    <div className="material-content">
      <p className="section-label">PRAKTIK MATEMATIKA</p>
      <h1>Kalkulator Diskon 🧮</h1>
      <p className="material-intro">
        Pilih informasi yang diketahui dalam soal, kemudian
        pelajari langkah untuk menemukan jawabannya.
      </p>

      <div className="material-card">
        <h2>1. Pilih Kondisi Soal 📝</h2>

        <label>Informasi apa yang diketahui?</label>
        <select
          value={jenisPerhitungan}
          onChange={(e) => {
            setJenisPerhitungan(e.target.value)
            setHasilKalkulator(null)
          }}
        >
          <option value="hargaAkhir">
            Harga awal dan diskon diketahui
          </option>
          <option value="besarDiskon">
            Harga awal dan harga akhir diketahui
          </option>
          <option value="hargaAwal">
            Harga akhir dan diskon diketahui
          </option>
          <option value="potongan">
            Harga awal dan diskon diketahui, mencari potongan
          </option>
        </select>
      </div>

      <div className="material-card">
        <h2>2. Masukkan Informasi Angka 🔢</h2>

        {(jenisPerhitungan === 'hargaAkhir' ||
          jenisPerhitungan === 'besarDiskon' ||
          jenisPerhitungan === 'potongan') && (
          <>
            <label>Harga awal barang (Rp)</label>
            <input
              type="number"
              min="0"
              value={hargaAwal}
              onChange={(e) => setHargaAwal(e.target.value)}
              placeholder="Contoh: 100000"
            />
          </>
        )}

        {(jenisPerhitungan === 'hargaAkhir' ||
          jenisPerhitungan === 'hargaAwal' ||
          jenisPerhitungan === 'potongan') && (
          <>
            <label>Persentase diskon (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={persentaseDiskon}
              onChange={(e) => setPersentaseDiskon(e.target.value)}
              placeholder="Contoh: 20"
            />
          </>
        )}

        {(jenisPerhitungan === 'besarDiskon' ||
          jenisPerhitungan === 'hargaAwal') && (
          <>
            <label>Harga akhir barang (Rp)</label>
            <input
              type="number"
              min="0"
              value={hargaAkhirInput}
              onChange={(e) => setHargaAkhirInput(e.target.value)}
              placeholder="Contoh: 80000"
            />
          </>
        )}
      </div>

      <button
        className="primary-button"
        onClick={() => {
          const awal = Number(hargaAwal)
          const akhir = Number(hargaAkhirInput)
          const diskon = Number(persentaseDiskon)

          if (jenisPerhitungan === 'hargaAkhir') {
            if (
              hargaAwal === '' ||
              persentaseDiskon === '' ||
              awal <= 0 ||
              diskon < 0 ||
              diskon > 100
            ) {
              alert('Periksa kembali harga awal dan persentase diskon.')
              return
            }

            const potongan = awal * diskon / 100

            setHasilKalkulator({
              jenis: 'hargaAkhir',
              awal,
              diskon,
              potongan,
              akhir: awal - potongan
            })
          }

          if (jenisPerhitungan === 'besarDiskon') {
            if (
              hargaAwal === '' ||
              hargaAkhirInput === '' ||
              awal <= 0 ||
              akhir < 0 ||
              akhir > awal
            ) {
              alert('Harga akhir harus antara nol dan harga awal.')
              return
            }

            const potongan = awal - akhir
            const persen = potongan / awal * 100

            setHasilKalkulator({
              jenis: 'besarDiskon',
              awal,
              akhir,
              potongan,
              persen
            })
          }

          if (jenisPerhitungan === 'hargaAwal') {
            if (
              hargaAkhirInput === '' ||
              persentaseDiskon === '' ||
              akhir <= 0 ||
              diskon < 0 ||
              diskon >= 100
            ) {
              alert('Harga akhir harus lebih dari nol dan diskon antara 0 sampai kurang dari 100%.')
              return
            }

            const awalDihitung = akhir / (1 - diskon / 100)
            const potongan = awalDihitung - akhir

            setHasilKalkulator({
              jenis: 'hargaAwal',
              awal: awalDihitung,
              akhir,
              diskon,
              potongan
            })
          }

          if (jenisPerhitungan === 'potongan') {
            if (
              hargaAwal === '' ||
              persentaseDiskon === '' ||
              awal <= 0 ||
              diskon < 0 ||
              diskon > 100
            ) {
              alert('Periksa kembali harga awal dan persentase diskon.')
              return
            }

            const potongan = awal * diskon / 100

            setHasilKalkulator({
              jenis: 'potongan',
              awal,
              diskon,
              potongan
            })
          }
        }}
      >
        Lihat Langkah Penyelesaian →
      </button>

      {hasilKalkulator !== null && (
        <div className="material-card">
          <h2>3. Langkah Penyelesaian 📊</h2>

          {hasilKalkulator.jenis === 'hargaAkhir' && (
            <>
              <h3>Mencari Harga Akhir</h3>
              <p>Diketahui:</p>
              <p>Harga awal = Rp {hasilKalkulator.awal.toLocaleString('id-ID')}</p>
              <p>Diskon = {hasilKalkulator.diskon}%</p>

              <p>Langkah 1: Hitung potongan harga.</p>
              <p>
                = {hasilKalkulator.awal.toLocaleString('id-ID')} × {hasilKalkulator.diskon} / 100
              </p>
              <p>
                = Rp {hasilKalkulator.potongan.toLocaleString('id-ID')}
              </p>

              <p>Langkah 2: Kurangi harga awal dengan potongan.</p>
              <p>
                = {hasilKalkulator.awal.toLocaleString('id-ID')} - {hasilKalkulator.potongan.toLocaleString('id-ID')}
              </p>

              <h3>
                Harga akhir = Rp {hasilKalkulator.akhir.toLocaleString('id-ID')}
              </h3>
            </>
          )}

          {hasilKalkulator.jenis === 'besarDiskon' && (
            <>
              <h3>Mencari Persentase Diskon</h3>
              <p>Diketahui:</p>
              <p>Harga awal = Rp {hasilKalkulator.awal.toLocaleString('id-ID')}</p>
              <p>Harga akhir = Rp {hasilKalkulator.akhir.toLocaleString('id-ID')}</p>

              <p>Langkah 1: Cari potongan harga.</p>
              <p>
                = {hasilKalkulator.awal.toLocaleString('id-ID')} - {hasilKalkulator.akhir.toLocaleString('id-ID')}
              </p>
              <p>
                = Rp {hasilKalkulator.potongan.toLocaleString('id-ID')}
              </p>

              <p>Langkah 2: Cari persentase diskon.</p>
              <p>= (Potongan ÷ Harga awal) × 100%</p>
              <p>
                = ({hasilKalkulator.potongan.toLocaleString('id-ID')} ÷ {hasilKalkulator.awal.toLocaleString('id-ID')}) × 100%
              </p>

              <h3>
                Diskon = {hasilKalkulator.persen.toLocaleString('id-ID')}%
              </h3>
            </>
          )}

          {hasilKalkulator.jenis === 'hargaAwal' && (
            <>
              <h3>Mencari Harga Awal</h3>
              <p>Diketahui:</p>
              <p>Harga akhir = Rp {hasilKalkulator.akhir.toLocaleString('id-ID')}</p>
              <p>Diskon = {hasilKalkulator.diskon}%</p>

              <p>Langkah 1: Tentukan persentase harga setelah diskon.</p>
              <p>= 100% - {hasilKalkulator.diskon}%</p>
              <p>= {100 - hasilKalkulator.diskon}%</p>

              <p>Langkah 2: Hitung harga awal.</p>
              <p>
                = Harga akhir ÷ ({100 - hasilKalkulator.diskon} / 100)
              </p>
              <p>
                = {hasilKalkulator.akhir.toLocaleString('id-ID')} ÷ {(100 - hasilKalkulator.diskon) / 100}
              </p>

              <h3>
                Harga awal = Rp {hasilKalkulator.awal.toLocaleString('id-ID', { maximumFractionDigits: 2 })}
              </h3>
            </>
          )}

          {hasilKalkulator.jenis === 'potongan' && (
            <>
              <h3>Mencari Besar Potongan Harga</h3>

              <p><strong>Diketahui:</strong></p>
              <p>
                Harga awal = Rp {hasilKalkulator.awal.toLocaleString('id-ID')}
              </p>
              <p>Diskon = {hasilKalkulator.diskon}%</p>

              <p>Langkah 1: Tentukan rumus potongan harga.</p>
              <div className="formula-box">
                Potongan = (Diskon / 100) × Harga Awal
              </div>

              <p>Langkah 2: Masukkan angka yang diketahui.</p>
              <p>
                = ({hasilKalkulator.diskon} / 100) × {hasilKalkulator.awal.toLocaleString('id-ID')}
              </p>

              <p>Langkah 3: Hitung hasilnya.</p>
              <div className="formula-box">
                Potongan harga = Rp {hasilKalkulator.potongan.toLocaleString('id-ID')}
              </div>
            </>
          )}
        </div>
      )}

      <button
        className="back-button"
        onClick={() => {
          setDiketahui('')
          setDitanya('')
          setHargaAwal('')
          setHargaAkhirInput('')
          setPersentaseDiskon('')
          setJenisPerhitungan('hargaAkhir')
          setHasilKalkulator(null)
        }}
      >
        ↻ Reset Kalkulator
      </button>
    </div>
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
