import { getPuzzle, getDailyPuzzle, getLevelConfig } from '../src/data/proceduralPuzzles';
import { CHAPTERS, getChapterForLevel, getChapterIndexForLevel } from '../src/data/chapterData';
import { useGameStore } from '../src/store/gameStore';
import { GameEngine } from '../src/game/engine';

describe('Step 2: Content Scaling to 1000 Levels & 50 Thematic Chapters', () => {
  describe('Deterministic Procedural Generation', () => {
    it('returns the exact same puzzle structure on repeated calls for level 150', () => {
      const puzzle1 = getPuzzle(150);
      const puzzle2 = getPuzzle(150);

      expect(puzzle1.level).toBe(150);
      expect(puzzle2.level).toBe(150);
      expect(puzzle1.gridSize).toBe(puzzle2.gridSize);
      expect(puzzle1.solution).toEqual(puzzle2.solution);
      expect(puzzle1.regions).toEqual(puzzle2.regions);
      expect(puzzle1.difficulty).toBe(puzzle2.difficulty);
    });

    it('returns handcrafted levels for levels 1 to 100 without regression', () => {
      const lvl1 = getPuzzle(1);
      const lvl50 = getPuzzle(50);
      const lvl100 = getPuzzle(100);

      expect(lvl1.level).toBe(1);
      expect(lvl1.gridSize).toBe(4);
      expect(lvl50.level).toBe(50);
      expect(lvl100.level).toBe(100);
      expect(lvl100.gridSize).toBe(10);
    });

    it('generates valid puzzles across all difficulty and grid tiers (125, 250, 450, 650, 850, 950)', () => {
      const testLevels = [125, 250, 450, 650, 850, 950];

      for (const lvl of testLevels) {
        const puzzle = getPuzzle(lvl);
        const { gridSize, solution, regions } = puzzle;
        const quota = puzzle.puppiesPerUnit ?? 1;

        expect(puzzle.level).toBe(lvl);
        expect(solution.length).toBe(gridSize * quota);
        expect(regions.length).toBe(gridSize);

        // Every row/column holds exactly `quota` pups
        const rowCounts = new Map<number, number>();
        const colCounts = new Map<number, number>();
        for (const p of solution) {
          rowCounts.set(p.row, (rowCounts.get(p.row) || 0) + 1);
          colCounts.set(p.col, (colCounts.get(p.col) || 0) + 1);
        }
        expect(rowCounts.size).toBe(gridSize);
        expect(colCounts.size).toBe(gridSize);
        for (const count of rowCounts.values()) expect(count).toBe(quota);
        for (const count of colCounts.values()) expect(count).toBe(quota);

        // Check non-touching constraint (including diagonals)
        for (let i = 0; i < solution.length; i++) {
          for (let j = i + 1; j < solution.length; j++) {
            const dr = Math.abs(solution[i].row - solution[j].row);
            const dc = Math.abs(solution[i].col - solution[j].col);
            expect(dr <= 1 && dc <= 1).toBe(false);
          }
        }

        // No solution pup may sit on or touch a grumpy cat
        for (const cat of puzzle.cats ?? []) {
          for (const p of solution) {
            const dr = Math.abs(p.row - cat.row);
            const dc = Math.abs(p.col - cat.col);
            expect(dr <= 1 && dc <= 1).toBe(false);
          }
        }

        // Check full grid cell coverage
        const covered = new Set<string>();
        for (const region of regions) {
          for (const cell of region.cells) {
            covered.add(`${cell.row},${cell.col}`);
          }
        }
        expect(covered.size).toBe(gridSize * gridSize);

        // Check `quota` puppies per region
        const regionPuppyCount = new Map<number, number>();
        for (const pup of solution) {
          const reg = regions.find(r => r.cells.some(c => c.row === pup.row && c.col === pup.col));
          expect(reg).toBeDefined();
          regionPuppyCount.set(reg!.id, (regionPuppyCount.get(reg!.id) || 0) + 1);
        }
        for (const count of regionPuppyCount.values()) {
          expect(count).toBe(quota);
        }
      }
    });

    it('generates deterministic daily puzzle seeded by date', () => {
      const daily1 = getDailyPuzzle(20260909);
      const daily2 = getDailyPuzzle(20260909);

      expect(daily1.solution).toEqual(daily2.solution);
      expect(daily1.regions).toEqual(daily2.regions);
      expect(daily1.gridSize).toBeGreaterThanOrEqual(6);
    });
  });

  describe('50 Thematic Chapters Structure', () => {
    it('contains exactly 50 chapters covering levels 1 to 1000 seamlessly', () => {
      expect(CHAPTERS.length).toBe(50);
      expect(CHAPTERS[0].start).toBe(1);
      expect(CHAPTERS[CHAPTERS.length - 1].end).toBe(1000);

      // Verify no gaps and continuous intervals
      for (let i = 0; i < CHAPTERS.length; i++) {
        expect(CHAPTERS[i].id).toBe(i + 1);
        expect(CHAPTERS[i].end - CHAPTERS[i].start + 1).toBe(20);
        if (i > 0) {
          expect(CHAPTERS[i].start).toBe(CHAPTERS[i - 1].end + 1);
        }
      }
    });

    it('correctly maps levels to their corresponding chapter', () => {
      expect(getChapterForLevel(1).title).toBe('Sunny Backyard');
      expect(getChapterForLevel(20).id).toBe(1);
      expect(getChapterForLevel(21).id).toBe(2);
      expect(getChapterForLevel(500).id).toBe(25);
      expect(getChapterForLevel(1000).title).toBe('Jenny’s Sanctuary');
      expect(getChapterIndexForLevel(1000)).toBe(49);
    });
  });

  describe('GameStore 1000-Level Support', () => {
    it('allows starting level past 100 up to 1000', () => {
      const store = useGameStore.getState();
      store.startLevel(250);

      const state = useGameStore.getState();
      expect(state.currentLevel).toBe(250);
      expect(state.activeScreen).toBe('game');
      expect(state.board.gridSize).toBe(6);
      expect(state.board.regions.length).toBe(6);
    });

    it('clamps levels between 1 and 1000', () => {
      const store = useGameStore.getState();
      store.startLevel(1500);

      let state = useGameStore.getState();
      expect(state.currentLevel).toBe(1000);

      store.startLevel(-10);
      state = useGameStore.getState();
      expect(state.currentLevel).toBe(1);
    });
  });

  describe('Chapter Twist Mechanics (Levels 201+)', () => {
    it('introduces grumpy cats at levels 201-300', () => {
      const puzzle = getPuzzle(250);
      expect(puzzle.puppiesPerUnit ?? 1).toBe(1);
      expect((puzzle.cats ?? []).length).toBeGreaterThanOrEqual(1);

      // Cat cells are real cells on the board and untouchable
      const engine = new GameEngine(puzzle);
      const cat = puzzle.cats![0];
      expect(engine.getState().board.cells[cat.row][cat.col].value).toBe('cat');
      expect(engine.markCell(cat.row, cat.col)).toBe(false);
    });

    it('introduces linked (non-contiguous) beds at levels 301-400', () => {
      const puzzle = getPuzzle(350);
      const linked = puzzle.regions.filter(r => r.linked);
      expect(linked.length).toBeGreaterThanOrEqual(1);
    });

    it('introduces twin puppies at levels 601-800', () => {
      const puzzle = getPuzzle(650);
      expect(puzzle.puppiesPerUnit).toBe(2);
      expect(puzzle.solution.length).toBe(puzzle.gridSize * 2);

      // The twin solution must satisfy 2-per-unit + no touching via the engine
      const engine = new GameEngine(puzzle);
      for (const cell of puzzle.solution) {
        engine.placePuppy(cell.row, cell.col);
      }
      expect(engine.getState().isComplete).toBe(true);
    });

    it('chains cats + linked beds on 7x7 combo levels (401-600)', () => {
      const puzzle = getPuzzle(450);
      expect(puzzle.gridSize).toBe(7);
      expect(puzzle.puppiesPerUnit ?? 1).toBe(1);
      expect((puzzle.cats ?? []).length).toBeGreaterThanOrEqual(1);
      expect(puzzle.regions.filter(r => r.linked).length).toBeGreaterThanOrEqual(1);
    });
  });
});
