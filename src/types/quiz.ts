export type ElementType = 'aljabar' | 'geometri' | 'kalkulus';

export type QuestionType = 'pg' | 'kecukupan' | 'kompleks' | 'benar_salah';

export type DifficultyLevel = 'menengah' | 'sulit' | 'sangat_sulit';

export interface OptionItem {
  id: string; // 'A', 'B', 'C', 'D', 'E'
  text: string;
}

export interface StatementItem {
  id: number; // 1, 2, 3
  text: string;
  isCorrect: boolean; // true = BENAR, false = SALAH
}

export interface DiagramConfig {
  type: 'vector_2d' | 'vector_3d' | 'circle_tangent' | 'circle_sector' | 'matrix_grid' | 'function_graph' | 'limit_graph' | 'transformation_plane';
  title?: string;
  params: Record<string, any>;
}

export interface Pembahasan {
  memahamiMasalah: string;
  konsep: string;
  rumusKunci: string;
  langkahPenyelesaian: string[];
  pemeriksaan: string;
  kesimpulan: string;
  caraCepat: string;
  kesalahanUmum: string;
}

export interface QuestionNarration {
  intro: string;
  stimulus: string;
  hint: string;
  question: string;
  explanation: string;
  quickTrick: string;
  conclusion: string;
}

export interface Question {
  id: number; // 1 to 30
  number: number;
  element: ElementType;
  subtopic: string;
  difficulty: DifficultyLevel;
  type: QuestionType;
  title: string;
  stimulus: string;
  diagram?: DiagramConfig;
  questionText: string;
  options?: OptionItem[]; // For pg and kecukupan
  complexOptions?: OptionItem[]; // For kompleks (5 options, checkboxes)
  statements?: StatementItem[]; // For benar_salah (3 statements)
  statement1?: string; // For kecukupan
  statement2?: string; // For kecukupan
  correctAnswer: string | string[] | boolean[]; // 'A'-'E' for pg/kecukupan, string[] for kompleks, boolean[] for benar_salah
  pembahasan: Pembahasan;
  narration: QuestionNarration;
}

export interface UserAnswerState {
  answers: Record<number, string | string[] | boolean[]>; // questionId -> answer
  checked: Record<number, boolean>;
  scores: Record<number, number>; // 0 to 1
  flagged: Record<number, boolean>;
  showDiscussion: Record<number, boolean>;
  lastQuestionId: number;
}

export interface AudioSettings {
  enabled: boolean;
  autoPlay: boolean;
  rate: number; // 0.8 to 1.4
  volume: number; // 0 to 1
  voiceURI: string | null;
}
