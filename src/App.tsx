/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewType, Navbar } from './components/Navbar';
import { MisterJoAssistant } from './components/MisterJoAssistant';
import { ResetModal } from './components/ResetModal';
import { DashboardView, OPENING_NARRATION } from './views/DashboardView';
import { PetaMateriView, PETA_MATERI_NARRATION } from './views/PetaMateriView';
import { PetunjukView, PETUNJUK_NARRATION } from './views/PetunjukView';
import { ExerciseView } from './views/ExerciseView';
import { ResultsView } from './views/ResultsView';
import {
  UserAnswerState,
  AudioSettings,
} from './types/quiz';
import {
  loadAnswerState,
  saveAnswerState,
  loadAudioSettings,
  saveAudioSettings,
  clearAllProgress,
  defaultAnswerState,
} from './utils/storage';
import { allQuestions } from './data/questions';
import { speechManager } from './utils/speech';

export function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [userState, setUserState] = useState<UserAnswerState>(loadAnswerState);
  const [audioSettings, setAudioSettings] = useState<AudioSettings>(loadAudioSettings);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(() => {
    const saved = loadAnswerState();
    return saved.lastQuestionId && saved.lastQuestionId >= 1 && saved.lastQuestionId <= 30
      ? saved.lastQuestionId
      : 1;
  });
  const [showResetModal, setShowResetModal] = useState(false);

  // Auto-save userState on changes
  useEffect(() => {
    saveAnswerState(userState);
  }, [userState]);

  // Auto-save audioSettings on changes
  useEffect(() => {
    saveAudioSettings(audioSettings);
    speechManager.setRate(audioSettings.rate);
    speechManager.setVolume(audioSettings.volume);
    if (audioSettings.voiceURI) {
      speechManager.setVoice(audioSettings.voiceURI);
    }
  }, [audioSettings]);

  // Support ?autostart=1 parameter for testing or direct jumping
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        setCurrentView('practice');
      }
      const qParam = params.get('q');
      if (qParam) {
        const parsedQ = parseInt(qParam, 10);
        if (parsedQ >= 1 && parsedQ <= 30) {
          setCurrentQuestionId(parsedQ);
          setCurrentView('practice');
        }
      }
    }
  }, []);

  // Update user answer state
  const handleUpdateUserState = (updated: Partial<UserAnswerState>) => {
    setUserState((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // Update audio settings
  const handleUpdateAudioSettings = (updated: Partial<AudioSettings>) => {
    setAudioSettings((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // Navigation router with automatic voice guidance
  const handleNavigate = (view: ViewType, targetQuestionId?: number) => {
    speechManager.registerUserInteraction();
    setCurrentView(view);
    if (targetQuestionId) {
      setCurrentQuestionId(targetQuestionId);
      handleUpdateUserState({ lastQuestionId: targetQuestionId });
    }

    // Play contextual narration for the newly opened view if audio enabled
    if (audioSettings.enabled && speechManager.hasInteracted) {
      if (view === 'home') {
        speechManager.speak(OPENING_NARRATION);
      } else if (view === 'map') {
        speechManager.speak(PETA_MATERI_NARRATION);
      } else if (view === 'guide') {
        speechManager.speak(PETUNJUK_NARRATION);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectQuestion = (questionId: number) => {
    setCurrentQuestionId(questionId);
    handleUpdateUserState({ lastQuestionId: questionId });
    setCurrentView('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset progress confirmation handler
  const handleConfirmReset = () => {
    clearAllProgress();
    setUserState(defaultAnswerState);
    setCurrentQuestionId(1);
    setCurrentView('home');
    speechManager.speak(
      'Seluruh progres latihan Anda telah direset. Silakan mulai kembali belajar bersama Mister Jo.'
    );
  };

  const completedCount = Object.keys(userState.checked).filter(
    (id) => userState.checked[Number(id)]
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-300 selection:text-teal-950">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        completedCount={completedCount}
        totalCount={allQuestions.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6">
        {/* Floating/Pinned Mister Jo Assistant Bar */}
        <MisterJoAssistant
          audioSettings={audioSettings}
          onUpdateAudioSettings={handleUpdateAudioSettings}
          onAutoplayUnlock={() => {
            if (currentView === 'home') {
              speechManager.speak(OPENING_NARRATION);
            }
          }}
        />

        {/* View Switcher */}
        {currentView === 'home' && (
          <DashboardView
            userState={userState}
            onNavigate={handleNavigate}
            onRequestReset={() => setShowResetModal(true)}
          />
        )}

        {currentView === 'map' && (
          <PetaMateriView
            userState={userState}
            onNavigateToQuestion={handleSelectQuestion}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'practice' && (
          <ExerciseView
            currentQuestionId={currentQuestionId}
            userState={userState}
            onUpdateState={handleUpdateUserState}
            onSelectQuestion={handleSelectQuestion}
            onFinishQuiz={() => handleNavigate('results')}
          />
        )}

        {currentView === 'guide' && <PetunjukView />}

        {currentView === 'results' && (
          <ResultsView
            userState={userState}
            onNavigateToQuestion={handleSelectQuestion}
            onNavigate={handleNavigate}
            onRequestReset={() => setShowResetModal(true)}
          />
        )}
      </main>

      {/* Academic Footer with Subtle Batik Accent */}
      <footer className="mt-auto border-t border-teal-900/10 bg-teal-950 text-teal-100 py-8 px-4 text-xs">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="h-8 w-8 rounded-lg bg-amber-400 flex items-center justify-center font-black text-teal-950">
              MJ
            </div>
            <div>
              <div className="font-bold text-white tracking-wide">
                TKA MATEMATIKA TINGKAT LANJUT 2026 – MISTER JO
              </div>
              <div className="text-[11px] text-teal-300">
                "Berpikir Cerdas, Bernalar Tajam, Menaklukkan Matematika!"
              </div>
            </div>
          </div>

          <div className="text-center sm:text-right text-[11px] text-teal-300/80">
            <div>30 Soal HOTS: Aljabar • Geometri & Pengukuran • Kalkulus</div>
            <div>Web Speech API Bahasa Indonesia • KaTeX Mathematical Engine • Offline-First</div>
          </div>
        </div>
      </footer>

      {/* Reset Confirmation Modal */}
      <ResetModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}

export default App;
