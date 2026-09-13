/**
 * Builds src/data/twinTrialStart.ts: for every twin level (601-1000), the
 * first seed trial whose board passes generation (incl. the solution cap).
 * Slow (minutes) — run once whenever generator rules or the cap change.
 *
 *   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/buildTwinTrialTable.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import { generateDeterministicPuzzle, getLevelMechanics } from '../src/data/proceduralPuzzles';

const table: Record<number, number> = {};
const t0 = Date.now();
for (let level = 101; level <= 1000; level++) {
  if (getLevelMechanics(level).puppiesPerUnit < 2) continue;
  const s = Date.now();
  const p = generateDeterministicPuzzle(level, 0);
  if (p.seedTrial === undefined) throw new Error(`Level ${level} fell back to handcrafted data`);
  table[level] = p.seedTrial;
  console.log(`L${level}: trial ${p.seedTrial} (${Date.now() - s}ms)`);
}

const rows = Object.entries(table).map(([l, t]) => `  ${l}: ${t},`).join('\n');
const out = `/**
 * Twin (quota-2) boards are capped at MAX_TWIN_SOLUTIONS arrangements. Finding
 * a seed trial that satisfies the cap can take hundreds of trials on 10x10,
 * far too slow for on-device generation. This table records the first trial
 * that passes for each twin level so generation jumps straight to it.
 *
 * Regenerate with: npx ts-node scripts/buildTwinTrialTable.ts
 * Verified by tests/twinTrialTable.test.ts.
 */
export const TWIN_TRIAL_START: Record<number, number> = {
${rows}
};
`;
fs.writeFileSync(path.join(__dirname, '../src/data/twinTrialStart.ts'), out);
console.log(`Wrote ${Object.keys(table).length} entries in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
