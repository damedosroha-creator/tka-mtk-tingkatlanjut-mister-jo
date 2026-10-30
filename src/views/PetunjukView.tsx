import React from 'react';
import {
  HelpCircle,
  Volume2,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Zap,
  Bookmark,
  RotateCcw,
  Sliders,
  Award,
} from 'lucide-react';
import { speechManager } from '../utils/speech';

export const PETUNJUK_NARRATION =
  'Berikut adalah petunjuk penggunaan aplikasi TKA Matematika Tingkat Lanjut 2026 bersama Mister Jo: ' +
  'Pertama, Dashboard berfungsi sebagai pusat kendali untuk melihat ringkasan progres, nilai sementara, dan status penguasaan materi kalian. ' +
  'Kedua, Peta Materi menyajikan susunan 30 soal dalam tiga pilar: Aljabar, Geometri, dan Kalkulus, memungkinkan kalian melompat ke topik tertentu kapan saja. ' +
  'Ketiga, pada Halaman Latihan, kalian mengerjakan satu soal per tampilan agar fokus penuh. Tersedia tombol audio panduan bertahap dari stimulus hingga pembahasan. ' +
  'Keempat, Pilihan Tipe Soal meliputi Pilihan Ganda Biasa, Analisis Kecukupan Pernyataan, Pilihan Ganda Kompleks dengan kotak centang, dan Tabel Benar atau Salah. ' +
  'Kelima, tekan tombol Periksa Jawaban untuk mengecek kebenaran respons secara langsung. ' +
  'Keenam, tombol Pembahasan Lengkap akan membuka rincian alur matematis terstruktur berbasis KaTeX. ' +
  'Ketujuh, tombol Rumus Kunci menampilkan formula esensial yang menjadi pijakan soal. ' +
  'Kedelapan, tombol Cara Cepat Mister Jo memberikan strategi penyelesaian singkat yang efisien tanpa mengorbankan ketepatan. ' +
  'Kesembilan, Progres Belajar kalian otomatis tersimpan di peramban sehingga tidak akan hilang saat dimuat ulang. ' +
  'Dan kesepuluh, jika ingin mengulang latihan dari awal, gunakan tombol Reset Seluruh Progres dengan konfirmasi.';

export const PetunjukView: React.FC = () => {
  const handlePlayGuide = () => {
    speechManager.registerUserInteraction();
    speechManager.speak(PETUNJUK_NARRATION);
  };

  const guides = [
    {
      title: '1. Dashboard Utama',
      icon: Award,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      description:
        'Pusat pemantauan belajar yang menampilkan total soal, jumlah soal selesai, akurasi jawaban benar/salah, nilai skala 100, dan persentase penguasaan setiap elemen materi.',
    },
    {
      title: '2. Peta Materi (Curriculum Map)',
      icon: BookOpen,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      description:
        'Daftar lengkap 30 soal yang terbagi rata pada Aljabar (10 soal), Geometri & Pengukuran (10 soal), dan Kalkulus (10 soal). Dilengkapi filter materi dan akses cepat.',
    },
    {
      title: '3. Mode Latihan Fokus (Single Question View)',
      icon: Sparkles,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      description:
        'Setiap soal ditampilkan satu per satu untuk memaksimalkan konsentrasi penalaran. Dilengkapi visualisasi grafik/diagram ilmiah presisi tinggi.',
    },
    {
      title: '4. Empat Ragam Tipe Soal TKA',
      icon: Sliders,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      description:
        'Meliputi Pilihan Ganda Biasa (opsi A-E), Analisis Kecukupan Pernyataan (opsi A-E logika data), Pilihan Ganda Kompleks (checkbox multiple answers), dan Benar/Salah (evaluasi 3 pernyataan independen).',
    },
    {
      title: '5. Tombol "Periksa Jawaban"',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      description:
        'Memverifikasi respons siswa seketika dengan sistem penilaian otomatis: 1 poin untuk jawaban tepat penuh, dan skor parsial proporsional untuk pilihan ganda kompleks dan benar/salah.',
    },
    {
      title: '6. Tombol "Pembahasan Lengkap"',
      icon: BookOpen,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      description:
        'Membuka pembahasan 8 tahap mendalam: Memahami Masalah, Konsep, Rumus Kunci, Langkah Perhitungan Aljabar, Pemeriksaan Hasil, Kesimpulan, Cara Cepat, dan Kesalahan Umum.',
    },
    {
      title: '7. Rumus Kunci & KaTeX Ilmiah',
      icon: Sparkles,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      description:
        'Semua notasi matematika (akar, matriks, limit, pecahan, vektor) dirender menggunakan pustaka KaTeX standar jurnal ilmiah sehingga jernih dan nyaman dibaca.',
    },
    {
      title: '8. Tombol "Cara Cepat Mister Jo"',
      icon: Zap,
      color: 'text-orange-600 bg-orange-50 border-orange-200',
      description:
        'Trik alternatif matematis yang terbukti valid (bukan sekadar tebak-tebakan) untuk menghemat waktu berharga pada ujian TKA yang ketat.',
    },
    {
      title: '9. Penanda Soal (Bookmark)',
      icon: Bookmark,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      description:
        'Tandai soal-soal menantang yang ingin Anda pelajari atau diskusikan kembali di lain waktu dengan mengklik ikon bintang/bookmark.',
    },
    {
      title: '10. Penyimpanan Otomatis (Offline-First)',
      icon: RotateCcw,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      description:
        'Semua jawaban, skor, dan bookmark tersimpan otomatis di localStorage peramban Anda. Anda juga dapat mereset seluruh progres kapan saja dengan aman.',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-teal-900 to-emerald-900 p-6 sm:p-8 text-white shadow-md">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1">
            <HelpCircle className="h-4 w-4" />
            <span>Panduan Interaktif Penggunaan Aplikasi</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            Petunjuk Penggunaan Fitur Aplikasi
          </h1>
          <p className="text-xs text-teal-200 mt-1 max-w-xl leading-relaxed">
            Pahami fungsi setiap tombol, fitur audio panduan, dan format soal agar proses belajar Anda berjalan efektif dan menyenangkan.
          </p>
        </div>

        <button
          onClick={handlePlayGuide}
          className="flex items-center gap-2 rounded-2xl bg-amber-400 px-5 py-2.5 text-xs sm:text-sm font-bold text-teal-950 shadow hover:bg-amber-300 transition"
        >
          <Volume2 className="h-4 w-4" />
          <span>Dengarkan Petunjuk</span>
        </button>
      </div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-teal-300 transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border ${g.color}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{g.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-12">
                {g.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PetunjukView;
