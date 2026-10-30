import { QuestionType } from '../types/quiz';

/**
 * Evaluates the score (0 to 1) for a user answer on a single question.
 */
export function calculateQuestionScore(
  type: QuestionType,
  userAnswer: string | string[] | boolean[] | undefined,
  correctAnswer: string | string[] | boolean[]
): number {
  if (userAnswer === undefined || userAnswer === null) {
    return 0;
  }

  switch (type) {
    case 'pg':
    case 'kecukupan': {
      if (typeof userAnswer !== 'string' || typeof correctAnswer !== 'string') return 0;
      return userAnswer.trim().toUpperCase() === correctAnswer.trim().toUpperCase() ? 1 : 0;
    }

    case 'kompleks': {
      if (!Array.isArray(userAnswer) || !Array.isArray(correctAnswer)) return 0;
      const userList = (userAnswer as string[]).map((s) => s.trim().toUpperCase());
      const correctList = (correctAnswer as string[]).map((s) => s.trim().toUpperCase());

      if (correctList.length === 0) return 0;

      const userSet = new Set(userList);
      const correctSet = new Set(correctList);

      let correctChosen = 0;
      let wrongChosen = 0;

      for (const item of userSet) {
        if (correctSet.has(item)) {
          correctChosen++;
        } else {
          wrongChosen++;
        }
      }

      // Perfect match
      if (correctChosen === correctSet.size && wrongChosen === 0) {
        return 1;
      }

      // Partial credit: (correctChosen - wrongChosen) / totalCorrect, floored at 0
      const rawScore = (correctChosen - 0.5 * wrongChosen) / correctSet.size;
      return Math.max(0, Math.min(1, Number(rawScore.toFixed(3))));
    }

    case 'benar_salah': {
      if (!Array.isArray(userAnswer) || !Array.isArray(correctAnswer)) return 0;
      const userBools = userAnswer as boolean[];
      const correctBools = correctAnswer as boolean[];

      let count = 0;
      for (let i = 0; i < correctBools.length; i++) {
        if (userBools[i] === correctBools[i]) {
          count++;
        }
      }

      // Each statement is worth 1/3 point (total 3 statements = 1.0)
      const totalStatements = correctBools.length || 3;
      return Number((count / totalStatements).toFixed(3));
    }

    default:
      return 0;
  }
}

/**
 * Calculates total score out of 100 based on sum of question scores out of 30.
 */
export function calculateFinalGrade(totalObtainedScore: number, totalQuestions = 30): number {
  if (totalQuestions <= 0) return 0;
  const grade = (totalObtainedScore / totalQuestions) * 100;
  return Math.min(100, Math.max(0, Number(grade.toFixed(1))));
}

export type MasteryCategory =
  | 'Sangat Unggul'
  | 'Mahir'
  | 'Berkembang Baik'
  | 'Perlu Penguatan'
  | 'Perlu Pendampingan Intensif';

export function getMasteryCategory(grade: number): {
  category: MasteryCategory;
  color: string;
  badgeBg: string;
  description: string;
} {
  if (grade >= 90) {
    return {
      category: 'Sangat Unggul',
      color: 'text-emerald-700',
      badgeBg: 'bg-emerald-100 border-emerald-300 text-emerald-800',
      description: 'Penguasaan konsep dan penalaran matematis tingkat tinggi Anda sangat mengagumkan! Siap menaklukkan TKA dengan skor maksimal.',
    };
  }
  if (grade >= 80) {
    return {
      category: 'Mahir',
      color: 'text-teal-700',
      badgeBg: 'bg-teal-100 border-teal-300 text-teal-800',
      description: 'Kemampuan penalaran dan ketelitian numerik Anda berada di level mahir. Terus pertahankan kecepatan dan verifikasi mandiri.',
    };
  }
  if (grade >= 70) {
    return {
      category: 'Berkembang Baik',
      color: 'text-blue-700',
      badgeBg: 'bg-blue-100 border-blue-300 text-blue-800',
      description: 'Dasar konsep sudah solid, namun perlu peningkatan pada analisis bentuk soal kompleks dan optimasi cara cepat.',
    };
  }
  if (grade >= 60) {
    return {
      category: 'Perlu Penguatan',
      color: 'text-amber-700',
      badgeBg: 'bg-amber-100 border-amber-300 text-amber-800',
      description: 'Beberapa submateri inti membutuhkan penguatan pemahaman konsep dasar dan ketelitian aljabar serta manipulasi limit/vektor.',
    };
  }
  return {
    category: 'Perlu Pendampingan Intensif',
    color: 'text-rose-700',
    badgeBg: 'bg-rose-100 border-rose-300 text-rose-800',
    description: 'Sangat disarankan mengulang latihan dari stimulus, mempelajari rumus kunci, serta mendengarkan penjelasan audio bertahap Mister Jo.',
  };
}
