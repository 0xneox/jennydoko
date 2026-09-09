import { PuzzleData, Region, DifficultyLevel } from '../src/game/types';
import { verifyPuzzle } from '../src/utils/puzzleVerifier';
import * as fs from 'fs';
import * as path from 'path';

// Helper to generate a valid non-touching solution
function findPermutation(n: number): { row: number; col: number }[] | null {
  const cols: number[] = [];
  const used = new Set<number>();

  function solve(r: number): boolean {
    if (r === n) return true;
    const choices: number[] = [];
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

export function generateUniquePuzzle(
  level: number,
  n: number,
  difficulty: DifficultyLevel
): PuzzleData | null {
  const maxTrials = n >= 9 ? 1000 : 400;

  for (let trial = 0; trial < maxTrials; trial++) {
    const solution = findPermutation(n);
    if (!solution) continue;

    // Pick 1 or 2 anchor regions to be single-cell clues
    // e.g. top anchor, bottom anchor, or middle anchor
    const anchorTypes = ['top_and_bottom', 'top_only', 'bottom_only', 'random_single'];
    const anchorType = anchorTypes[Math.floor(Math.random() * anchorTypes.length)];

    const grid: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    const regions: Region[] = Array.from({ length: n }, (_, i) => ({ id: i + 1, cells: [] }));

    const lockedRegionIds = new Set<number>();

    if (anchorType === 'top_and_bottom') {
      lockedRegionIds.add(1);
      lockedRegionIds.add(n);
    } else if (anchorType === 'top_only') {
      lockedRegionIds.add(1);
    } else if (anchorType === 'bottom_only') {
      lockedRegionIds.add(n);
    } else {
      const randIdx = Math.floor(Math.random() * n) + 1;
      lockedRegionIds.add(randIdx);
    }

    // Seed each region with its solution cell
    for (let i = 0; i < n; i++) {
      const regId = i + 1;
      grid[solution[i].row][solution[i].col] = regId;
      regions[i].cells.push({ row: solution[i].row, col: solution[i].col });
    }

    // Collect unassigned cells
    const unassigned: { row: number; col: number }[] = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (grid[r][c] === 0) unassigned.push({ row: r, col: c });
      }
    }

    // Shuffle unassigned to avoid uniform shapes
    unassigned.sort(() => Math.random() - 0.5);

    let stuck = false;
    while (unassigned.length > 0) {
      let assigned = false;
      for (let i = 0; i < unassigned.length; i++) {
        const { row, col } = unassigned[i];
        const adjRegs: number[] = [];
        for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          const nr = row + dr;
          const nc = col + dc;
          if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] > 0) {
            const regId = grid[nr][nc];
            // Don't expand locked single-cell clue regions
            if (!lockedRegionIds.has(regId) && !adjRegs.includes(regId)) {
              adjRegs.push(regId);
            }
          }
        }

        if (adjRegs.length > 0) {
          // Sort by distance to row with random jitter for organic polyomino shapes
          adjRegs.sort((a, b) => {
            const distA = Math.abs((a - 1) - row);
            const distB = Math.abs((b - 1) - row);
            if (distA !== distB) return distA - distB;
            return (regions[a - 1].cells.length - regions[b - 1].cells.length) + (Math.random() - 0.5);
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

    // Verify all regions are non-empty and connected
    let allNonEmpty = true;
    for (const r of regions) {
      if (r.cells.length === 0) {
        allNonEmpty = false;
        break;
      }
    }
    if (!allNonEmpty) continue;

    const firstAnchor = Array.from(lockedRegionIds)[0];
    const anchorCell = regions[firstAnchor - 1].cells[0];

    const puzzle: PuzzleData = {
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

    const ver = verifyPuzzle(puzzle);
    if (ver.validSolution && ver.unique && ver.allConnected && ver.allCovered && ver.hasStart) {
      return puzzle;
    }
  }

  return null;
}

// Generate all 50 levels
async function run() {
  console.log('Generating levels 51 to 100...');
  const puzzles: PuzzleData[] = [];

  const specs: { start: number; end: number; size: number; diff: DifficultyLevel }[] = [
    { start: 51, end: 60, size: 6, diff: 'medium' },
    { start: 61, end: 70, size: 7, diff: 'hard' },
    { start: 71, end: 80, size: 8, diff: 'expert' },
    { start: 81, end: 90, size: 9, diff: 'master' },
    { start: 91, end: 100, size: 10, diff: 'legend' },
  ];

  for (const spec of specs) {
    for (let lvl = spec.start; lvl <= spec.end; lvl++) {
      console.log(`Generating Level ${lvl} (${spec.size}x${spec.size} ${spec.diff})...`);
      let puzzle = generateUniquePuzzle(lvl, spec.size, spec.diff);
      let attempts = 1;
      while (!puzzle && attempts < 5) {
        attempts++;
        console.log(`  Retry attempt ${attempts} for Level ${lvl}...`);
        puzzle = generateUniquePuzzle(lvl, spec.size, spec.diff);
      }
      if (!puzzle) {
        throw new Error(`Failed to generate puzzle for Level ${lvl}`);
      }
      puzzles.push(puzzle);
      console.log(`✓ Level ${lvl} generated successfully`);
    }
  }

  // Format code for export
  const puzzleCodeBlocks = puzzles.map(p => {
    return `export const level${p.level}: PuzzleData = ${JSON.stringify(p, null, 2)};`;
  });

  const outPath = path.join(__dirname, 'newLevels51_100.json');
  fs.writeFileSync(outPath, JSON.stringify(puzzles, null, 2));
  console.log(`Saved ${puzzles.length} puzzles to ${outPath}`);

  const codeOutPath = path.join(__dirname, 'newLevels51_100.txt');
  fs.writeFileSync(codeOutPath, puzzleCodeBlocks.join('\n\n'));
  console.log(`Saved code to ${codeOutPath}`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
