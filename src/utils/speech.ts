/**
 * Speech synthesis manager for Mister Jo - TKA Matematika Tingkat Lanjut 2026.
 * Implements Web Speech API with Indonesian voice selection and queue management.
 */

export interface SpeechStatus {
  isSpeaking: boolean;
  isPaused: boolean;
  currentText: string;
  voiceName: string;
}

type SpeechListener = (status: SpeechStatus) => void;

class SpeechManager {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<SpeechListener> = new Set();
  private availableVoices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private currentText = '';
  private isSpeaking = false;
  private isPaused = false;
  private volume = 1;
  private rate = 1.0;
  private pitch = 1.0;
  private userHasInteracted = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  public registerUserInteraction() {
    this.userHasInteracted = true;
  }

  public get hasInteracted(): boolean {
    return this.userHasInteracted;
  }

  private loadVoices() {
    if (!this.synth) return;
    this.availableVoices = this.synth.getVoices();

    // Prefer Indonesian voices (id, id-ID, id_ID)
    const idVoice = this.availableVoices.find((v) =>
      v.lang.toLowerCase().startsWith('id')
    );

    if (idVoice) {
      this.selectedVoice = idVoice;
    } else {
      // Fallback: Indonesian-like or standard female/male clear voice
      const genericVoice =
        this.availableVoices.find((v) => v.lang.includes('en-ID')) ||
        this.availableVoices.find((v) => v.default) ||
        this.availableVoices[0] ||
        null;
      this.selectedVoice = genericVoice;
    }
    this.notify();
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.availableVoices;
  }

  public setVoice(voiceURI: string) {
    const v = this.availableVoices.find((voice) => voice.voiceURI === voiceURI);
    if (v) {
      this.selectedVoice = v;
      this.notify();
    }
  }

  public setRate(rate: number) {
    this.rate = Math.max(0.5, Math.min(2.0, rate));
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1.0, volume));
  }

  public subscribe(listener: SpeechListener): () => void {
    this.listeners.add(listener);
    listener(this.getStatus());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const status = this.getStatus();
    this.listeners.forEach((cb) => cb(status));
  }

  public getStatus(): SpeechStatus {
    return {
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
      currentText: this.currentText,
      voiceName: this.selectedVoice ? `${this.selectedVoice.name} (${this.selectedVoice.lang})` : 'Default Suara',
    };
  }

  /**
   * Speak a given text cleanly. Stops any ongoing narration before starting.
   */
  public speak(text: string, onEnd?: () => void) {
    this.stop();
    if (!text || text.trim() === '') return;

    // Clean KaTeX symbols from speech text to make it natural spoken Indonesian
    const cleanSpeech = text
      .replace(/\\lim_\{x\\to ([^}]+)\}/g, 'limit x mendekati $1')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 per $2')
      .replace(/\\sqrt\{([^}]+)\}/g, 'akar dari $1')
      .replace(/\\vec\{([^}]+)\}/g, 'vektor $1')
      .replace(/\\times/g, ' kali ')
      .replace(/\\cdot/g, ' kali ')
      .replace(/\\pm/g, ' plus minus ')
      .replace(/\\det/g, 'determinan ')
      .replace(/[\$\{\}\\]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    this.currentText = text;
    this.isSpeaking = true;
    this.isPaused = false;
    this.notify();

    if (!this.synth) {
      // Browser doesn't support Web Speech API
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(cleanSpeech);
      this.currentUtterance = utterance;

      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
        utterance.lang = this.selectedVoice.lang;
      } else {
        utterance.lang = 'id-ID';
      }

      utterance.rate = this.rate;
      utterance.pitch = this.pitch;
      utterance.volume = this.volume;

      utterance.onend = () => {
        this.isSpeaking = false;
        this.isPaused = false;
        this.currentUtterance = null;
        this.notify();
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        // Ignored or cancelled
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('Speech synthesis error:', e.error);
        }
        this.isSpeaking = false;
        this.isPaused = false;
        this.currentUtterance = null;
        this.notify();
      };

      this.synth.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis exception:', err);
      this.isSpeaking = false;
      this.isPaused = false;
      this.notify();
    }
  }

  public pause() {
    if (this.synth && this.isSpeaking && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.isSpeaking && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.notify();
  }

  public replay() {
    if (this.currentText) {
      this.speak(this.currentText);
    }
  }
}

export const speechManager = new SpeechManager();
