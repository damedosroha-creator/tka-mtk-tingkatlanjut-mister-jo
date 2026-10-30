import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Zap,
  RotateCcw,
  BookOpen,
  Volume2,
  Lightbulb,
  FileQuestion,
  ListFilter,
} from 'lucide-react';
import { Question, UserAnswerState } from '../types/quiz';
import { allQuestions } from '../data/questions';
import { calculateQuestionScore } from '../utils/scoring';
import { speechManager } from '../utils/speech';
import MathRenderer from '../components/MathRenderer';
import MathDiagram from '../components/MathDiagram';

interface ExerciseViewProps {
  currentQuestionId: number;
  userState: UserAnswerState;
  onUpdateState: (newState: Partial<UserAnswerState>) => void;
  onSelectQuestion: (questionId: number) => void;
  onFinishQuiz: () => void;
}

export const ExerciseView: React.FC<ExerciseViewProps> = ({
  currentQuestionId,
  userState,
  onUpdateState,
  onSelectQuestion,
  onFinishQuiz,
}) => {
  const question: Question =
    allQuestions.find((q) => q.id === currentQuestionId) || allQuestions[0];

  const currentAnswer = userState.answers[question.id];
  const isChecked = Boolean(userState.checked[question.id]);
  const currentScore = userState.scores[question.id] ?? 0;
  const isFlagged = Boolean(userState.flagged[question.id]);
  const isDiscussionOpen = Boolean(userState.showDiscussion[question.id]);

  const [activeSpeechStep, setActiveSpeechStep] = useState<string | null>(null);
  const [showCaraCepatModal, setShowCaraCepatModal] = useState(false);
  const [showRumusKunciModal, setShowRumusKunciModal] = useState(false);
  const [showQuestionGrid, setShowQuestionGrid] = useState(false);
  const [selectionWarning, setSelectionWarning] = useState<string | null>(null);

  // Auto-speak intro or question when switching questions if autoPlay enabled
  useEffect(() => {
    setSelectionWarning(null);
    // When question changes, speak question intro if user interacted
    if (speechManager.hasInteracted) {
      speechManager.speak(question.narration.intro);
      setActiveSpeechStep('intro');
    }
    // Update lastQuestionId
    onUpdateState({ lastQuestionId: question.id });
  }, [question.id]);

  // Audio step triggers
  const playAudioSegment = (stepKey: string, text: string) => {
    speechManager.registerUserInteraction();
    setActiveSpeechStep(stepKey);
    speechManager.speak(text);
  };

  // Answer handlers
  const handleSelectRadio = (optId: string) => {
    if (isChecked) return;
    setSelectionWarning(null);
    const nextAnswers = { ...userState.answers, [question.id]: optId };
    onUpdateState({ answers: nextAnswers });
  };

  const handleToggleCheckbox = (optId: string) => {
    if (isChecked) return;
    setSelectionWarning(null);
    const currentList = Array.isArray(currentAnswer) ? (currentAnswer as string[]) : [];
    let updatedList: string[];
    if (currentList.includes(optId)) {
      updatedList = currentList.filter((item) => item !== optId);
    } else {
      updatedList = [...currentList, optId];
    }
    const nextAnswers = { ...userState.answers, [question.id]: updatedList };
    onUpdateState({ answers: nextAnswers });
  };

  const handleSelectBenarSalah = (statementIndex: number, val: boolean) => {
    if (isChecked) return;
    setSelectionWarning(null);
    const currentBools: boolean[] = Array.isArray(currentAnswer)
      ? [...(currentAnswer as boolean[])]
      : [false, false, false];

    currentBools[statementIndex] = val;
    const nextAnswers = { ...userState.answers, [question.id]: currentBools };
    onUpdateState({ answers: nextAnswers });
  };

  // Submit / Check Answer
  const handleCheckAnswer = () => {
    if (currentAnswer === undefined || currentAnswer === null) {
      setSelectionWarning('Silakan tentukan pilihan jawaban Anda terlebih dahulu sebelum memeriksa.');
      return;
    }
    if (Array.isArray(currentAnswer) && currentAnswer.length === 0) {
      setSelectionWarning('Silakan pilih minimal satu opsi jawaban sebelum memeriksa.');
      return;
    }
    setSelectionWarning(null);

    const score = calculateQuestionScore(question.type, currentAnswer, question.correctAnswer);
    const nextChecked = { ...userState.checked, [question.id]: true };
    const nextScores = { ...userState.scores, [question.id]: score };
    const nextDiscussion = { ...userState.showDiscussion, [question.id]: true };

    onUpdateState({
      checked: nextChecked,
      scores: nextScores,
      showDiscussion: nextDiscussion,
    });

    // Provide spoken feedback from Mister Jo
    speechManager.registerUserInteraction();
    if (score >= 0.99) {
      speechManager.speak(
        `Luar biasa! Jawaban Anda untuk soal nomor ${question.number} tepat sekali. Mari kita telaah pembahasannya.`
      );
    } else if (score > 0) {
      speechManager.speak(
        `Bagus! Anda memperoleh skor parsial ${score.toFixed(2)} pada soal nomor ${question.number}. Cermati pembahasannya untuk menyempurnakan konsep.`
      );
    } else {
      speechManager.speak(
        `Jangan berkecil hati. Mari kita pelajari bersama langkah pembahasannya agar semakin memahami konsep ini.`
      );
    }
    setActiveSpeechStep('explanation');
  };

  // Retry question
  const handleRetryQuestion = () => {
    const nextAnswers = { ...userState.answers };
    delete nextAnswers[question.id];

    const nextChecked = { ...userState.checked };
    delete nextChecked[question.id];

    const nextScores = { ...userState.scores };
    delete nextScores[question.id];

    const nextDiscussion = { ...userState.showDiscussion };
    delete nextDiscussion[question.id];

    onUpdateState({
      answers: nextAnswers,
      checked: nextChecked,
      scores: nextScores,
      showDiscussion: nextDiscussion,
    });

    speechManager.speak(`Baik, mari kita ulangi soal nomor ${question.number}. Silakan coba kembali.`);
    setActiveSpeechStep('intro');
  };

  // Bookmark toggle
  const handleToggleFlag = () => {
    const nextFlagged = { ...userState.flagged, [question.id]: !isFlagged };
    onUpdateState({ flagged: nextFlagged });
  };

  // Navigation
  const handlePrev = () => {
    if (question.id > 1) {
      onSelectQuestion(question.id - 1);
    }
  };

  const handleNext = () => {
    if (question.id < allQuestions.length) {
      onSelectQuestion(question.id + 1);
    } else {
      onFinishQuiz();
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Question Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-teal-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-900 text-sm font-black text-amber-300 shadow-sm">
            #{question.number}
          </div>
          <span className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800 uppercase border border-teal-200">
            {question.element}
          </span>
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
            {question.type === 'pg'
              ? 'Pilihan Ganda'
              : question.type === 'kecukupan'
              ? 'Analisis Kecukupan Data'
              : question.type === 'kompleks'
              ? 'Pilihan Ganda Kompleks'
              : 'Benar / Salah'}
          </span>
          <span
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold border ${
              question.difficulty === 'menengah'
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : question.difficulty === 'sulit'
                ? 'bg-amber-50 text-amber-900 border-amber-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            Tingkat {question.difficulty.replace('_', ' ')}
          </span>
        </div>

        {/* Action Controls: Flag & Navigator Drawer Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleFlag}
            title={isFlagged ? 'Hapus Tanda' : 'Tandai Soal untuk Dipelajari Nanti'}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
              isFlagged
                ? 'border-amber-400 bg-amber-50 text-amber-900'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isFlagged ? 'Ditandai' : 'Tandai'}</span>
          </button>

          <button
            onClick={() => setShowQuestionGrid(!showQuestionGrid)}
            className="flex items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800 hover:bg-teal-100 transition"
          >
            <ListFilter className="h-4 w-4" />
            <span>Daftar 30 Soal</span>
          </button>
        </div>
      </div>

      {/* 30 Question Navigator Drawer */}
      {showQuestionGrid && (
        <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-4 shadow-inner">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-teal-950">
            <span>Navigasi Cepat 30 Soal TKA:</span>
            <div className="flex items-center gap-3 text-[11px] font-normal text-slate-600">
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-emerald-600"></span> Benar
              </span>
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-amber-500"></span> Parsial / Salah
              </span>
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-white border border-slate-300"></span> Belum
              </span>
            </div>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-15 gap-1.5">
            {allQuestions.map((q) => {
              const isCur = q.id === question.id;
              const hasChecked = Boolean(userState.checked[q.id]);
              const qScore = userState.scores[q.id] ?? 0;
              const hasFlag = Boolean(userState.flagged[q.id]);

              let btnBg = 'bg-white text-slate-700 border-slate-200 hover:border-teal-400';
              if (hasChecked) {
                if (qScore >= 0.99) {
                  btnBg = 'bg-emerald-600 text-white border-emerald-700';
                } else {
                  btnBg = 'bg-amber-500 text-white border-amber-600';
                }
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    onSelectQuestion(q.id);
                    setShowQuestionGrid(false);
                  }}
                  className={`relative flex h-8 items-center justify-center rounded-lg text-xs font-bold border transition ${btnBg} ${
                    isCur ? 'ring-2 ring-teal-500 ring-offset-1 font-black shadow-sm' : ''
                  }`}
                >
                  <span>{q.number}</span>
                  {hasFlag && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-400 border border-white"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Guided Voice Step Pills for Mister Jo */}
      <div className="rounded-2xl border border-teal-100 bg-white p-3 shadow-xs">
        <div className="mb-2 flex items-center justify-between text-xs font-bold text-teal-900">
          <span className="flex items-center gap-1.5">
            <Volume2 className="h-4 w-4 text-teal-600" />
            <span>Panduan Narasi Suara Mister Jo:</span>
          </span>
          <span className="text-[11px] font-normal text-teal-700 italic">
            Klik tombol di bawah untuk mendengarkan bimbingan bertahap
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 text-xs">
          <button
            onClick={() => playAudioSegment('intro', question.narration.intro)}
            className={`rounded-xl px-3 py-1 font-semibold transition ${
              activeSpeechStep === 'intro'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-teal-50 text-teal-900 hover:bg-teal-100 border border-teal-200'
            }`}
          >
            1. Pengantar
          </button>
          <button
            onClick={() => playAudioSegment('stimulus', question.narration.stimulus)}
            className={`rounded-xl px-3 py-1 font-semibold transition ${
              activeSpeechStep === 'stimulus'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-teal-50 text-teal-900 hover:bg-teal-100 border border-teal-200'
            }`}
          >
            2. Stimulus
          </button>
          <button
            onClick={() => playAudioSegment('hint', question.narration.hint)}
            className={`rounded-xl px-3 py-1 font-semibold transition ${
              activeSpeechStep === 'hint'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            3. Petunjuk Masalah
          </button>
          <button
            onClick={() => playAudioSegment('question', question.narration.question)}
            className={`rounded-xl px-3 py-1 font-semibold transition ${
              activeSpeechStep === 'question'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-teal-50 text-teal-900 hover:bg-teal-100 border border-teal-200'
            }`}
          >
            4. Pertanyaan
          </button>
          <button
            onClick={() => playAudioSegment('explanation', question.narration.explanation)}
            className={`rounded-xl px-3 py-1 font-semibold transition ${
              activeSpeechStep === 'explanation'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-teal-50 text-teal-900 hover:bg-teal-100 border border-teal-200'
            }`}
          >
            5. Pembahasan
          </button>
          <button
            onClick={() => playAudioSegment('quickTrick', question.narration.quickTrick)}
            className={`rounded-xl px-3 py-1 font-semibold transition ${
              activeSpeechStep === 'quickTrick'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            6. Cara Cepat
          </button>
          <button
            onClick={() => playAudioSegment('conclusion', question.narration.conclusion)}
            className={`rounded-xl px-3 py-1 font-semibold transition ${
              activeSpeechStep === 'conclusion'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-teal-50 text-teal-900 hover:bg-teal-100 border border-teal-200'
            }`}
          >
            7. Kesimpulan
          </button>
        </div>
      </div>

      {/* Stimulus & Question Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{question.title}</h2>
          <div className="mt-1 text-xs text-teal-800 font-medium">
            Submateri: {question.subtopic}
          </div>
        </div>

        {/* Stimulus Box */}
        <div className="rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-50/50 via-slate-50/50 to-white p-4 text-sm text-slate-800 leading-relaxed">
          <div className="mb-1 text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Stimulus Soal:</span>
          </div>
          <MathRenderer content={question.stimulus} />
        </div>

        {/* Diagram if available */}
        {question.diagram && <MathDiagram diagram={question.diagram} />}

        {/* Primary Question Prompt */}
        <div className="rounded-2xl border-l-4 border-amber-500 bg-amber-50/40 p-4 text-sm font-semibold text-slate-900 leading-relaxed">
          <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <FileQuestion className="h-4 w-4 text-amber-700" />
            <span>Pertanyaan Utama:</span>
          </div>
          <MathRenderer content={question.questionText} />
        </div>

        {/* Kecukupan Data Statements Box if kecukupan */}
        {question.type === 'kecukupan' && question.statement1 && question.statement2 && (
          <div className="space-y-2 rounded-2xl border border-teal-200 bg-teal-50/40 p-4 text-xs font-medium text-slate-800">
            <div className="rounded-xl bg-white p-3 border border-teal-100 shadow-2xs">
              <span className="font-bold text-teal-950 mr-2">Pernyataan (1):</span>
              <MathRenderer content={question.statement1} />
            </div>
            <div className="rounded-xl bg-white p-3 border border-teal-100 shadow-2xs">
              <span className="font-bold text-teal-950 mr-2">Pernyataan (2):</span>
              <MathRenderer content={question.statement2} />
            </div>
          </div>
        )}

        {/* Answer Selection Inputs */}
        <div className="pt-2">
          {/* TYPE 1: PG & KECUKUPAN */}
          {(question.type === 'pg' || question.type === 'kecukupan') && question.options && (
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-700 mb-1">Pilih Satu Jawaban:</div>
              {question.options.map((opt) => {
                const isSelected = currentAnswer === opt.id;
                let optBorder = 'border-slate-200 hover:border-teal-300 bg-white';

                if (isChecked) {
                  if (opt.id === question.correctAnswer) {
                    optBorder = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                  } else if (isSelected && opt.id !== question.correctAnswer) {
                    optBorder = 'border-rose-400 bg-rose-50 text-rose-950';
                  }
                } else if (isSelected) {
                  optBorder = 'border-teal-600 bg-teal-50/80 shadow-xs';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectRadio(opt.id)}
                    disabled={isChecked}
                    aria-label={`Opsi ${opt.id}`}
                    className={`w-full flex items-start gap-3 rounded-2xl border p-3.5 text-left text-sm transition ${optBorder}`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                        isSelected
                          ? 'bg-teal-700 text-white'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <div className="flex-1 text-slate-800 leading-snug">
                      <MathRenderer content={opt.text} />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* TYPE 2: PG KOMPLEKS (Checkboxes) */}
          {question.type === 'kompleks' && question.complexOptions && (
            <div className="space-y-2.5">
              <div className="rounded-xl bg-blue-50 p-2.5 text-xs font-medium text-blue-900 border border-blue-200">
                Instruksi: Pilihlah semua pernyataan yang Anda yakini bernilai BENAR (jawaban benar dapat lebih dari satu).
              </div>
              {question.complexOptions.map((opt) => {
                const currentSelected = Array.isArray(currentAnswer)
                  ? (currentAnswer as string[]).includes(opt.id)
                  : false;
                const isActuallyCorrect = (question.correctAnswer as string[]).includes(opt.id);

                let optBorder = 'border-slate-200 hover:border-teal-300 bg-white';
                if (isChecked) {
                  if (isActuallyCorrect) {
                    optBorder = 'border-emerald-500 bg-emerald-50 font-semibold';
                  } else if (currentSelected && !isActuallyCorrect) {
                    optBorder = 'border-rose-400 bg-rose-50';
                  }
                } else if (currentSelected) {
                  optBorder = 'border-teal-600 bg-teal-50/80 shadow-xs';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleToggleCheckbox(opt.id)}
                    disabled={isChecked}
                    className={`w-full flex items-start gap-3 rounded-2xl border p-3.5 text-left text-sm transition ${optBorder}`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold border ${
                        currentSelected
                          ? 'bg-teal-700 text-white border-teal-700'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      {currentSelected ? '✓' : opt.id}
                    </span>
                    <div className="flex-1 text-slate-800 leading-snug">
                      <MathRenderer content={opt.text} />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* TYPE 3: BENAR / SALAH (3 Statements) */}
          {question.type === 'benar_salah' && question.statements && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-700 mb-1">
                Tentukan nilai kebenaran untuk masing-masing pernyataan (BENAR atau SALAH):
              </div>
              {question.statements.map((stmt, idx) => {
                const userChoice = Array.isArray(currentAnswer)
                  ? (currentAnswer as boolean[])[idx]
                  : undefined;
                const correctChoice = stmt.isCorrect;

                return (
                  <div
                    key={stmt.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs"
                  >
                    <div className="flex items-start gap-2.5 text-sm text-slate-800 flex-1">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-teal-100 text-[11px] font-bold text-teal-900 mt-0.5">
                        {stmt.id}
                      </span>
                      <MathRenderer content={stmt.text} />
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {/* BENAR button */}
                      <button
                        onClick={() => handleSelectBenarSalah(idx, true)}
                        disabled={isChecked}
                        className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition border ${
                          userChoice === true
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50'
                        } ${
                          isChecked && correctChoice === true
                            ? 'ring-2 ring-emerald-500 font-black'
                            : ''
                        }`}
                      >
                        BENAR
                      </button>

                      {/* SALAH button */}
                      <button
                        onClick={() => handleSelectBenarSalah(idx, false)}
                        disabled={isChecked}
                        className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition border ${
                          userChoice === false
                            ? 'bg-rose-700 text-white border-rose-700'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-rose-50'
                        } ${
                          isChecked && correctChoice === false
                            ? 'ring-2 ring-emerald-500 font-black'
                            : ''
                        }`}
                      >
                        SALAH
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selection Warning Alert Banner */}
        {selectionWarning && (
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-xs font-semibold text-amber-900 border border-amber-300">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 text-amber-900 font-bold shrink-0">!</span>
            <span>{selectionWarning}</span>
          </div>
        )}

        {/* Primary Action Buttons: Check Answer, Cara Cepat, Rumus Kunci, Retry */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-slate-100 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            {!isChecked ? (
              <button
                onClick={handleCheckAnswer}
                className="flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-teal-800 transition"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Periksa Jawaban</span>
              </button>
            ) : (
              <button
                onClick={handleRetryQuestion}
                className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Ulangi Soal Ini</span>
              </button>
            )}

            <button
              onClick={() => {
                const nextState = { ...userState.showDiscussion, [question.id]: !isDiscussionOpen };
                onUpdateState({ showDiscussion: nextState });
              }}
              className="flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-xs font-semibold text-teal-800 hover:bg-teal-100 transition"
            >
              <BookOpen className="h-4 w-4" />
              <span>{isDiscussionOpen ? 'Tutup Pembahasan' : 'Pembahasan Lengkap'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRumusKunciModal(true)}
              className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 transition"
            >
              <Lightbulb className="h-4 w-4 text-amber-600" />
              <span>Rumus Kunci</span>
            </button>

            <button
              onClick={() => setShowCaraCepatModal(true)}
              className="flex items-center gap-1.5 rounded-xl border border-orange-300 bg-orange-50 px-3.5 py-2 text-xs font-bold text-orange-900 hover:bg-orange-100 transition"
            >
              <Zap className="h-4 w-4 text-orange-600" />
              <span>Cara Cepat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Post-Submission Result Feedback Banner */}
      {isChecked && (
        <div
          className={`rounded-2xl border p-5 shadow-sm transition-all ${
            currentScore >= 0.99
              ? 'border-emerald-300 bg-gradient-to-r from-emerald-50 via-teal-50/70 to-white'
              : currentScore > 0
              ? 'border-amber-300 bg-gradient-to-r from-amber-50 via-teal-50/70 to-white'
              : 'border-rose-300 bg-gradient-to-r from-rose-50 via-slate-50 to-white'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                  currentScore >= 0.99
                    ? 'bg-emerald-600 text-white'
                    : currentScore > 0
                    ? 'bg-amber-500 text-white'
                    : 'bg-rose-600 text-white'
                }`}
              >
                {currentScore >= 0.99 ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <XCircle className="h-6 w-6" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  {currentScore >= 0.99
                    ? 'Jawaban Anda Tepat Sekali! (Skor: 1.0)'
                    : currentScore > 0
                    ? `Jawaban Cukup Baik (Skor Parsial: ${currentScore.toFixed(2)})`
                    : 'Jawaban Belum Tepat (Skor: 0.0)'}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Kunci Jawaban:{' '}
                  <span className="font-bold text-slate-900">
                    {Array.isArray(question.correctAnswer)
                      ? question.correctAnswer
                          .map((val) => (typeof val === 'boolean' ? (val ? 'BENAR' : 'SALAH') : val))
                          .join(', ')
                      : question.correctAnswer}
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const nextState = { ...userState.showDiscussion, [question.id]: true };
                onUpdateState({ showDiscussion: nextState });
              }}
              className="rounded-xl bg-teal-800 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-teal-900 transition"
            >
              Lihat Pembahasan Lengkap ↓
            </button>
          </div>
        </div>
      )}

      {/* Systematic 8-Part Pembahasan Section */}
      {isDiscussionOpen && (
        <section className="rounded-3xl border border-teal-200 bg-white p-6 shadow-md space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-teal-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white font-bold text-xs">
                M·JO
              </div>
              <div>
                <h2 className="text-base font-black text-teal-950">
                  Pembahasan Terstruktur & Mendalam – Mister Jo
                </h2>
                <p className="text-xs text-slate-500">
                  Diuraikan secara sistematis dari pemahaman masalah hingga kesimpulan ilmiah
                </p>
              </div>
            </div>

            <button
              onClick={() => playAudioSegment('explanation', question.narration.explanation)}
              className="flex items-center gap-1.5 rounded-xl bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800 border border-teal-200 hover:bg-teal-100 transition"
            >
              <Volume2 className="h-4 w-4" />
              <span>Dengarkan Pembahasan</span>
            </button>
          </div>

          {/* A. Memahami Masalah */}
          <div className="space-y-1.5 text-sm">
            <div className="font-bold text-teal-900 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-teal-100 text-xs text-teal-800">A</span>
              <span>Memahami Masalah</span>
            </div>
            <div className="rounded-2xl bg-teal-50/40 p-4 text-xs text-slate-700 leading-relaxed border border-teal-100/70">
              <MathRenderer content={question.pembahasan.memahamiMasalah} />
            </div>
          </div>

          {/* B. Konsep yang Digunakan */}
          <div className="space-y-1.5 text-sm">
            <div className="font-bold text-teal-900 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-teal-100 text-xs text-teal-800">B</span>
              <span>Konsep yang Digunakan</span>
            </div>
            <div className="rounded-2xl bg-teal-50/40 p-4 text-xs text-slate-700 leading-relaxed border border-teal-100/70">
              <MathRenderer content={question.pembahasan.konsep} />
            </div>
          </div>

          {/* C. Rumus Kunci */}
          <div className="space-y-1.5 text-sm">
            <div className="font-bold text-amber-900 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-100 text-xs text-amber-900">C</span>
              <span>Rumus Kunci</span>
            </div>
            <div className="rounded-2xl bg-gradient-to-r from-amber-50/70 via-white to-amber-50/70 p-4 text-center border border-amber-200 shadow-inner">
              <MathRenderer content={question.pembahasan.rumusKunci} block />
            </div>
          </div>

          {/* D. Langkah Penyelesaian */}
          <div className="space-y-2 text-sm">
            <div className="font-bold text-teal-900 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-teal-100 text-xs text-teal-800">D</span>
              <span>Langkah Penyelesaian Sistematis</span>
            </div>
            <div className="space-y-2">
              {question.pembahasan.langkahPenyelesaian.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-xs text-slate-800 leading-relaxed"
                >
                  <div className="font-bold text-teal-900 text-xs mb-1">
                    Tahap {sIdx + 1}:
                  </div>
                  <MathRenderer content={step} />
                </div>
              ))}
            </div>
          </div>

          {/* E. Pemeriksaan Jawaban */}
          <div className="space-y-1.5 text-sm">
            <div className="font-bold text-teal-900 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-teal-100 text-xs text-teal-800">E</span>
              <span>Pemeriksaan Jawaban (Verifikasi Mandiri)</span>
            </div>
            <div className="rounded-2xl bg-emerald-50/40 p-4 text-xs text-slate-700 leading-relaxed border border-emerald-100">
              <MathRenderer content={question.pembahasan.pemeriksaan} />
            </div>
          </div>

          {/* F. Kesimpulan */}
          <div className="space-y-1.5 text-sm">
            <div className="font-bold text-teal-900 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-teal-100 text-xs text-teal-800">F</span>
              <span>Kesimpulan Akhir</span>
            </div>
            <div className="rounded-2xl bg-teal-900 p-4 text-xs font-bold text-amber-300 leading-relaxed shadow-sm">
              <MathRenderer content={question.pembahasan.kesimpulan} />
            </div>
          </div>

          {/* G. Cara Cepat */}
          <div className="space-y-1.5 text-sm">
            <div className="font-bold text-orange-900 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-orange-100 text-xs text-orange-900">G</span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-orange-600" />
                <span>Cara Cepat Mister Jo</span>
              </span>
            </div>
            <div className="rounded-2xl bg-orange-50/70 p-4 text-xs text-slate-800 leading-relaxed border border-orange-200">
              <MathRenderer content={question.pembahasan.caraCepat} />
            </div>
          </div>

          {/* H. Kesalahan Umum */}
          <div className="space-y-1.5 text-sm">
            <div className="font-bold text-rose-900 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded bg-rose-100 text-xs text-rose-900">H</span>
              <span>Kesalahan Umum / Jebakan Siswa</span>
            </div>
            <div className="rounded-2xl bg-rose-50/60 p-4 text-xs text-slate-700 leading-relaxed border border-rose-200">
              <MathRenderer content={question.pembahasan.kesalahanUmum} />
            </div>
          </div>
        </section>
      )}

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={handlePrev}
          disabled={question.id === 1}
          className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-30 transition"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Sebelumnya</span>
        </button>

        <div className="text-xs font-bold text-teal-900">
          Soal {question.number} dari {allQuestions.length}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 rounded-2xl bg-teal-800 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-teal-900 transition"
        >
          <span>{question.id === allQuestions.length ? 'Selesai & Lihat Rapor' : 'Berikutnya'}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Cara Cepat Modal */}
      {showCaraCepatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-teal-950/70 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-orange-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-orange-100 pb-3">
              <div className="flex items-center gap-2 font-black text-orange-950 text-base">
                <Zap className="h-5 w-5 text-orange-600" />
                <span>Cara Cepat Mister Jo – Soal #{question.number}</span>
              </div>
              <button
                onClick={() => setShowCaraCepatModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <div className="my-4 text-xs sm:text-sm text-slate-800 leading-relaxed bg-orange-50/60 p-4 rounded-2xl border border-orange-100">
              <MathRenderer content={question.pembahasan.caraCepat} />
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                onClick={() => playAudioSegment('quickTrick', question.narration.quickTrick)}
                className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-3.5 py-1.5 text-xs font-bold text-white shadow hover:bg-orange-700 transition"
              >
                <Volume2 className="h-4 w-4" />
                <span>Dengarkan Cara Cepat</span>
              </button>
              <button
                onClick={() => setShowCaraCepatModal(false)}
                className="rounded-xl border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rumus Kunci Modal */}
      {showRumusKunciModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-teal-950/70 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-amber-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div className="flex items-center gap-2 font-black text-amber-950 text-base">
                <Lightbulb className="h-5 w-5 text-amber-600" />
                <span>Rumus Kunci – Soal #{question.number}</span>
              </div>
              <button
                onClick={() => setShowRumusKunciModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <div className="my-4 rounded-2xl bg-amber-50/80 p-5 text-center border border-amber-200 shadow-inner">
              <MathRenderer content={question.pembahasan.rumusKunci} block />
            </div>
            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800">Pedoman Penggunaan:</span> Pastikan Anda memahami setiap variabel dan parameter dalam rumus sebelum melakukan substitusi angka.
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowRumusKunciModal(false)}
                className="rounded-xl bg-teal-800 px-4 py-1.5 text-xs font-bold text-white shadow hover:bg-teal-900 transition"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseView;
