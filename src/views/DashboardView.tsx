import React from 'react';
import {
  Play,
  Map,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Award,
  Layers,
  Compass,
  Volume2,
} from 'lucide-react';
import { UserAnswerState } from '../types/quiz';
import { allQuestions } from '../data/questions';
import { calculateFinalGrade, getMasteryCategory } from '../utils/scoring';
import { speechManager } from '../utils/speech';
import { ViewType } from '../components/Navbar';

interface DashboardViewProps {
  userState: UserAnswerState;
  onNavigate: (view: ViewType, targetQuestionId?: number) => void;
  onRequestReset: () => void;
}

export const OPENING_NARRATION =
  'Halo, selamat datang di aplikasi TKA Matematika Tingkat Lanjut 2026 bersama Mister Jo! ' +
  'Di sini kita tidak sekadar menghafalkan rumus atau menghitung angka. Kita akan belajar bagaimana memahami masalah, ' +
  'membaca informasi, menemukan pola, menyusun strategi, dan membuktikan jawaban secara matematis. ' +
  'Ada 30 soal menantang yang sudah disiapkan untuk mengasah kemampuan berpikir tingkat tinggi kalian. ' +
  'Tenang, kita tidak akan langsung dituntut menjadi ahli. Mister Jo akan membimbing kalian secara bertahap, ' +
  'mulai dari memahami stimulus, mengenali konsep, memilih rumus, melakukan perhitungan, sampai menemukan cara penyelesaian yang lebih cepat. ' +
  'Mari kita buktikan bahwa matematika tingkat lanjut bukan sesuatu yang harus ditakuti. ' +
  'Selamat belajar. Mari kita mulai!';

export const BENEFITS_NARRATION =
  'Aplikasi TKA Matematika Tingkat Lanjut ini dirancang khusus untuk membantu kalian: ' +
  'Pertama, menguasai konsep matematika tingkat lanjut secara kokoh. ' +
  'Kedua, mengembangkan penalaran kuantitatif dan logika analitis. ' +
  'Ketiga, melatih pemodelan matematika dari fenomena dunia nyata. ' +
  'Keempat, meningkatkan ketelitian berhitung dan efisiensi waktu. ' +
  'Kelima, mengenali trik dan cara cepat penyelesaian tanpa mengorbankan ketepatan. ' +
  'Keenam, memahami berbagai bentuk soal TKA standar UTBK dan seleksi masuk perguruan tinggi. ' +
  'Dan ketujuh, membangun kemampuan bertahap dari tingkat pemula menuju mahir.';

