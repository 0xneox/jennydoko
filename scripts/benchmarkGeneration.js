/**
 * Puzzle Generation Speed Benchmark
 *
 * Measures generation time for puzzles across all level ranges,
 * with focus on twin levels (601-1000) that have larger grids.
 *
 * Run: node scripts/benchmarkGeneration.js
 */
const { getPuzzle, getLevelConfig, getLevelMechanics } = require('../src/data/proceduralPuzzles');

const sampleLevels = [
  // Handcrafted
  1, 50, 100,
  // Early procedural
  101, 150, 200,
  // Cats
  201, 250, 300,
  // Linked
  301, 350, 400,
  // Combo
  401, 500, 600,
  // Twin debut
  601, 650, 700, 800,
  // Twin + cats
  801, 850, 900,
  // Grand championship
  901, 950, 1000,
];

console.log('Level | Grid | Quota | Cats | Links | Time(ms) | Cached?');
console.log('------+------+------+------+-------+----------+--------');

for (const level of sampleLevels) {
  const config = getLevelConfig(level);
  const mech = getLevelMechanics(level);

  // Clear cache to measure cold gen time
  // (puzzleCache is module-internal, so we measure first access)

  const start = performance.now();
  const puzzle = getPuzzle(level);
  const elapsed = performance.now() - start;

  // Second access (should be cached)
  const start2 = performance.now();
  getPuzzle(level);
  const cached = performance.now() - start2;

  console.log(
    `${String(level).padStart(5)} | ${config.gridSize}×${config.gridSize} | ${String(mech.puppiesPerUnit).padStart(5)} | ${String(mech.catCount).padStart(4)} | ${String(mech.linkedCount).padStart(5)} | ${elapsed.toFixed(1).padStart(8)} | ${cached < 1 ? 'yes' : 'no'} (${cached.toFixed(2)}ms)`
  );
}
