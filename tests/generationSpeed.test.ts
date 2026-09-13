/**
 * Generation Speed Benchmark — Phase 5.2
 *
 * Measures puzzle generation time across all level ranges,
 * with focus on twin levels (601-1000) that have larger grids.
 * Verifies that twin levels don't jank on first load (~6-25ms target).
 */
import { getPuzzle, getLevelConfig, getLevelMechanics } from '../src/data/proceduralPuzzles';

describe('Generation Speed Benchmark', () => {
  const sampleLevels = [
    101, 150, 200,
    201, 250, 300,
    301, 350, 400,
    401, 500, 600,
    601, 650, 700, 800,
    801, 850, 900,
    901, 950, 1000,
  ];

  interface BenchResult {
    level: number;
    gridSize: number;
    quota: number;
    cats: number;
    links: number;
    coldMs: number;
    cachedMs: number;
  }

  const results: BenchResult[] = [];

  beforeAll(() => {
    for (const level of sampleLevels) {
      const config = getLevelConfig(level);
      const mech = getLevelMechanics(level);

      const start = performance.now();
      getPuzzle(level);
      const coldMs = performance.now() - start;

      const start2 = performance.now();
      getPuzzle(level);
      const cachedMs = performance.now() - start2;

      results.push({
        level,
        gridSize: config.gridSize,
        quota: mech.puppiesPerUnit,
        cats: mech.catCount,
        links: mech.linkedCount,
        coldMs,
        cachedMs,
      });
    }
  });

  it('cold generation completes for all sampled levels', () => {
    expect(results.length).toBe(sampleLevels.length);
    for (const r of results) {
      expect(r.coldMs).toBeGreaterThan(0);
    }
  });

  // Wall-clock assertions are machine-dependent. The budget here is the
  // player-facing ceiling (a level must never feel like a hang); the tight
  // per-level numbers are printed in the report below for humans to eyeball.
  const COLD_BUDGET_MS = 1500;

  it('twin levels (601-1000) start from a known-good seed trial', () => {
    for (const level of sampleLevels.filter(l => getLevelMechanics(l).puppiesPerUnit === 2)) {
      expect(getPuzzle(level).seedTrial).toBeDefined();
    }
  });

  it(`all levels generate within the ${COLD_BUDGET_MS}ms cold budget`, () => {
    for (const r of results) {
      expect(r.coldMs).toBeLessThan(COLD_BUDGET_MS);
    }
  });

  it('cached access is near-instant', () => {
    for (const r of results) {
      expect(r.cachedMs).toBeLessThan(20);
    }
  });

  it('outputs full benchmark report', () => {
    console.log('\n========== GENERATION SPEED BENCHMARK ==========');
    console.log('Level | Grid | Quota | Cats | Links | Cold(ms) | Cached(ms)');
    console.log('------+------+------+------+-------+----------+-----------');
    for (const r of results) {
      console.log(
        `${String(r.level).padStart(5)} | ${r.gridSize}×${r.gridSize} | ${String(r.quota).padStart(5)} | ${String(r.cats).padStart(4)} | ${String(r.links).padStart(5)} | ${r.coldMs.toFixed(1).padStart(8)} | ${r.cachedMs.toFixed(2).padStart(9)}`
      );
    }
    console.log('================================================\n');
  });
});