export const DashboardView: React.FC<DashboardViewProps> = ({
  userState,
  onNavigate,
  onRequestReset,
}) => {
  const totalQuestions = allQuestions.length; // 30
  const answeredQuestionIds = Object.keys(userState.checked).filter((id) => userState.checked[Number(id)]);
  const completedCount = answeredQuestionIds.length;

  let totalScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;

  answeredQuestionIds.forEach((idStr) => {
    const id = Number(idStr);
    const score = userState.scores[id] ?? 0;
    totalScore += score;
    if (score >= 0.99) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const finalGrade = calculateFinalGrade(totalScore, totalQuestions);
  const mastery = getMasteryCategory(finalGrade);

  // Element breakdown
  const getElementStats = (element: 'aljabar' | 'geometri' | 'kalkulus') => {
    const elementQuestions = allQuestions.filter((q) => q.element === element);
    const elemTotal = elementQuestions.length;
    let elemScore = 0;
    let elemAnswered = 0;

    elementQuestions.forEach((q) => {
      if (userState.checked[q.id]) {
        elemAnswered++;
        elemScore += userState.scores[q.id] ?? 0;
      }
    });

    const percent = elemTotal > 0 ? (elemScore / elemTotal) * 100 : 0;
    return {
      total: elemTotal,
      answered: elemAnswered,
      score: elemScore,
      percent: Math.round(percent),
    };
  };

  const aljabarStats = getElementStats('aljabar');
  const geometriStats = getElementStats('geometri');
  const kalkulusStats = getElementStats('kalkulus');

  const handlePlayOpening = () => {
    speechManager.registerUserInteraction();
    speechManager.speak(OPENING_NARRATION);
  };

  const handlePlayBenefits = () => {
    speechManager.registerUserInteraction();
    speechManager.speak(BENEFITS_NARRATION);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner with Batik & Gold Accent */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-950 p-6 sm:p-10 text-white shadow-xl border border-teal-700/50">
        {/* Decorative batik subtle overlay */}
        <div className="absolute inset-0 bg-batik-subtle opacity-15 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-800/80 px-3.5 py-1 text-xs font-semibold text-amber-300 border border-amber-400/30">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Platform Pembelajaran Matematika HOTS 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            TKA MATEMATIKA <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-200">
              TINGKAT LANJUT 2026
            </span>
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-base sm:text-lg font-bold text-amber-400 font-serif">
              MISTER JO
            </span>
            <span className="text-teal-400">•</span>
            <p className="text-sm sm:text-base font-medium italic text-teal-100">
              "Berpikir Cerdas, Bernalar Tajam, Menaklukkan Matematika!"
            </p>
          </div>

          <p className="text-xs sm:text-sm text-teal-200/90 leading-relaxed max-w-2xl">
            Latihan intensif 30 soal berkualitas tinggi mencakup Aljabar, Geometri & Pengukuran, serta Kalkulus. Dilengkapi penalaran HOTS, visualisasi diagram ilmiah akurat, pembahasan KaTeX bertahap, dan audio narasi ramah berbahasa Indonesia.
          </p>

          {/* Opening Narrator CTA Button */}
          <div className="pt-2">
            <button
              onClick={handlePlayOpening}
              className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-teal-950 shadow-lg hover:from-amber-300 hover:to-amber-400 transition transform active:scale-95"
            >
              <Volume2 className="h-4 w-4" />
              <span>Dengarkan Sambutan Mister Jo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Action Buttons Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* 1. Mulai Belajar */}
        <button
          onClick={() => onNavigate('practice', 1)}
          className="group flex flex-col justify-between rounded-2xl border border-teal-200 bg-white p-5 text-left shadow-sm hover:shadow-md hover:border-teal-400 transition"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm group-hover:scale-105 transition">
              <Play className="h-5 w-5 ml-0.5 fill-current" />
            </div>
            <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
              Mulai Baru
            </span>
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition">
              MULAI BELAJAR
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Buka Soal Nomor 1 dan mulai bimbingan dari awal.
            </p>
          </div>
        </button>

        {/* 2. Lanjutkan Latihan */}
        <button
          onClick={() => onNavigate('practice', userState.lastQuestionId || 1)}
          className="group flex flex-col justify-between rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50/70 to-white p-5 text-left shadow-sm hover:shadow-md hover:border-amber-400 transition"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-teal-950 shadow-sm group-hover:scale-105 transition">
              <ArrowRight className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
              Soal #{userState.lastQuestionId || 1}
            </span>
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-amber-950 group-hover:text-amber-700 transition">
              LANJUTKAN LATIHAN
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Lanjutkan pengerjaan pada nomor soal yang terakhir dibuka.
            </p>
          </div>
        </button>

        {/* 3. Peta Materi */}
        <button
          onClick={() => onNavigate('map')}
          className="group flex flex-col justify-between rounded-2xl border border-teal-200 bg-white p-5 text-left shadow-sm hover:shadow-md hover:border-teal-400 transition"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm group-hover:scale-105 transition">
              <Map className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
              Struktur
            </span>
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition">
              PETA MATERI
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Telusuri distribusi 3 elemen: Aljabar, Geometri, dan Kalkulus.
            </p>
          </div>
        </button>

        {/* 4. Petunjuk Penggunaan */}
        <button
          onClick={() => onNavigate('guide')}
          className="group flex flex-col justify-between rounded-2xl border border-teal-200 bg-white p-5 text-left shadow-sm hover:shadow-md hover:border-teal-400 transition"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-800 text-white shadow-sm group-hover:scale-105 transition">
              <HelpCircle className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
              Panduan
            </span>
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition">
              PETUNJUK PENGGUNAAN
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Panduan lengkap tombol, narator suara, KaTeX, dan penilaian.
            </p>
          </div>
        </button>
      </section>

      {/* Progress & Statistics Dashboard */}
      <section className="rounded-3xl border border-teal-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-teal-950 flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              <span>Informasi Progres Belajar</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pantau pencapaian, akurasi penalaran, dan penguasaan konsep Anda
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('results')}
              className="rounded-xl bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800 border border-teal-200 hover:bg-teal-100 transition"
            >
              Lihat Rapor Lengkap
            </button>
            <button
              onClick={onRequestReset}
              className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Progres</span>
            </button>
          </div>
        </div>

        {/* 5 Key Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 py-6">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-center">
            <div className="text-2xl font-black text-slate-900">{totalQuestions}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Total Soal</div>
          </div>

          <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-4 text-center">
            <div className="text-2xl font-black text-teal-900">{completedCount}</div>
            <div className="text-xs font-semibold text-teal-700 mt-1">Soal Selesai</div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-center">
            <div className="text-2xl font-black text-emerald-700 flex items-center justify-center gap-1">
              <CheckCircle2 className="h-5 w-5 inline text-emerald-600" />
              <span>{correctCount}</span>
            </div>
            <div className="text-xs font-semibold text-emerald-700 mt-1">Jawaban Benar</div>
          </div>

          <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4 text-center">
            <div className="text-2xl font-black text-rose-700 flex items-center justify-center gap-1">
              <XCircle className="h-5 w-5 inline text-rose-600" />
              <span>{incorrectCount}</span>
            </div>
            <div className="text-xs font-semibold text-rose-700 mt-1">Perlu Perbaikan</div>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-4 text-center">
            <div className="text-2xl font-black text-amber-800">{finalGrade}</div>
            <div className="text-xs font-semibold text-amber-900 mt-1">Nilai Sementara (0-100)</div>
          </div>
        </div>

        {/* Mastery Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-teal-100 bg-teal-50/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white font-bold">
              {Math.round((completedCount / totalQuestions) * 100)}%
            </div>
            <div>
              <div className="text-xs font-semibold text-teal-800">Status Belajar:</div>
              <div className={`text-sm font-bold ${mastery.color}`}>
                Kategori: {mastery.category}
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-600 max-w-lg italic">
            "{mastery.description}"
          </div>
        </div>

        {/* Element Progress Bars */}
        <div className="mt-6 space-y-3.5">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Layers className="h-4 w-4 text-teal-700" />
            <span>Penguasaan Setiap Elemen Kurikulum (10 Soal Masing-Masing)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Aljabar */}
            <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 text-sm">Aljabar</span>
                <span className="text-xs font-bold text-emerald-700">
                  {aljabarStats.answered}/10 Soal ({aljabarStats.percent}%)
                </span>
              </div>
              <div className="mt-2.5 h-2.5 w-full rounded-full bg-emerald-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                  style={{ width: `${aljabarStats.percent}%` }}
                ></div>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                Matriks 2x2 & 3x3, Polinomial Derajat ≤ 4, dan Karakteristik Fungsi.
              </p>
            </div>

            {/* Geometri */}
            <div className="rounded-2xl border border-teal-100 bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-teal-900 text-sm">Geometri & Pengukuran</span>
                <span className="text-xs font-bold text-teal-700">
                  {geometriStats.answered}/10 Soal ({geometriStats.percent}%)
                </span>
              </div>
              <div className="mt-2.5 h-2.5 w-full rounded-full bg-teal-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-teal-600 transition-all duration-500"
                  style={{ width: `${geometriStats.percent}%` }}
                ></div>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                Vektor 2D & 3D, Lingkaran (Garis Singgung & Juring), dan Transformasi.
              </p>
            </div>

            {/* Kalkulus */}
            <div className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-900 text-sm">Kalkulus</span>
                <span className="text-xs font-bold text-cyan-700">
                  {kalkulusStats.answered}/10 Soal ({kalkulusStats.percent}%)
                </span>
              </div>
              <div className="mt-2.5 h-2.5 w-full rounded-full bg-cyan-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-cyan-700 transition-all duration-500"
                  style={{ width: `${kalkulusStats.percent}%` }}
                ></div>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                Limit Fungsi Aljabar & Trigonometri Tanpa Teorema L'Hôpital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-50/70 via-emerald-50/40 to-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-teal-950 flex items-center gap-2">
              <Compass className="h-5 w-5 text-teal-700" />
              <span>Manfaat Aplikasi Bagi Siswa</span>
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Membangun kompetensi berpikir matematis tingkat tinggi dari tingkat dasar menuju mahir
            </p>
          </div>
          <button
            onClick={handlePlayBenefits}
            className="flex items-center gap-2 rounded-xl bg-teal-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-teal-800 transition"
          >
            <Volume2 className="h-4 w-4" />
            <span>Dengarkan Manfaat</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          <div className="rounded-2xl bg-white p-4 border border-teal-100 shadow-2xs">
            <div className="font-bold text-teal-900 mb-1 text-sm">1. Konsep Matematika Kokoh</div>
            <p className="text-slate-600 leading-relaxed">
              Memahami logika di balik setiap rumus, bukan sekadar menghafal pola soal secara mekanis.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-teal-100 shadow-2xs">
            <div className="font-bold text-teal-900 mb-1 text-sm">2. Penalaran Kuantitatif HOTS</div>
            <p className="text-slate-600 leading-relaxed">
              Melatih analisis informasi matematis panjang, data tabel, dan interpretasi grafik ilmiah.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-teal-100 shadow-2xs">
            <div className="font-bold text-teal-900 mb-1 text-sm">3. Pemodelan & Optimasi</div>
            <p className="text-slate-600 leading-relaxed">
              Mengubah kasus dunia nyata industri, fisika, dan ekonomi ke dalam bentuk persamaan matematis.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-teal-100 shadow-2xs">
            <div className="font-bold text-teal-900 mb-1 text-sm">4. Ketelitian Berhitung</div>
            <p className="text-slate-600 leading-relaxed">
              Mengevaluasi tanda aljabar, matriks, pecahan bentuk akar, dan sudut trigonometri tanpa kesalahan umum.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-teal-100 shadow-2xs">
            <div className="font-bold text-teal-900 mb-1 text-sm">5. Trik & Cara Cepat Efisien</div>
            <p className="text-slate-600 leading-relaxed">
              Mengenali jalan pintas mathematically-proven yang menghemat waktu tanpa mengorbankan ketepatan.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-teal-100 shadow-2xs">
            <div className="font-bold text-teal-900 mb-1 text-sm">6. Berbagai Tipe Soal TKA</div>
            <p className="text-slate-600 leading-relaxed">
              Menguasai 4 format: Pilihan Ganda Biasa, Analisis Kecukupan Data, Pilihan Ganda Kompleks, dan Benar/Salah.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardView;
