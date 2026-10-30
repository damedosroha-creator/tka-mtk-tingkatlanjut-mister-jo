import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Square,
  Settings2,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { speechManager, SpeechStatus } from '../utils/speech';
import { AudioSettings } from '../types/quiz';

interface MisterJoAssistantProps {
  audioSettings: AudioSettings;
  onUpdateAudioSettings: (newSettings: Partial<AudioSettings>) => void;
  onAutoplayUnlock?: () => void;
}

export const MisterJoAssistant: React.FC<MisterJoAssistantProps> = ({
  audioSettings,
  onUpdateAudioSettings,
  onAutoplayUnlock,
}) => {
  const [speechStatus, setSpeechStatus] = useState<SpeechStatus>(speechManager.getStatus());
  const [showSettings, setShowSettings] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showTranscript, setShowTranscript] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(speechManager.hasInteracted);

  useEffect(() => {
    const unsubscribe = speechManager.subscribe((status) => {
      setSpeechStatus(status);
    });

    const updateVoiceList = () => {
      setVoices(speechManager.getVoices());
    };
    updateVoiceList();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoiceList;
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const handleUserGesture = () => {
    speechManager.registerUserInteraction();
    setHasUserInteracted(true);
    if (onAutoplayUnlock) onAutoplayUnlock();
  };

  const handleToggleMute = () => {
    handleUserGesture();
    const nextEnabled = !audioSettings.enabled;
    onUpdateAudioSettings({ enabled: nextEnabled });
    if (!nextEnabled) {
      speechManager.stop();
    }
  };

  const handlePlayPause = () => {
    handleUserGesture();
    if (speechStatus.isSpeaking && !speechStatus.isPaused) {
      speechManager.pause();
    } else if (speechStatus.isPaused) {
      speechManager.resume();
    } else {
      speechManager.replay();
    }
  };

  const handleStop = () => {
    speechManager.stop();
  };

  const handleReplay = () => {
    handleUserGesture();
    speechManager.replay();
  };

  const handleRateChange = (rate: number) => {
    onUpdateAudioSettings({ rate });
    speechManager.setRate(rate);
  };

  const handleVoiceChange = (voiceURI: string) => {
    onUpdateAudioSettings({ voiceURI });
    speechManager.setVoice(voiceURI);
  };

  return (
    <aside aria-label="Asisten Belajar Mister Jo" className="sticky top-16 z-40 mb-4 rounded-2xl border border-teal-200/80 bg-white/95 p-3.5 shadow-md backdrop-blur-md transition-all">
      {/* Autoplay unlock notice if user hasn't clicked anything yet */}
      {!hasUserInteracted && audioSettings.enabled && (
        <div className="mb-2.5 flex items-center justify-between gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-900 border border-amber-200">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
            <span>Aktifkan panduan suara interaktif Mister Jo untuk pengalaman belajar optimal.</span>
          </div>
          <button
            onClick={handleUserGesture}
            className="rounded-lg bg-amber-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-amber-700 transition"
          >
            Aktifkan Suara
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Mister Jo Profile & Status */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-800 text-white font-bold shadow-sm border border-amber-300/40">
              <span className="text-sm tracking-tight font-serif">M·JO</span>
            </div>
            {speechStatus.isSpeaking && !speechStatus.isPaused && (
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-teal-950">MISTER JO</h2>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-900 border border-amber-300">
                Guru Pendamping TKA
              </span>
            </div>
            <p className="text-xs text-teal-800/80">
              {speechStatus.isSpeaking
                ? speechStatus.isPaused
                  ? 'Narasi sedang dijeda...'
                  : 'Sedang membimbing...'
                : 'Siap membimbing penalaran Anda'}
            </p>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Play / Pause */}
          <button
            onClick={handlePlayPause}
            disabled={!audioSettings.enabled}
            title={speechStatus.isSpeaking && !speechStatus.isPaused ? 'Jeda Narasi' : 'Putar Narasi'}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white shadow hover:bg-teal-800 disabled:opacity-40 transition"
          >
            {speechStatus.isSpeaking && !speechStatus.isPaused ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 ml-0.5" />
            )}
          </button>

          {/* Replay */}
          <button
            onClick={handleReplay}
            disabled={!audioSettings.enabled}
            title="Ulangi Narasi"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-teal-800 hover:bg-teal-100 disabled:opacity-40 transition"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {/* Stop */}
          <button
            onClick={handleStop}
            disabled={!speechStatus.isSpeaking}
            title="Hentikan Narasi"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 disabled:opacity-30 transition"
          >
            <Square className="h-3.5 w-3.5 fill-current" />
          </button>

          {/* Mute/Unmute toggle */}
          <button
            onClick={handleToggleMute}
            title={audioSettings.enabled ? 'Bisukan Suara' : 'Nyalakan Suara'}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
              audioSettings.enabled
                ? 'border-teal-200 bg-teal-50 text-teal-800 hover:bg-teal-100'
                : 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            {audioSettings.enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Settings Toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            title="Pengaturan Suara"
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
              showSettings ? 'border-amber-400 bg-amber-50 text-amber-900' : 'border-teal-200 bg-teal-50 text-teal-800 hover:bg-teal-100'
            }`}
          >
            <Settings2 className="h-4 w-4" />
          </button>

          {/* Transcript Toggle */}
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            title="Tampilkan / Sembunyikan Teks Bimbingan"
            className="flex h-9 items-center gap-1 rounded-xl border border-teal-200 bg-teal-50/70 px-2.5 text-xs font-medium text-teal-800 hover:bg-teal-100 transition"
          >
            <span>Teks</span>
            {showTranscript ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Spoken Text Transcription Card */}
      {showTranscript && speechStatus.currentText && (
        <div className="mt-2.5 rounded-xl border border-teal-100 bg-gradient-to-r from-teal-50/90 to-emerald-50/80 p-2.5 text-xs text-teal-950 shadow-inner">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 inline-block h-2 w-2 rounded-full bg-emerald-600 shrink-0"></span>
            <div className="italic leading-relaxed">
              "{speechStatus.currentText}"
            </div>
          </div>
        </div>
      )}

      {/* Expanded Audio Settings Panel */}
      {showSettings && (
        <div className="mt-3 grid grid-cols-1 gap-3 border-t border-teal-100 pt-3 text-xs sm:grid-cols-2">
          {/* Speed / Rate control */}
          <div>
            <label className="mb-1 block font-semibold text-teal-900">Kecepatan Bicara</label>
            <div className="flex items-center gap-1.5">
              {[0.8, 1.0, 1.2, 1.4].map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleRateChange(speed)}
                  className={`rounded-lg px-2.5 py-1 font-medium transition ${
                    audioSettings.rate === speed
                      ? 'bg-teal-700 text-white shadow-sm'
                      : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Voice selector */}
          <div>
            <label className="mb-1 block font-semibold text-teal-900">
              Pilihan Suara ({voices.length > 0 ? `${voices.length} terdeteksi` : 'Standar'})
            </label>
            <select
              value={audioSettings.voiceURI || ''}
              onChange={(e) => handleVoiceChange(e.target.value)}
              className="w-full rounded-lg border border-teal-200 bg-white px-2 py-1.5 text-xs text-teal-900 focus:border-teal-500 focus:outline-none"
            >
              <option value="">Otomatis (Prioritas Bahasa Indonesia / id-ID)</option>
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </aside>
  );
};

export default MisterJoAssistant;
