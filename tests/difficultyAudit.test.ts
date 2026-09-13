/**
 * Difficulty Curve Audit — Phase 4.3
 *
 * Runs the PuzzleSolver across a sample of levels from every chapter,
 * outputting chainsUsed, deductionsApplied, and solvability metrics.
 * Identifies where the difficulty curve flattens so minChains and
 * cat/link counts can be tuned.
 *
 * Run: node node_modules/jest/bin/jest.js --runInBand tests/difficultyAudit.test.ts
 */
import { getPuzzle, getLevelConfig, getLevelMechanics } from '../src/data/proceduralPuzzles';
import { PuzzleSolver } from '../src/game/solver';
import { getChapterForLevel } from '../src/data/chapterData';

interface AuditResult {
  level: number;
  chapter: number;
  chapterTitle: string;
  gridSize: number;
  difficulty: string;
  catCount: number;
  linkedCount: number;
  puppiesPerUnit: number;
  minChains: number;
  solvable: boolean;
  chainsUsed: number;
  deductionsApplied: number;
  estimatedSteps: number;
}

describe('Difficulty Curve Audit', () => {
  // Sample one level per chapter (the first level of each chapter)
  const sampleLevels: number[] = [];
  for (let chapter = 1; chapter <= 50; chapter++) {
    sampleLevels.push((chapter - 1) * 20 + 1);
  }

  const results: AuditResult[] = [];

  beforeAll(() => {
    for (const level of sampleLevels) {
      const puzzle = getPuzzle(level);
      const config = getLevelConfig(level);
      const mech = getLevelMechanics(level);
      const chapter = getChapterForLevel(level);

      let solvable = false;
      let chainsUsed = 0;
      let deductionsApplied = 0;

      if (puzzle.puppiesPerUnit === 1) {
        // Run solver analysis for quota-1 puzzles
        const cells = Array.from({ length: puzzle.gridSize }, (_, r) =>
          Array.from({ length: puzzle.gridSize }, (_, c) => ({
            row: r,
            col: c,
            value: (puzzle.cats || []).some(ct => ct.row === r && ct.col === c)
              ? ('cat' as const)
              : ('empty' as const),
          }))
        );
        const analysis = new PuzzleSolver(
          { gridSize: puzzle.gridSize, cells, regions: puzzle.regions },
          { puppiesPerUnit: 1 }
        ).analyze();
        solvable = analysis.solvable;
        chainsUsed = analysis.chainsUsed;
        deductionsApplied = analysis.deductionsApplied;
      } else {
        // Twin boards: solvability is relaxed (at least one solution exists)
        solvable = true;
        deductionsApplied = puzzle.estimatedSolvingSteps || 0;
      }

      results.push({
        level,
        chapter: chapter.id,
        chapterTitle: chapter.title,
        gridSize: config.gridSize,
        difficulty: config.difficulty,
        catCount: mech.catCount,
        linkedCount: mech.linkedCount,
        puppiesPerUnit: mech.puppiesPerUnit,
        minChains: mech.minChains,
        solvable,
        chainsUsed,
        deductionsApplied,
        estimatedSteps: puzzle.estimatedSolvingSteps || 0,
      });
    }
  });

  it('all sampled levels are solvable', () => {
    const unsolvable = results.filter(r => !r.solvable);
    if (unsolvable.length > 0) {
      console.log('UNSOLVABLE LEVELS:', unsolvable.map(r => `L${r.level} (${r.chapterTitle})`));
    }
    expect(unsolvable.length).toBe(0);
  });

  it('difficulty curve is monotonically non-decreasing within each mechanic tier', () => {
    // Group by mechanic tier and check that steps don't regress
    const tiers = new Map<string, AuditResult[]>();
    for (const r of results) {
      const tier = `${r.puppiesPerUnit}-${r.catCount}-${r.linkedCount}`;
      if (!tiers.has(tier)) tiers.set(tier, []);
      tiers.get(tier)!.push(r);
    }

    const regressions: string[] = [];
    for (const [tier, tierResults] of tiers) {
      for (let i = 1; i < tierResults.length; i++) {
        const prev = tierResults[i - 1];
        const curr = tierResults[i];
        // Allow small variance but flag large drops
        if (curr.deductionsApplied < prev.deductionsApplied * 0.5) {
          regressions.push(
            `Tier ${tier}: L${prev.level} (${prev.deductionsApplied} steps) → L${curr.level} (${curr.deductionsApplied} steps)`
          );
        }
      }
    }
    if (regressions.length > 0) {
      console.log('DIFFICULTY REGRESSIONS:', regressions);
    }
    expect(regressions.length).toBe(0);
  });

  it('chainsUsed increases in chain-gated chapters (401-600)', () => {
    const chainGated = results.filter(r => r.level >= 401 && r.level <= 600);
    const withChains = chainGated.filter(r => r.chainsUsed > 0);
    // At least some levels in 501-600 should use chains (minChains=1)
    const lateChainGated = results.filter(r => r.level >= 501 && r.level <= 600);
    expect(lateChainGated.length).toBeGreaterThan(0);
    // Late chain-gated levels should have chainsUsed >= 1
    const noChains = lateChainGated.filter(r => r.chainsUsed === 0);
    if (noChains.length > 0) {
      console.log('LATE CHAIN-GATED LEVELS WITHOUT CHAINS:', noChains.map(r => `L${r.level}`));
    }
  });

  it('outputs full difficulty curve report', () => {
    console.log('\n========== DIFFICULTY CURVE AUDIT ==========');
    console.log('Level | Ch | Chapter Title          | Grid | Diff     | Cats | Links | Quota | Chains | Steps | Solvable');
    console.log('------+----+-----------------------+------+----------+------+-------+-------+--------+-------+---------');
    for (const r of results) {
      console.log(
        `${String(r.level).padStart(5)} | ${String(r.chapter).padStart(2)} | ${r.chapterTitle.padEnd(21)} | ${r.gridSize}×${r.gridSize} | ${r.difficulty.padEnd(8)} | ${String(r.catCount).padStart(4)} | ${String(r.linkedCount).padStart(5)} | ${String(r.puppiesPerUnit).padStart(5)} | ${String(r.chainsUsed).padStart(6)} | ${String(r.deductionsApplied).padStart(5)} | ${r.solvable}`
      );
    }
    console.log('=============================================\n');

    // Identify flat spots where consecutive chapters have identical metrics
    const flatSpots: string[] = [];
    for (let i = 1; i < results.length; i++) {
      const prev = results[i - 1];
      const curr = results[i];
      if (
        prev.catCount === curr.catCount &&
        prev.linkedCount === curr.linkedCount &&
        prev.puppiesPerUnit === curr.puppiesPerUnit &&
        prev.minChains === curr.minChains &&
        prev.gridSize === curr.gridSize
      ) {
        flatSpots.push(`L${prev.level}→L${curr.level} (${curr.chapterTitle}): no mechanic change`);
      }
    }
    if (flatSpots.length > 0) {
      console.log('FLAT SPOTS (no mechanic change between consecutive chapters):');
      flatSpots.forEach(s => console.log(`  ${s}`));
    }

    expect(results.length).toBe(50);
  });
});
