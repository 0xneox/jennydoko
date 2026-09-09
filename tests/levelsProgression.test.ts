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

  it('verifies concept progression stages', () => {
    // Levels 3–4: 4x4, Single-cell colour
    for (let l = 3; l <= 4; l++) {
      const p = puzzles[l - 1];
      expect(p.gridSize).toBe(4);
      expect(p.techniquesRequired).toContain('single_cell_colour');
    }

    // Levels 5–7: 4x4 / 5x5, Colour unique in row
    expect(puzzles[4].gridSize).toBe(4);
    expect(puzzles[4].techniquesRequired).toContain('colour_unique_row');
    expect(puzzles[5].gridSize).toBe(5);
    expect(puzzles[5].techniquesRequired).toContain('colour_unique_row');
    expect(puzzles[6].gridSize).toBe(5);
    expect(puzzles[6].techniquesRequired).toContain('colour_unique_row');

    // Levels 8–10: 5x5, Colour unique in column
    for (let l = 8; l <= 10; l++) {
      const p = puzzles[l - 1];
      expect(p.gridSize).toBe(5);
      expect(p.techniquesRequired).toContain('colour_unique_column');
    }

    // Levels 11–13: 5x5 / 6x6, Combine row + column + colour
    expect(puzzles[10].gridSize).toBe(5);
    expect(puzzles[11].gridSize).toBe(6);
    expect(puzzles[12].gridSize).toBe(6);

    // Levels 14–16: 6x6, Stronger neighbour deductions and longer chains
    for (let l = 14; l <= 16; l++) {
      const p = puzzles[l - 1];
      expect(p.gridSize).toBe(6);
      expect(p.difficulty).toBe('hard');
    }

    // Levels 17–20: 6x6, Combine all learned techniques
    for (let l = 17; l <= 20; l++) {
      const p = puzzles[l - 1];
      expect(p.gridSize).toBe(6);
      expect(['hard', 'expert']).toContain(p.difficulty);
    }

    // Levels 21–25: 6x6 (hard)
    for (let l = 21; l <= 25; l++) {
      const p = puzzles[l - 1];
      expect(p.gridSize).toBe(6);
      expect(p.difficulty).toBe('hard');
    }

    // Levels 26–30: 7x7 (hard)
    for (let l = 26; l <= 30; l++) {
      const p = puzzles[l - 1];
      expect(p.gridSize).toBe(7);
      expect(p.difficulty).toBe('hard');
    }

    // Levels 31–35: 7x7 (expert)
    for (let l = 31; l <= 35; l++) {
      const p = puzzles[l - 1];
      expect(p.gridSize).toBe(7);
      expect(p.difficulty).toBe('expert');
    }

    // Levels 36–40: 8x8 (expert)
    for (let l = 36; l <= 40; l++) {
      const p = puzzles[l - 1];
      expect(p.gridSize).toBe(8);
      expect(p.difficulty).toBe('expert');
    }

    // Levels 41–45: 9x9 (expert)
    for (let l = 41; l <= 45; l++) {
      const p = puzzles[l - 1];
      expect(p.gridSize).toBe(9);
      expect(p.difficulty).toBe('expert');
    }

    // Levels 46–50: 10x10 (expert)
    for (let l = 46; l <= 50; l++) {
      const p = puzzles[l - 1];
      expect(p.gridSize).toBe(10);
      expect(p.difficulty).toBe('expert');
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

