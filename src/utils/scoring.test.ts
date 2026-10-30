import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateQuestionScore, calculateFinalGrade, getMasteryCategory } from './scoring';

test('scoring PG question', () => {
  assert.equal(calculateQuestionScore('pg', 'A', 'A'), 1);
  assert.equal(calculateQuestionScore('pg', 'a', 'A'), 1);
  assert.equal(calculateQuestionScore('pg', 'B', 'A'), 0);
  assert.equal(calculateQuestionScore('pg', undefined, 'A'), 0);
});

test('scoring Kecukupan Pernyataan', () => {
  assert.equal(calculateQuestionScore('kecukupan', 'C', 'C'), 1);
  assert.equal(calculateQuestionScore('kecukupan', 'D', 'C'), 0);
});

test('scoring PG Kompleks with partial credits', () => {
  const correct = ['A', 'C', 'E'];
  // All correct
  assert.equal(calculateQuestionScore('kompleks', ['A', 'C', 'E'], correct), 1);
  assert.equal(calculateQuestionScore('kompleks', ['E', 'A', 'C'], correct), 1);

  // Partial: 2 correct, 0 wrong -> 2 / 3
  const score2 = calculateQuestionScore('kompleks', ['A', 'C'], correct);
  assert.ok(score2 > 0.6 && score2 < 0.7);

  // Picked 2 correct + 1 wrong -> penalty applied
  const scoreWithPenalty = calculateQuestionScore('kompleks', ['A', 'C', 'B'], correct);
  assert.ok(scoreWithPenalty < score2);

  // Nothing selected
  assert.equal(calculateQuestionScore('kompleks', [], correct), 0);
});

test('scoring Benar/Salah (1/3 point per statement)', () => {
  const correct = [true, false, true];
  assert.equal(calculateQuestionScore('benar_salah', [true, false, true], correct), 1);
  assert.equal(calculateQuestionScore('benar_salah', [true, true, true], correct), 0.667);
  assert.equal(calculateQuestionScore('benar_salah', [false, true, false], correct), 0);
});

test('calculating final grade and category', () => {
  assert.equal(calculateFinalGrade(30, 30), 100);
  assert.equal(calculateFinalGrade(24, 30), 80);
  assert.equal(calculateFinalGrade(15, 30), 50);

  assert.equal(getMasteryCategory(95).category, 'Sangat Unggul');
  assert.equal(getMasteryCategory(84).category, 'Mahir');
  assert.equal(getMasteryCategory(72).category, 'Berkembang Baik');
  assert.equal(getMasteryCategory(63).category, 'Perlu Penguatan');
  assert.equal(getMasteryCategory(45).category, 'Perlu Pendampingan Intensif');
});
