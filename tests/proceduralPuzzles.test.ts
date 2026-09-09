import { getPuzzle, getDailyPuzzle, getLevelConfig } from '../src/data/proceduralPuzzles';
import { CHAPTERS, getChapterForLevel, getChapterIndexForLevel } from '../src/data/chapterData';
import { useGameStore } from '../src/store/gameStore';

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

        expect(puzzle.level).toBe(lvl);
        expect(solution.length).toBe(gridSize);
        expect(regions.length).toBe(gridSize);

        // Check rows uniqueness
        const rows = new Set(solution.map(p => p.row));
        expect(rows.size).toBe(gridSize);

        // Check columns uniqueness
        const cols = new Set(solution.map(p => p.col));
        expect(cols.size).toBe(gridSize);

        // Check non-touching constraint (including diagonals)
        for (let i = 0; i < gridSize; i++) {
          for (let j = i + 1; j < gridSize; j++) {
            const dr = Math.abs(solution[i].row - solution[j].row);
            const dc = Math.abs(solution[i].col - solution[j].col);
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

        // Check 1 puppy per region
        const regionPuppyCount = new Map<number, number>();
        for (const pup of solution) {
          const reg = regions.find(r => r.cells.some(c => c.row === pup.row && c.col === pup.col));
          expect(reg).toBeDefined();
          regionPuppyCount.set(reg!.id, (regionPuppyCount.get(reg!.id) || 0) + 1);
        }
        for (const count of regionPuppyCount.values()) {
          expect(count).toBe(1);
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
});
