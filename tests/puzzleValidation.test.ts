import { GameEngine } from '../src/game/engine';
import { level1, level2 } from '../src/data/puzzles';

describe('Puzzle Validation Tests', () => {
  describe('Level 1', () => {
    it('should have exactly one valid solution', () => {
      const engine = new GameEngine(level1);
      const solutionCount = engine.countValidSolutions();
      expect(solutionCount).toBe(1);
    });

    it('should validate the provided solution', () => {
      const engine = new GameEngine(level1);
      const isValid = engine.validateSolution(level1.solution);
      expect(isValid).toBe(true);
    });

    it('should have correct puzzle structure', () => {
      expect(level1.level).toBe(1);
      expect(level1.gridSize).toBe(4);
      expect(level1.regions).toHaveLength(4);
      expect(level1.solution).toHaveLength(4);
    });

    it('should have regions covering all cells', () => {
      const coveredCells = new Set<string>();
      for (const region of level1.regions) {
        for (const cell of region.cells) {
          coveredCells.add(`${cell.row},${cell.col}`);
        }
      }

      for (let row = 0; row < level1.gridSize; row++) {
        for (let col = 0; col < level1.gridSize; col++) {
          expect(coveredCells.has(`${row},${col}`)).toBe(true);
        }
      }
    });
  });

  describe('Level 2', () => {
    it('should have exactly one valid solution', () => {
      const engine = new GameEngine(level2);
      const solutionCount = engine.countValidSolutions();
      expect(solutionCount).toBe(1);
    });

    it('should validate the provided solution', () => {
      const engine = new GameEngine(level2);
      const isValid = engine.validateSolution(level2.solution);
      expect(isValid).toBe(true);
    });

    it('should have correct puzzle structure', () => {
      expect(level2.level).toBe(2);
      expect(level2.gridSize).toBe(5);
      expect(level2.regions).toHaveLength(5);
      expect(level2.solution).toHaveLength(5);
    });

    it('should have regions covering all cells', () => {
      const coveredCells = new Set<string>();
      for (const region of level2.regions) {
        for (const cell of region.cells) {
          coveredCells.add(`${cell.row},${cell.col}`);
        }
      }

      for (let row = 0; row < level2.gridSize; row++) {
        for (let col = 0; col < level2.gridSize; col++) {
          expect(coveredCells.has(`${row},${col}`)).toBe(true);
        }
      }
    });
  });
});
