import { UserAnswerState, AudioSettings } from '../types/quiz';

const STORAGE_KEY_STATE = 'tka_mister_jo_state_2026';
const STORAGE_KEY_AUDIO = 'tka_mister_jo_audio_2026';

export const defaultAnswerState: UserAnswerState = {
  answers: {},
  checked: {},
  scores: {},
  flagged: {},
  showDiscussion: {},
  lastQuestionId: 1,
};

export const defaultAudioSettings: AudioSettings = {
  enabled: true,
  autoPlay: true,
  rate: 1.0,
  volume: 1.0,
  voiceURI: null,
};

export function loadAnswerState(): UserAnswerState {
  if (typeof window === 'undefined') return defaultAnswerState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STATE);
    if (!raw) return defaultAnswerState;
    const parsed = JSON.parse(raw);
    return {
      answers: parsed.answers ?? {},
      checked: parsed.checked ?? {},
      scores: parsed.scores ?? {},
      flagged: parsed.flagged ?? {},
      showDiscussion: parsed.showDiscussion ?? {},
      lastQuestionId: typeof parsed.lastQuestionId === 'number' ? parsed.lastQuestionId : 1,
    };
  } catch (e) {
    console.warn('Failed to load answer state from localStorage:', e);
    return defaultAnswerState;
  }
}

export function saveAnswerState(state: UserAnswerState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save answer state to localStorage:', e);
  }
}

export function loadAudioSettings(): AudioSettings {
  if (typeof window === 'undefined') return defaultAudioSettings;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUDIO);
    if (!raw) return defaultAudioSettings;
    const parsed = JSON.parse(raw);
    return {
      enabled: parsed.enabled ?? true,
      autoPlay: parsed.autoPlay ?? true,
      rate: typeof parsed.rate === 'number' ? parsed.rate : 1.0,
      volume: typeof parsed.volume === 'number' ? parsed.volume : 1.0,
      voiceURI: parsed.voiceURI ?? null,
    };
  } catch {
    return defaultAudioSettings;
  }
}

export function saveAudioSettings(settings: AudioSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_AUDIO, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save audio settings:', e);
  }
}

export function clearAllProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY_STATE);
  } catch (e) {
    console.warn('Failed to clear progress:', e);
  }
}
