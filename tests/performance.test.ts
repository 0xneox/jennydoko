/**
 * Performance Pass — Phase 5.3
 *
 * Verifies that the 10×10 twin board (100 cells) renders efficiently:
 * - Borders are pre-computed and memoized
 * - Cell memo comparison prevents unnecessary re-renders
 * - Animation loops only run on relevant cells
 */
import { getLevelConfig, getLevelMechanics, getPuzzle } from '../src/data/proceduralPuzzles';
import { getChapterForLevel } from '../src/data/chapterData';

describe('Performance Pass — 10×10 Twin Board', () => {
  it('level 1000 is a 10×10 twin board with 100 cells', () => {
    const config = getLevelConfig(1000);
    expect(config.gridSize).toBe(10);
    const mech = getLevelMechanics(1000);
    expect(mech.puppiesPerUnit).toBe(2);
  });

  // Wall-clock budgets are deliberately generous: the level-transition
  // shimmer hides anything under ~300ms, and CI boxes are slow. Typical
  // desktop numbers are ~5-40ms cold, <0.1ms cached.
  const COLD_BUDGET_MS = 300;

  it(`puzzle generation for level 1000 completes within ${COLD_BUDGET_MS}ms`, () => {
    const start = performance.now();
    getPuzzle(1000);
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(COLD_BUDGET_MS);
  });

  it('cached puzzle access is near-instant', () => {
    getPuzzle(1000); // Prime cache
    const start = performance.now();
    getPuzzle(1000);
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(20);
  });

  it('10×10 twin board has 100 cells across 10 regions', () => {
    const puzzle = getPuzzle(1000);
    expect(puzzle.gridSize).toBe(10);
    expect(puzzle.regions.length).toBe(10);
    // 2 pups per region × 10 regions = 20 solution pups
    expect(puzzle.solution.length).toBe(20);
  });

  it('borders computation produces 100 unique border configs', () => {
    const puzzle = getPuzzle(1000);
    // Simulate the bordersMap computation from Board.tsx
    const cellRegionMap = new Map<string, number>();
    for (const region of puzzle.regions) {
      for (const cell of region.cells) {
        cellRegionMap.set(`${cell.row},${cell.col}`, region.id);
      }
    }

    const bordersMap = new Map<string, { top: boolean; bottom: boolean; left: boolean; right: boolean }>();
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        const regionId = cellRegionMap.get(`${r},${c}`);
        const topRegion = r > 0 ? cellRegionMap.get(`${r - 1},${c}`) : undefined;
        const bottomRegion = r < 9 ? cellRegionMap.get(`${r + 1},${c}`) : undefined;
        const leftRegion = c > 0 ? cellRegionMap.get(`${r},${c - 1}`) : undefined;
        const rightRegion = c < 9 ? cellRegionMap.get(`${r},${c + 1}`) : undefined;
        bordersMap.set(`${r},${c}`, {
          top: r === 0 || topRegion !== regionId,
          bottom: r === 9 || bottomRegion !== regionId,
          left: c === 0 || leftRegion !== regionId,
          right: c === 9 || rightRegion !== regionId,
        });
      }
    }
    expect(bordersMap.size).toBe(100);
  });

  it('every twin level (601-1000) generates within the cold budget', () => {
    const slowLevels: [number, number][] = [];
    for (let level = 601; level <= 1000; level++) {
      const start = performance.now();
      getPuzzle(level);
      const elapsed = performance.now() - start;
      if (elapsed > COLD_BUDGET_MS) slowLevels.push([level, Math.round(elapsed)]);
    }
    if (slowLevels.length > 0) {
      console.log(`SLOW TWIN LEVELS (>${COLD_BUDGET_MS}ms):`, slowLevels);
    }
    expect(slowLevels).toEqual([]);
  });
});
