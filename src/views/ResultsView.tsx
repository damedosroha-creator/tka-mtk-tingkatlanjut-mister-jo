import React, { useEffect } from 'react';
import {
  Award,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  Volume2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserAnswerState } from '../types/quiz';
import { allQuestions } from '../data/questions';
import { calculateFinalGrade, getMasteryCategory } from '../utils/scoring';
import { speechManager } from '../utils/speech';
import { ViewType } from '../components/Navbar';

interface ResultsViewProps {
  userState: UserAnswerState;
  onNavigateToQuestion: (id: number) => void;
  onNavigate: (view: ViewType) => void;
  onRequestReset: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  userState,
  onNavigateToQuestion,
  onNavigate,
  onRequestReset,
}) => {
  const totalQuestions = allQuestions.length; // 30
  const answeredQuestionIds = Object.keys(userState.checked).filter((id) => userState.checked[Number(id)]);
  const completedCount = answeredQuestionIds.length;

  let totalScore = 0;
  let correctCount = 0;
  let partialCount = 0;
  let incorrectCount = 0;

  allQuestions.forEach((q) => {
    if (userState.checked[q.id]) {
      const sc = userState.scores[q.id] ?? 0;
      totalScore += sc;
      if (sc >= 0.99) {
        correctCount++;
      } else if (sc > 0) {
        partialCount++;
      } else {
        incorrectCount++;
      }
    }
  });

  const finalGrade = calculateFinalGrade(totalScore, totalQuestions);
  const mastery = getMasteryCategory(finalGrade);

  // Element stats
  const getElementReport = (elem: 'aljabar' | 'geometri' | 'kalkulus') => {
    const list = allQuestions.filter((q) => q.element === elem);
    let sc = 0;
    let answered = 0;
    list.forEach((q) => {
      if (userState.checked[q.id]) {
        answered++;
        sc += userState.scores[q.id] ?? 0;
      }
    });
    const pct = list.length > 0 ? (sc / list.length) * 100 : 0;
    return {
      element: elem,
      total: list.length,
      answered,
      score: sc,
      percent: Math.round(pct),
    };
  };

  const aljabar = getElementReport('aljabar');
  const geometri = getElementReport('geometri');
  const kalkulus = getElementReport('kalkulus');

  // Confetti on mount if grade >= 70
  useEffect(() => {
    if (finalGrade >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0d9488', '#f59e0b', '#10b981', '#3b82f6'],
        });
      } catch {
        // ignore if confetti unavailable
      }
    }
  }, [finalGrade]);

  const handleSpeakReport = () => {
    speechManager.registerUserInteraction();
    const narration =
      `Hasil evaluasi latihan Anda bersama Mister Jo: nilai akhir yang Anda peroleh adalah ${finalGrade} dari skala 100, ` +
      `dengan kategori ${mastery.category}. Anda berhasil menjawab ${correctCount} soal dengan sempurna dan ${partialCount} soal dengan skor parsial. ` +
      `Penguasaan Aljabar Anda adalah ${aljabar.percent} persen, Geometri ${geometri.percent} persen, dan Kalkulus ${kalkulus.percent} persen. ` +
      `Saran Mister Jo: ${mastery.description}`;
    speechManager.speak(narration);
  };

  // Find questions that need review (answered but score < 0.99)
  const questionsToReview = allQuestions.filter(
    (q) => userState.checked[q.id] && (userState.scores[q.id] ?? 0) < 0.99
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Grade Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-950 p-6 sm:p-10 text-white shadow-xl border border-teal-700/50">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-800/80 px-3.5 py-1 text-xs font-semibold text-amber-300 border border-amber-400/30">
            <Award className="h-4 w-4 text-amber-300" />
            <span>Laporan Hasil Belajar Mandiri – Mister Jo</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Evaluasi Kompetensi TKA Matematika 2026
          </h1>

          <div className="flex flex-wrap items-baseline gap-4 pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-emerald-200">
                {finalGrade}
              </span>
              <span className="text-lg font-bold text-teal-300">/ 100</span>
            </div>

            <div
              className={`rounded-2xl px-4 py-2 text-xs sm:text-sm font-bold border ${mastery.badgeBg}`}
            >
              Kategori: {mastery.category}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-xl italic pt-1">
            "{mastery.description}"
          </p>

          <div className="pt-2">
            <button
              onClick={handleSpeakReport}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-xs font-bold text-teal-950 shadow hover:from-amber-300 transition"
            >
              <Volume2 className="h-4 w-4" />
              <span>Dengarkan Evaluasi Audio Mister Jo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-xs">
          <div className="text-2xl font-black text-slate-900">
            {completedCount} <span className="text-xs text-slate-400 font-normal">/ {totalQuestions}</span>
          </div>
          <div className="text-xs font-semibold text-slate-500 mt-1">Soal Dikerjakan</div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-center shadow-xs">
          <div className="text-2xl font-black text-emerald-800 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <span>{correctCount}</span>
          </div>
          <div className="text-xs font-semibold text-emerald-700 mt-1">Jawaban Benar Penuh (1.0)</div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-center shadow-xs">
          <div className="text-2xl font-black text-amber-800 flex items-center justify-center gap-1.5">
            <Sparkles className="h-5 w-5 text-amber-600" />
            <span>{partialCount}</span>
          </div>
          <div className="text-xs font-semibold text-amber-800 mt-1">Skor Parsial</div>
        </div>

        <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-center shadow-xs">
          <div className="text-2xl font-black text-rose-800 flex items-center justify-center gap-1.5">
            <XCircle className="h-5 w-5 text-rose-600" />
            <span>{incorrectCount}</span>
          </div>
          <div className="text-xs font-semibold text-rose-700 mt-1">Perlu Pembahasan</div>
        </div>
      </div>

      {/* 3 Pillars Mastery Progress */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-teal-700" />
          <span>Penguasaan Tiga Elemen Utama Kurikulum</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Aljabar */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
              <span>Aljabar (10 Soal)</span>
              <span className="text-sm font-black text-emerald-700">{aljabar.percent}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-emerald-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-600 transition-all duration-700"
                style={{ width: `${aljabar.percent}%` }}
              ></div>
            </div>
            <div className="text-[11px] text-slate-600">
              Skor Diperoleh: {aljabar.score.toFixed(2)} dari 10.0 poin maksimal.
            </div>
          </div>

          {/* Geometri */}
          <div className="rounded-2xl border border-teal-100 bg-teal-50/30 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-teal-950">
              <span>Geometri & Pengukuran (10 Soal)</span>
              <span className="text-sm font-black text-teal-700">{geometri.percent}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-teal-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-teal-600 transition-all duration-700"
                style={{ width: `${geometri.percent}%` }}
              ></div>
            </div>
            <div className="text-[11px] text-slate-600">
              Skor Diperoleh: {geometri.score.toFixed(2)} dari 10.0 poin maksimal.
            </div>
          </div>

          {/* Kalkulus */}
          <div className="rounded-2xl border border-cyan-100 bg-cyan-50/30 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-cyan-950">
              <span>Kalkulus (10 Soal)</span>
              <span className="text-sm font-black text-cyan-800">{kalkulus.percent}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-cyan-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-cyan-700 transition-all duration-700"
                style={{ width: `${kalkulus.percent}%` }}
              ></div>
            </div>
            <div className="text-[11px] text-slate-600">
              Skor Diperoleh: {kalkulus.score.toFixed(2)} dari 10.0 poin maksimal.
            </div>
          </div>
        </div>
      </div>

      {/* Pedagogical Recommendations from Mister Jo */}
      <div className="rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-teal-950 font-black text-xs">
            M·JO
          </div>
          <div>
            <h3 className="font-bold text-amber-950 text-sm">
              Rekomendasi Belajar Selanjutnya dari Mister Jo
            </h3>
            <p className="text-[11px] text-amber-800">
              Saran tindak lanjut untuk menyempurnakan strategi penalaran Anda
            </p>
          </div>
        </div>

        <ul className="space-y-2 text-xs text-slate-700 leading-relaxed list-disc list-inside">
          {aljabar.percent < 80 && (
            <li>
              <strong className="text-slate-900">Penguatan Aljabar:</strong> Tinjau kembali konsep determinan dan sifat invers matriks, serta periksa ketelitian saat memfaktorkan polinomial dan menentukan domain fungsi.
            </li>
          )}
          {geometri.percent < 80 && (
            <li>
              <strong className="text-slate-900">Penguatan Geometri:</strong> Latih visualisasi rumus jarak titik ke garis singgung lingkaran dan perkalian titik vektor ruang dimensi tiga (R³).
            </li>
          )}
          {kalkulus.percent < 80 && (
            <li>
              <strong className="text-slate-900">Penguatan Kalkulus:</strong> Perdalam identitas sudut ganda trigonometri dan pemfaktoran sekawan bentuk akar tanpa bergantung pada turunan L'Hôpital.
            </li>
          )}
          <li>
            <strong className="text-slate-900">Optimalisasi Waktu:</strong> Gunakan trik pada tombol <em>Cara Cepat</em> untuk mengenali pola soal secara efisien.
          </li>
        </ul>
      </div>

      {/* Questions to Review List */}
      {questionsToReview.length > 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-rose-600" />
              <span>Daftar Soal yang Perlu Dipelajari Kembali ({questionsToReview.length} Soal)</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {questionsToReview.map((q) => (
              <div
                key={q.id}
                onClick={() => onNavigateToQuestion(q.id)}
                className="cursor-pointer rounded-2xl border border-rose-100 bg-rose-50/40 p-3.5 hover:bg-rose-50 hover:border-rose-300 transition flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-900 text-amber-300 text-[11px]">
                      #{q.number}
                    </span>
                    <span className="truncate max-w-[160px]">{q.title}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 capitalize">
                    {q.element} • Skor: {(userState.scores[q.id] ?? 0).toFixed(2)}
                  </div>
                </div>

                <div className="text-rose-700 group-hover:translate-x-1 transition">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
        <button
          onClick={() => onNavigate('home')}
          className="rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
        >
          Kembali ke Dashboard
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onRequestReset}
            className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs sm:text-sm font-semibold text-rose-700 hover:bg-rose-100 transition"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset Seluruh Progres</span>
          </button>
          <button
            onClick={() => onNavigateToQuestion(1)}
            className="flex items-center gap-2 rounded-2xl bg-teal-800 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow hover:bg-teal-900 transition"
          >
            <span>Ulangi Semua Latihan</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
