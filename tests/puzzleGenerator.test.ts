import { PuzzleGenerator } from '../src/game/puzzleGenerator';

describe('PuzzleGenerator', () => {
  describe('Puzzle Generation Architecture', () => {
    it('should have generatePuzzle method', () => {
      expect(typeof PuzzleGenerator.generatePuzzle).toBe('function');
    });

    it('should have attemptPuzzleGeneration method', () => {
      expect(typeof PuzzleGenerator['attemptPuzzleGeneration']).toBe('function');
    });

    it('should have generateRegions method', () => {
      expect(typeof PuzzleGenerator['generateRegions']).toBe('function');
    });
  });

  describe('Method Existence', () => {
    it('should have validation methods', () => {
      expect(typeof PuzzleGenerator['validatePuzzle']).toBe('function');
      expect(typeof PuzzleGenerator['evaluatePuzzleQuality']).toBe('function');
    });
  });
});