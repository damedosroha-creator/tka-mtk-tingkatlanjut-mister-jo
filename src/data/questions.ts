import { Question, ElementType, QuestionType } from '../types/quiz';
import { aljabarQuestions } from './questions/aljabar';
import { geometriQuestions } from './questions/geometri';
import { kalkulusQuestions } from './questions/kalkulus';

export const allQuestions: Question[] = [
  ...aljabarQuestions,
  ...geometriQuestions,
  ...kalkulusQuestions,
];

export function getQuestionById(id: number): Question | undefined {
  return allQuestions.find((q) => q.id === id);
}

export function getQuestionsByElement(element: ElementType): Question[] {
  return allQuestions.filter((q) => q.element === element);
}

export function getQuestionsByType(type: QuestionType): Question[] {
  return allQuestions.filter((q) => q.type === type);
}

// Master curriculum summary
export const curriculumOverview = {
  totalQuestions: 30,
  elements: {
    aljabar: {
      title: 'Aljabar',
      count: 10,
      description: 'Matriks 2x2 & 3x3, Polinomial Derajat ≤ 4, dan Karakteristik Fungsi.',
      color: 'from-emerald-700 to-teal-800',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    geometri: {
      title: 'Geometri dan Pengukuran',
      count: 10,
      description: 'Vektor 2D & 3D, Lingkaran (Garis Singgung & Juring/Tembereng), dan Transformasi Geometri.',
      color: 'from-teal-700 to-cyan-800',
      badge: 'bg-teal-100 text-teal-800 border-teal-300',
    },
    kalkulus: {
      title: 'Kalkulus',
      count: 10,
      description: 'Limit Fungsi Aljabar & Trigonometri Berbasis Pemfaktoran, Sekawan & Identitas (Tanpa L\'Hôpital).',
      color: 'from-cyan-800 to-blue-900',
      badge: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    },
  },
  questionTypeStats: {
    pg: { label: 'Pilihan Ganda Biasa', count: 12 },
    kecukupan: { label: 'Analisis Kecukupan Data', count: 6 },
    kompleks: { label: 'Pilihan Ganda Kompleks', count: 6 },
    benar_salah: { label: 'Benar atau Salah', count: 6 },
  },
  difficultyStats: {
    menengah: { label: 'Tingkat Menengah', count: 6 },
    sulit: { label: 'Tingkat Sulit', count: 12 },
    sangat_sulit: { label: 'Tingkat Sangat Sulit', count: 12 },
  },
};
