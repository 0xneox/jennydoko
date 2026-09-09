import { DifficultyScorer } from '../src/game/difficultyScorer';
import { level1, level2 } from '../src/data/puzzles';

describe('DifficultyScorer', () => {
  describe('Difficulty Classification', () => {
    it('should classify Level 1 as beginner or easy', () => {
      const difficulty = DifficultyScorer.classifyDifficulty(level1);
      expect(['beginner', 'easy']).toContain(difficulty);
    });

    it('should classify Level 2 as easy or medium', () => {
      const difficulty = DifficultyScorer.classifyDifficulty(level2);
      expect(['easy', 'medium']).toContain(difficulty);
    });
  });

  describe('Difficulty Score Calculation', () => {
    it('should calculate a positive difficulty score', () => {
      const score = DifficultyScorer.calculateDifficultyScore(level1);
      expect(score).toBeGreaterThan(0);
    });

    it('should calculate higher score for larger grid', () => {
      const score1 = DifficultyScorer.calculateDifficultyScore(level1);
      const score2 = DifficultyScorer.calculateDifficultyScore(level2);
      expect(score2).toBeGreaterThan(score1);
    });
  });

  describe('Deduction Count Estimation', () => {
    it('should estimate deduction count for Level 1', () => {
      const count = DifficultyScorer.estimateDeductionCount(level1);
      expect(typeof count).toBe('number');
      expect(count).toBeGreaterThanOrEqual(0);
    });

    it('should estimate deduction count for Level 2', () => {
      const count = DifficultyScorer.estimateDeductionCount(level2);
      expect(typeof count).toBe('number');
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });
});