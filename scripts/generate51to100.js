const fs = require('fs');
const path = require('path');

// 1. Solution finder for non-touching N queens
function findPermutation(n) {
  const cols = [];
  const used = new Set();

  function solve(r) {
    if (r === n) return true;
    const choices = [];
    for (let c = 0; c < n; c++) {
      if (!used.has(c)) {
        if (r === 0 || Math.abs(c - cols[r - 1]) >= 2) {
          choices.push(c);
        }
      }
    }
    choices.sort(() => Math.random() - 0.5);
    for (const c of choices) {
      cols.push(c);
      used.add(c);
      if (solve(r + 1)) return true;
      cols.pop();
      used.delete(c);
    }
    return false;
  }

  return solve(0) ? cols.map((col, row) => ({ row, col })) : null;
}

// 2. Connectivity check
function isConnected(cells) {
  if (cells.length <= 1) return true;
  const set = new Set(cells.map(c => `${c.row},${c.col}`));
  const visited = new Set();
  const q = [`${cells[0].row},${cells[0].col}`];
  visited.add(q[0]);

  while (q.length > 0) {
    const curr = q.pop();
    const [r, c] = curr.split(',').map(Number);
    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const nr = r + dr;
      const nc = c + dc;
      const key = `${nr},${nc}`;
      if (set.has(key) && !visited.has(key)) {
        visited.add(key);
        q.push(key);
      }
    }
  }
  return visited.size === cells.length;
}

// 3. Exact fast solution counter
function countValidSolutions(gridSize, regions) {
  const size = gridSize;
  const regionMap = new Int32Array(size * size);
  for (const region of regions) {
    for (const cell of region.cells) {
      regionMap[cell.row * size + cell.col] = region.id;
    }
  }

  let solutionCount = 0;
  const usedCols = new Uint8Array(size);
  const usedRegions = new Set();
  const currentCols = new Int32Array(size);

  function solveRow(row) {
    if (solutionCount >= 2) return;
    if (row === size) {
      solutionCount++;
      return;
    }

    const prevCol = row > 0 ? currentCols[row - 1] : -99;
    for (let col = 0; col < size; col++) {
      if (usedCols[col]) continue;
      if (Math.abs(col - prevCol) <= 1) continue;

      const regId = regionMap[row * size + col];
      if (usedRegions.has(regId)) continue;

      usedCols[col] = 1;
      usedRegions.add(regId);
      currentCols[row] = col;

      solveRow(row + 1);

      usedCols[col] = 0;
      usedRegions.delete(regId);
      if (solutionCount >= 2) return;
    }
  }

  solveRow(0);
  return solutionCount;
}

// 4. Verify candidate puzzle
function verifyPuzzle(puzzle) {
  const { gridSize, regions, solution } = puzzle;

  // Check solution length
  if (solution.length !== gridSize) return false;

  // Check valid solution
  for (let i = 0; i < gridSize; i++) {
    for (let j = i + 1; j < gridSize; j++) {
      if (solution[i].row === solution[j].row) return false;
      if (solution[i].col === solution[j].col) return false;
      if (Math.abs(solution[i].row - solution[j].row) <= 1 && Math.abs(solution[i].col - solution[j].col) <= 1) {
        return false;
      }
    }
  }

  // Check all regions connected
  for (const r of regions) {
    if (!isConnected(r.cells)) return false;
  }

  // Check grid fully covered
  const covered = new Set();
  for (const r of regions) {
    for (const c of r.cells) {
      covered.add(`${c.row},${c.col}`);
    }
  }
  if (covered.size !== gridSize * gridSize) return false;

  // Check solution uniqueness
  if (countValidSolutions(gridSize, regions) !== 1) return false;

  return true;
}

