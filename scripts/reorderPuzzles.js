// One-off data migration: reorders the handcrafted `puzzles` array in
// src/data/puzzles.ts so gridSize ramps monotonically (stable sort by size),
// and rewrites each puzzle's `"level"` field to its new 1-based position.
// Fixes the sawtooth where 10x10 puzzles at 46-50 dropped back to 6x6 at 51.
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'data', 'puzzles.ts');
let src = fs.readFileSync(FILE, 'utf8');

// 1. Extract each `const levelN: PuzzleData = { ... };` block (optionally exported)
const blockStart = /(?:export )?const level(\d+): PuzzleData = \{/g;
const blocks = []; // { name, oldLevel, gridSize, start, end }
let m;
while ((m = blockStart.exec(src))) {
  const start = m.index;
  const endIdx = src.indexOf('\n};', start);
  if (endIdx === -1) throw new Error(`Unterminated block for level${m[1]}`);
  const end = endIdx + 3; // include "};"
  const body = src.slice(start, end);
  const gs = /"?gridSize"?: (\d+)/.exec(body);
  blocks.push({
    name: `level${m[1]}`,
    oldLevel: +m[1],
    gridSize: +gs[1],
    start,
    end,
    body,
  });
}
console.log('parsed blocks:', blocks.length);
if (blocks.length !== 100) throw new Error('expected 100 blocks');

// 2. Stable sort by gridSize
const sorted = [...blocks].sort((a, b) => a.gridSize - b.gridSize);
const newLevelOf = new Map(); // name -> newLevel
sorted.forEach((b, i) => newLevelOf.set(b.name, i + 1));

// 3. Renumber `"level": N` inside each block (rebuild from the end backwards)
let out = src;
for (const b of [...blocks].sort((a, b) => b.start - a.start)) {
  const quoted = b.body.includes('"level"');
  const newBody = quoted
    ? b.body.replace(/"level": \d+,/, `"level": ${newLevelOf.get(b.name)},`)
    : b.body.replace(/(^|\n)(\s*)level: \d+,/, `$1$2level: ${newLevelOf.get(b.name)},`);
  out = out.slice(0, b.start) + newBody + out.slice(b.end);
}

// 4. Rewrite the puzzles array listing in the new order
const arrStart = out.indexOf('export const puzzles: PuzzleData[] = [');
const arrEnd = out.indexOf('\n];', arrStart);
const newArr = 'export const puzzles: PuzzleData[] = [\n' +
  sorted.map(b => `  ${b.name},`).join('\n') + '\n]';
out = out.slice(0, arrStart) + newArr + out.slice(arrEnd);

fs.writeFileSync(FILE, out, 'utf8');

// 5. Report new mapping
for (const b of sorted) {
  if (b.oldLevel !== newLevelOf.get(b.name)) {
    console.log(`level${b.oldLevel} (${b.gridSize}x${b.gridSize}) -> level ${newLevelOf.get(b.name)}`);
  }
}
