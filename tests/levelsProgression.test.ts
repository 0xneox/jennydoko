import { puzzles } from '../src/data/puzzles';
import { verifyPuzzle } from '../src/utils/puzzleVerifier';
import { GameEngine } from '../src/game/engine';

describe('Levels 1-100 Continuous Difficulty Progression', () => {
  it('contains all 100 levels in the puzzles list', () => {
    expect(puzzles).toHaveLength(100);
    puzzles.forEach((puzzle, idx) => {
      expect(puzzle.level).toBe(idx + 1);
    });
  });

  describe.each(puzzles.map(p => [p.level, p]))('Level %i Verification', (level, puzzle) => {
    it(`Level ${level} has all required fields stored`, () => {
      expect(puzzle.level).toBe(level);
      expect([4, 5, 6, 7, 8, 9, 10]).toContain(puzzle.gridSize);
      expect(puzzle.regions.length).toBe(puzzle.gridSize);
      expect(puzzle.solution.length).toBe(puzzle.gridSize);
      expect(['beginner', 'easy', 'medium', 'hard', 'expert', 'master', 'legend']).toContain(puzzle.difficulty);
      expect(puzzle.techniquesRequired.length).toBeGreaterThanOrEqual(1);
      expect(puzzle.hasLogicalStart).toBe(true);
      expect(puzzle.startingDeduction).toBeDefined();
      expect(typeof puzzle.estimatedSolvingSteps).toBe('number');
    });

    it(`Level ${level} has contiguous regions covering all cells`, () => {
      const ver = verifyPuzzle(puzzle);
      expect(ver.allConnected).toBe(true);
      expect(ver.allCovered).toBe(true);
    });

    it(`Level ${level} has exactly one unique valid solution`, () => {
      const ver = verifyPuzzle(puzzle);
      expect(ver.validSolution).toBe(true);
      expect(ver.unique).toBe(true);
    });

    it(`Level ${level} is solvable logically without guessing from the start`, () => {
      const ver = verifyPuzzle(puzzle);
      expect(ver.hasStart).toBe(true);
      expect(ver.firstDeduction).toBeDefined();
    });
  });

  it('ramps grid size monotonically across the campaign', () => {
    // No sawtooth: grid size must never decrease between consecutive levels
    for (let l = 2; l <= 100; l++) {
      expect(puzzles[l - 1].gridSize).toBeGreaterThanOrEqual(puzzles[l - 2].gridSize);
    }
  });

  it('verifies grid size progression tiers', () => {
    const expectTier = (from: number, to: number, size: number) => {
      for (let l = from; l <= to; l++) {
        expect(puzzles[l - 1].gridSize).toBe(size);
      }
    };

    expectTier(1, 4, 4);
    expectTier(5, 11, 5);
    expectTier(12, 35, 6);
    expectTier(36, 55, 7);
    expectTier(56, 70, 8);
    expectTier(71, 85, 9);
    expectTier(86, 100, 10);
  });

  it('verifies 10x10 puzzle integrity for levels 86-100', () => {
    for (let l = 86; l <= 100; l++) {
      const p = puzzles[l - 1];
      expect(p.gridSize).toBe(10);
      expect(p.solution).toHaveLength(10);
      expect(p.regions).toHaveLength(10);

      // Verify 10 dogs, 10 colours, 1 per row, 1 per col, 1 per colour, no neighbours (including diagonals)
      const rows = new Set<number>();
      const cols = new Set<number>();
      for (const dog of p.solution) {
        rows.add(dog.row);
        cols.add(dog.col);
      }
      expect(rows.size).toBe(10);
      expect(cols.size).toBe(10);

      // Check no neighbouring dogs in 8 directions
      for (let i = 0; i < p.solution.length; i++) {
        for (let j = i + 1; j < p.solution.length; j++) {
          const dRow = Math.abs(p.solution[i].row - p.solution[j].row);
          const dCol = Math.abs(p.solution[i].col - p.solution[j].col);
          expect(dRow <= 1 && dCol <= 1).toBe(false);
        }
      }

      // Check exactly 1 dog per region
      for (const region of p.regions) {
        const dogsInRegion = p.solution.filter(dog =>
          region.cells.some(c => c.row === dog.row && c.col === dog.col)
        );
        expect(dogsInRegion.length).toBe(1);
      }
    }
  });
});