// 5. Construct a unique puzzle
function constructPuzzle(level, n, difficulty, usedSolutions) {
  const maxTrials = n >= 9 ? 1500 : 800;

  for (let trial = 0; trial < maxTrials; trial++) {
    const solution = findPermutation(n);
    if (!solution) continue;

    const solKey = JSON.stringify(solution);
    if (usedSolutions && usedSolutions.has(solKey)) {
      continue;
    }

    const grid = Array.from({ length: n }, () => Array(n).fill(0));
    const regions = Array.from({ length: n }, (_, i) => ({ id: i + 1, cells: [] }));

    // For n >= 8, top and bottom anchors ensure cascade and uniqueness
    const lockedRegionIds = new Set();
    if (n >= 8 || trial > 20) {
      lockedRegionIds.add(1);
      lockedRegionIds.add(n);
    } else {
      const strategies = ['top_and_bottom', 'top_only', 'bottom_only', 'random_single'];
      const strat = strategies[(level + trial) % strategies.length];
      if (strat === 'top_and_bottom') {
        lockedRegionIds.add(1);
        lockedRegionIds.add(n);
      } else if (strat === 'top_only') {
        lockedRegionIds.add(1);
      } else if (strat === 'bottom_only') {
        lockedRegionIds.add(n);
      } else {
        const pick = (trial % n) + 1;
        lockedRegionIds.add(pick);
      }
    }

    // Seed each region with its solution cell
    for (let i = 0; i < n; i++) {
      const regId = i + 1;
      grid[solution[i].row][solution[i].col] = regId;
      regions[i].cells.push({ row: solution[i].row, col: solution[i].col });
    }

    // Remaining unassigned cells
    const unassigned = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (grid[r][c] === 0) unassigned.push({ row: r, col: c });
      }
    }

    // Sort row by row to reliably expand top-to-bottom
    unassigned.sort((a, b) => a.row - b.row || a.col - b.col);

    let stuck = false;
    while (unassigned.length > 0) {
      let assigned = false;
      for (let i = 0; i < unassigned.length; i++) {
        const { row, col } = unassigned[i];
        const adjRegs = [];
        for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          const nr = row + dr;
          const nc = col + dc;
          if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] > 0) {
            const regId = grid[nr][nc];
            if (!lockedRegionIds.has(regId) && !adjRegs.includes(regId)) {
              adjRegs.push(regId);
            }
          }
        }

        if (adjRegs.length > 0) {
          // Prefer expanding closest region to the row and smallest region
          adjRegs.sort((a, b) => {
            const distA = Math.abs((a - 1) - row);
            const distB = Math.abs((b - 1) - row);
            if (distA !== distB) return distA - distB;
            return regions[a - 1].cells.length - regions[b - 1].cells.length;
          });

          const chosen = adjRegs[0];
          grid[row][col] = chosen;
          regions[chosen - 1].cells.push({ row, col });
          unassigned.splice(i, 1);
          assigned = true;
          break;
        }
      }

      if (!assigned) {
        stuck = true;
        break;
      }
    }

    if (stuck) continue;

    const firstLocked = Array.from(lockedRegionIds)[0];
    const anchorCell = regions[firstLocked - 1].cells[0];

    const puzzle = {
      level,
      gridSize: n,
      regions,
      solution,
      difficulty,
      techniquesRequired: ['single_cell_colour', 'row_elimination', 'column_elimination', 'neighbour_elimination'],
      techniquesIntroduced: [],
      hasLogicalStart: true,
      startingDeduction: `Single-cell colour at (${anchorCell.row}, ${anchorCell.col})`,
      estimatedSolvingSteps: n * 2,
    };

    if (verifyPuzzle(puzzle)) {
      return puzzle;
    }
  }

  return null;
}

// Generate levels 51 to 100
function main() {
  console.log('Generating levels 51 to 100...');
  const specs = [
    { start: 51, end: 60, size: 6, diff: 'medium' },
    { start: 61, end: 70, size: 7, diff: 'hard' },
    { start: 71, end: 80, size: 8, diff: 'expert' },
    { start: 81, end: 90, size: 9, diff: 'master' },
    { start: 91, end: 100, size: 10, diff: 'legend' },
  ];

  const allPuzzles = [];
  const usedSolutions = new Set();

  for (const spec of specs) {
    for (let lvl = spec.start; lvl <= spec.end; lvl++) {
      process.stdout.write(`Generating Level ${lvl} (${spec.size}x${spec.size} ${spec.diff})... `);
      let p = constructPuzzle(lvl, spec.size, spec.diff, usedSolutions);
      let retries = 0;
      while (!p && retries < 40) {
        retries++;
        p = constructPuzzle(lvl, spec.size, spec.diff, usedSolutions);
      }
      if (!p) {
        console.error(`FAILED for Level ${lvl}`);
        process.exit(1);
      }
      usedSolutions.add(JSON.stringify(p.solution));
      allPuzzles.push(p);
      console.log(`✓ OK`);
    }
  }

  // Update src/data/puzzles.ts directly
  const puzzlesFilePath = path.join(__dirname, '..', 'src', 'data', 'puzzles.ts');
  const originalCode = fs.readFileSync(puzzlesFilePath, 'utf8');

  // Find where level51 starts
  const marker = 'export const level51: PuzzleData = {';
  const markerIndex = originalCode.indexOf(marker);
  if (markerIndex === -1) {
    console.error('Could not find level51 marker in puzzles.ts');
    process.exit(1);
  }

  // Find where export const puzzles: PuzzleData[] = [ starts
  const endMarker = 'export const puzzles: PuzzleData[] = [';
  const endMarkerIndex = originalCode.indexOf(endMarker);
  if (endMarkerIndex === -1) {
    console.error('Could not find puzzles array marker in puzzles.ts');
    process.exit(1);
  }

  const generatedCode = allPuzzles.map(p => {
    return `export const level${p.level}: PuzzleData = ${JSON.stringify(p, null, 2)};`;
  }).join('\n\n');

  const newFileContent = originalCode.substring(0, markerIndex) +
    generatedCode + '\n\n' +
    originalCode.substring(endMarkerIndex);

  fs.writeFileSync(puzzlesFilePath, newFileContent, 'utf8');
  console.log(`\nSuccessfully updated ${puzzlesFilePath} with all 50 unique puzzles!`);
}

main();
