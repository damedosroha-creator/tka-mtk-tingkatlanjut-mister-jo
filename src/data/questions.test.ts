import test from 'node:test';
import assert from 'node:assert/strict';
import { allQuestions } from './questions';

test('dataset length is exactly 30 questions', () => {
  assert.equal(allQuestions.length, 30);
});

test('curriculum element distribution is strictly balanced (10 Aljabar, 10 Geometri, 10 Kalkulus)', () => {
  const aljabar = allQuestions.filter((q) => q.element === 'aljabar');
  const geometri = allQuestions.filter((q) => q.element === 'geometri');
  const kalkulus = allQuestions.filter((q) => q.element === 'kalkulus');

  assert.equal(aljabar.length, 10, 'Aljabar must have 10 questions');
  assert.equal(geometri.length, 10, 'Geometri must have 10 questions');
  assert.equal(kalkulus.length, 10, 'Kalkulus must have 10 questions');
});

test('question type distribution is strictly 12 PG, 6 Kecukupan, 6 Kompleks, 6 Benar/Salah', () => {
  const pg = allQuestions.filter((q) => q.type === 'pg');
  const kecukupan = allQuestions.filter((q) => q.type === 'kecukupan');
  const kompleks = allQuestions.filter((q) => q.type === 'kompleks');
  const benarSalah = allQuestions.filter((q) => q.type === 'benar_salah');

  assert.equal(pg.length, 12, 'Must have 12 PG');
  assert.equal(kecukupan.length, 6, 'Must have 6 Kecukupan');
  assert.equal(kompleks.length, 6, 'Must have 6 Kompleks');
  assert.equal(benarSalah.length, 6, 'Must have 6 Benar/Salah');

  // Verify proportional distribution across elements (4 PG, 2 Kecukupan, 2 Kompleks, 2 Benar/Salah per element)
  for (const el of ['aljabar', 'geometri', 'kalkulus']) {
    const elQuestions = allQuestions.filter((q) => q.element === el);
    assert.equal(elQuestions.filter((q) => q.type === 'pg').length, 4, `${el} must have 4 PG`);
    assert.equal(elQuestions.filter((q) => q.type === 'kecukupan').length, 2, `${el} must have 2 Kecukupan`);
    assert.equal(elQuestions.filter((q) => q.type === 'kompleks').length, 2, `${el} must have 2 Kompleks`);
    assert.equal(elQuestions.filter((q) => q.type === 'benar_salah').length, 2, `${el} must have 2 Benar/Salah`);
  }
});

test('difficulty distribution is strictly 6 Menengah, 12 Sulit, 12 Sangat Sulit', () => {
  const menengah = allQuestions.filter((q) => q.difficulty === 'menengah');
  const sulit = allQuestions.filter((q) => q.difficulty === 'sulit');
  const sangatSulit = allQuestions.filter((q) => q.difficulty === 'sangat_sulit');

  assert.equal(menengah.length, 6, 'Must have 6 Menengah');
  assert.equal(sulit.length, 12, 'Must have 12 Sulit');
  assert.equal(sangatSulit.length, 12, 'Must have 12 Sangat Sulit');
});

test('every question has complete structure, KaTeX formulas, and personalized audio narration', () => {
  for (const q of allQuestions) {
    assert.ok(q.id >= 1 && q.id <= 30);
    assert.ok(q.title.length > 5, `Question ${q.id} title too short`);
    assert.ok(q.stimulus.length > 20, `Question ${q.id} stimulus too short`);
    assert.ok(q.questionText.length > 10, `Question ${q.id} questionText too short`);

    // Pembahasan checks
    assert.ok(q.pembahasan.memahamiMasalah.length > 10, `Q${q.id} memahamiMasalah missing`);
    assert.ok(q.pembahasan.konsep.length > 10, `Q${q.id} konsep missing`);
    assert.ok(q.pembahasan.rumusKunci.length > 5, `Q${q.id} rumusKunci missing`);
    assert.ok(q.pembahasan.langkahPenyelesaian.length >= 2, `Q${q.id} langkahPenyelesaian missing`);
    assert.ok(q.pembahasan.kesimpulan.length > 5, `Q${q.id} kesimpulan missing`);
    assert.ok(q.pembahasan.caraCepat.length > 10, `Q${q.id} caraCepat missing`);
    assert.ok(q.pembahasan.kesalahanUmum.length > 10, `Q${q.id} kesalahanUmum missing`);

    // Narration checks
    assert.ok(q.narration.intro.length > 10, `Q${q.id} narration.intro missing`);
    assert.ok(q.narration.stimulus.length > 10, `Q${q.id} narration.stimulus missing`);
    assert.ok(q.narration.hint.length > 10, `Q${q.id} narration.hint missing`);
    assert.ok(q.narration.question.length > 10, `Q${q.id} narration.question missing`);
    assert.ok(q.narration.explanation.length > 10, `Q${q.id} narration.explanation missing`);
    assert.ok(q.narration.quickTrick.length > 10, `Q${q.id} narration.quickTrick missing`);
    assert.ok(q.narration.conclusion.length > 5, `Q${q.id} narration.conclusion missing`);

    // Type specifics
    if (q.type === 'pg' || q.type === 'kecukupan') {
      assert.ok(Array.isArray(q.options) && q.options.length === 5, `Q${q.id} options must have 5 items`);
      assert.ok(typeof q.correctAnswer === 'string', `Q${q.id} correct answer must be string`);
    } else if (q.type === 'kompleks') {
      assert.ok(Array.isArray(q.complexOptions) && q.complexOptions.length === 5, `Q${q.id} complexOptions must have 5 items`);
      assert.ok(Array.isArray(q.correctAnswer), `Q${q.id} correct answer must be array`);
    } else if (q.type === 'benar_salah') {
      assert.ok(Array.isArray(q.statements) && q.statements.length === 3, `Q${q.id} must have 3 statements`);
      assert.ok(Array.isArray(q.correctAnswer) && q.correctAnswer.length === 3, `Q${q.id} correct answer must be boolean array length 3`);
    }
  }
});
