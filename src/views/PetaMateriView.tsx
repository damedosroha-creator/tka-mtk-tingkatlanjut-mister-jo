import React, { useState } from 'react';
import {
  Map,
  Layers,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  Sparkles,
} from 'lucide-react';
import { ElementType, UserAnswerState } from '../types/quiz';
import { allQuestions } from '../data/questions';
import { ViewType } from '../components/Navbar';
import { speechManager } from '../utils/speech';

interface PetaMateriViewProps {
  userState: UserAnswerState;
  onNavigateToQuestion: (questionId: number) => void;
  onNavigate: (view: ViewType) => void;
}

export const PETA_MATERI_NARRATION =
  'Peta materi TKA Matematika Tingkat Lanjut terdiri atas tiga pilar utama yang seimbang, masing-masing sepuluh soal: ' +
  'Pertama, Aljabar yang mencakup matriks ordo dua dan tiga, polinomial derajat maksimal empat, serta karakteristik fungsi. ' +
  'Kedua, Geometri dan Pengukuran yang meliputi vektor hingga tiga dimensi, persamaan garis singgung lingkaran, luas juring dan tembereng, serta transformasi geometri. ' +
  'Dan ketiga, Kalkulus yang menguji konsep limit aljabar dan trigonometri secara murni tanpa aturan L\'Hôpital. ' +
  'Kalian dapat memilih topik atau nomor soal mana pun untuk langsung memulai latihan!';

export const PetaMateriView: React.FC<PetaMateriViewProps> = ({
  userState,
  onNavigateToQuestion,
}) => {
  const [selectedElement, setSelectedElement] = useState<ElementType | 'all'>('all');

  const filteredQuestions =
    selectedElement === 'all'
      ? allQuestions
      : allQuestions.filter((q) => q.element === selectedElement);

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'menengah':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sulit':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'sangat_sulit':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'pg':
        return 'PG Biasa';
      case 'kecukupan':
        return 'Kecukupan Data';
      case 'kompleks':
        return 'PG Kompleks';
      case 'benar_salah':
        return 'Benar / Salah';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-teal-900 to-emerald-900 p-6 text-white shadow-md">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1">
            <Map className="h-4 w-4" />
            <span>Peta Kurikulum & Distribusi 30 Soal HOTS</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            Peta Materi TKA Matematika Tingkat Lanjut
          </h1>
          <p className="text-xs text-teal-200 mt-1 max-w-xl">
            Tiga elemen seimbang dengan 10 soal masing-masing, memadukan variasi jenis soal dan tingkat kesulitan terkalibrasi.
          </p>
        </div>

        <button
          onClick={() => {
            speechManager.registerUserInteraction();
            speechManager.speak(PETA_MATERI_NARRATION);
          }}
          className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-teal-950 shadow hover:bg-amber-300 transition"
        >
          <Sparkles className="h-4 w-4" />
          <span>Dengarkan Panduan Peta</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedElement('all')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            selectedElement === 'all'
              ? 'bg-teal-800 text-white shadow'
              : 'bg-white text-slate-700 hover:bg-teal-50 border border-slate-200'
          }`}
        >
          Semua Materi (30 Soal)
        </button>
        <button
          onClick={() => setSelectedElement('aljabar')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            selectedElement === 'aljabar'
              ? 'bg-emerald-700 text-white shadow'
              : 'bg-white text-emerald-900 hover:bg-emerald-50 border border-emerald-200'
          }`}
        >
          Aljabar (10 Soal)
        </button>
        <button
          onClick={() => setSelectedElement('geometri')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            selectedElement === 'geometri'
              ? 'bg-teal-700 text-white shadow'
              : 'bg-white text-teal-900 hover:bg-teal-50 border border-teal-200'
          }`}
        >
          Geometri & Pengukuran (10 Soal)
        </button>
        <button
          onClick={() => setSelectedElement('kalkulus')}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            selectedElement === 'kalkulus'
              ? 'bg-cyan-800 text-white shadow'
              : 'bg-white text-cyan-900 hover:bg-cyan-50 border border-cyan-200'
          }`}
        >
          Kalkulus (10 Soal)
        </button>
      </div>

      {/* Questions List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuestions.map((q) => {
          const isAnswered = Boolean(userState.checked[q.id]);
          const score = userState.scores[q.id] ?? 0;
          const isFlagged = Boolean(userState.flagged[q.id]);

          return (
            <div
              key={q.id}
              onClick={() => onNavigateToQuestion(q.id)}
              className="group cursor-pointer flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-teal-400 hover:shadow-md transition"
            >
              <div>
                {/* Header row: Number, Element, Type, Difficulty, Flag */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-900 text-xs font-black text-amber-300">
                      #{q.number}
                    </span>
                    <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800 uppercase border border-teal-200">
                      {q.element}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {isFlagged && (
                      <span title="Soal Ditandai">
                        <Bookmark className="h-4 w-4 fill-amber-500 text-amber-500" />
                      </span>
                    )}
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-semibold border ${getDifficultyBadge(
                        q.difficulty
                      )}`}
                    >
                      {q.difficulty.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Question Title & Subtopic */}
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition leading-snug">
                  {q.title}
                </h3>
                <div className="text-[11px] font-medium text-teal-700 mt-1 flex items-center gap-1">
                  <Layers className="h-3 w-3" />
                  <span>{q.subtopic}</span>
                </div>

                <div className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {q.stimulus}
                </div>
              </div>

              {/* Footer status & Jump button */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-2.5">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                    {getTypeLabel(q.type)}
                  </span>
                  {isAnswered ? (
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                        score >= 0.99 ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{score >= 0.99 ? 'Benar (1.0)' : `Skor ${score.toFixed(2)}`}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-400">
                      Belum Dikerjakan
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-teal-700 group-hover:text-teal-900 group-hover:translate-x-1 transition">
                  <span>Buka Soal</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PetaMateriView;
