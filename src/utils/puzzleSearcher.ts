import { PuzzleData, Region, DeductionTechnique, DifficultyLevel } from '../game/types';
import { verifyPuzzle, isConnected } from './puzzleVerifier';
import { PuzzleSolver } from '../game/solver';
import { Board } from '../game/types';

export const solutions5x5: { row: number; col: number }[][] = [
  [{ row: 0, col: 0 }, { row: 1, col: 2 }, { row: 2, col: 4 }, { row: 3, col: 1 }, { row: 4, col: 3 }],
  [{ row: 0, col: 0 }, { row: 1, col: 3 }, { row: 2, col: 1 }, { row: 3, col: 4 }, { row: 4, col: 2 }],
  [{ row: 0, col: 1 }, { row: 1, col: 3 }, { row: 2, col: 0 }, { row: 3, col: 2 }, { row: 4, col: 4 }],
  [{ row: 0, col: 1 }, { row: 1, col: 4 }, { row: 2, col: 2 }, { row: 3, col: 0 }, { row: 4, col: 3 }],
  [{ row: 0, col: 2 }, { row: 1, col: 0 }, { row: 2, col: 3 }, { row: 3, col: 1 }, { row: 4, col: 4 }],
  [{ row: 0, col: 2 }, { row: 1, col: 4 }, { row: 2, col: 1 }, { row: 3, col: 3 }, { row: 4, col: 0 }],
  [{ row: 0, col: 3 }, { row: 1, col: 0 }, { row: 2, col: 2 }, { row: 3, col: 4 }, { row: 4, col: 1 }],
  [{ row: 0, col: 3 }, { row: 1, col: 1 }, { row: 2, col: 4 }, { row: 3, col: 2 }, { row: 4, col: 0 }],
  [{ row: 0, col: 4 }, { row: 1, col: 1 }, { row: 2, col: 3 }, { row: 3, col: 0 }, { row: 4, col: 2 }],
  [{ row: 0, col: 4 }, { row: 1, col: 2 }, { row: 2, col: 0 }, { row: 3, col: 3 }, { row: 4, col: 1 }],
];

export const solutions6x6: { row: number; col: number }[][] = [
  [{ row: 0, col: 1 }, { row: 1, col: 3 }, { row: 2, col: 5 }, { row: 3, col: 0 }, { row: 4, col: 2 }, { row: 5, col: 4 }],
  [{ row: 0, col: 2 }, { row: 1, col: 5 }, { row: 2, col: 1 }, { row: 3, col: 4 }, { row: 4, col: 0 }, { row: 5, col: 3 }],
  [{ row: 0, col: 3 }, { row: 1, col: 0 }, { row: 2, col: 4 }, { row: 3, col: 1 }, { row: 4, col: 5 }, { row: 5, col: 2 }],
  [{ row: 0, col: 4 }, { row: 1, col: 2 }, { row: 2, col: 0 }, { row: 3, col: 5 }, { row: 4, col: 3 }, { row: 5, col: 1 }],
];

export function findValidPuzzle(params: {
  level: number;
  gridSize: number;
  solution: { row: number; col: number }[];
  difficulty: DifficultyLevel;
  requiredStartTechnique?: DeductionTechnique;
  allowSingleCell?: boolean;
  maxAttempts?: number;
}): PuzzleData | null {
  const { level, gridSize, solution, difficulty, requiredStartTechnique, allowSingleCell = false, maxAttempts = 1000 } = params;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // 1. Assign each puppy to its own region
    const grid: number[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    const regions: Region[] = solution.map((p, idx) => {
      grid[p.row][p.col] = idx + 1;
      return { id: idx + 1, cells: [{ row: p.row, col: p.col }] };
    });

    // 2. Expand regions to unassigned cells
    const unassigned: { row: number; col: number }[] = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (grid[r][c] === 0) unassigned.push({ row: r, col: c });
      }
    }

    // Shuffle unassigned
    unassigned.sort(() => Math.random() - 0.5);

    let failed = false;
    while (unassigned.length > 0) {
      let assignedAny = false;
      for (let i = 0; i < unassigned.length; i++) {
        const cell = unassigned[i];
        // find adjacent assigned regions
        const adjRegions: number[] = [];
        for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          const nr = cell.row + dr;
          const nc = cell.col + dc;
          if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize && grid[nr][nc] > 0) {
            if (!adjRegions.includes(grid[nr][nc])) {
              // If allowSingleCell is false for a region, or if it's region 1 and we want it single-cell
              if (allowSingleCell && grid[nr][nc] === 1) {
                // Keep region 1 single cell!
              } else {
                adjRegions.push(grid[nr][nc]);
              }
            }
          }
        }

        if (adjRegions.length > 0) {
          const chosenRegion = adjRegions[Math.floor(Math.random() * adjRegions.length)];
          grid[cell.row][cell.col] = chosenRegion;
          regions[chosenRegion - 1].cells.push(cell);
          unassigned.splice(i, 1);
          assignedAny = true;
          break;
        }
      }

      if (!assignedAny) {
        failed = true;
        break;
      }
    }

    if (failed) continue;

    // Check single cell constraint
    if (!allowSingleCell && regions.some(r => r.cells.length === 1)) {
      continue;
    }

    const puzzle: PuzzleData = {
      level,
      gridSize,
      regions,
      solution,
      difficulty,
      techniquesRequired: [],
      techniquesIntroduced: [],
      hasLogicalStart: true,
    };

    const ver = verifyPuzzle(puzzle);
    if (!ver.unique || !ver.allConnected || !ver.allCovered || !ver.hasStart) {
      continue;
    }

    if (requiredStartTechnique) {
      const emptyBoard: Board = {
        gridSize,
        cells: Array.from({ length: gridSize }, (_, r) =>
          Array.from({ length: gridSize }, (_, c) => ({ row: r, col: c, value: 'empty' as const }))
        ),
        regions,
      };
      const solver = new PuzzleSolver(emptyBoard);
      const deductions = solver.findAllDeductions();
      if (!deductions.some(d => d.technique === requiredStartTechnique)) {
        continue;
      }
    }

    return puzzle;
  }

  return null;
}
