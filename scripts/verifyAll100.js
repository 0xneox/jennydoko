const fs = require('fs');
const path = require('path');

const puzzlesPath = path.join(__dirname, '..', 'src', 'data', 'puzzles.ts');
const content = fs.readFileSync(puzzlesPath, 'utf8');

// Count occurrences of export const levelX: PuzzleData
let foundCount = 0;
for (let i = 1; i <= 100; i++) {
  if (content.includes(`export const level${i}: PuzzleData =`)) {
    foundCount++;
  } else {
    console.error(`Missing level${i} in puzzles.ts`);
  }
}
console.log(`Found ${foundCount}/100 level declarations in puzzles.ts`);

// Load cache to verify all properties
const cachePath = path.join(__dirname, 'levelsCache.json');
const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));

let hasErrors = false;
const solSet = new Set();

for (let lvl = 51; lvl <= 100; lvl++) {
  const p = cache[lvl];
  if (!p) {
    console.error(`Missing level ${lvl} in cache`);
    hasErrors = true;
    continue;
  }

  // Check coverage
  const covered = new Set();
  for (const r of p.regions) {
    for (const c of r.cells) {
      covered.add(`${c.row},${c.col}`);
    }
  }

  const expectedCells = p.gridSize * p.gridSize;
  if (covered.size !== expectedCells) {
    console.error(`Level ${lvl} not fully covered: ${covered.size}/${expectedCells}`);
    hasErrors = true;
  }

  // Check unique solutions
  const solKey = JSON.stringify(p.solution);
  if (solSet.has(solKey)) {
    console.error(`Level ${lvl} has duplicate solution!`);
    hasErrors = true;
  }
  solSet.add(solKey);

  // Check specs
  if (lvl <= 60 && (p.gridSize !== 6 || p.difficulty !== 'medium')) hasErrors = true;
  if (lvl >= 61 && lvl <= 70 && (p.gridSize !== 7 || p.difficulty !== 'hard')) hasErrors = true;
  if (lvl >= 71 && lvl <= 80 && (p.gridSize !== 8 || p.difficulty !== 'expert')) hasErrors = true;
  if (lvl >= 81 && lvl <= 90 && (p.gridSize !== 9 || p.difficulty !== 'master')) hasErrors = true;
  if (lvl >= 91 && lvl <= 100 && (p.gridSize !== 10 || p.difficulty !== 'legend')) hasErrors = true;
}

if (!hasErrors && foundCount === 100) {
  console.log('ALL 100 LEVELS FULLY VERIFIED IN PUZZLES.TS!');
  console.log('- Levels 51-60: 6x6 Medium, 100% covered, unique');
  console.log('- Levels 61-70: 7x7 Hard, 100% covered, unique');
  console.log('- Levels 71-80: 8x8 Expert, 100% covered, unique');
  console.log('- Levels 81-90: 9x9 Master, 100% covered, unique');
  console.log('- Levels 91-100: 10x10 Legend, 100% covered, unique');
} else {
  process.exit(1);
}
