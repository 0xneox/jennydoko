import { PuzzleData, Region } from '../src/game/types';
import { verifyPuzzle } from '../src/utils/puzzleVerifier';
import { PuzzleSolver } from '../src/game/solver';
import { Board } from '../src/game/types';

// Generate a valid cascading puzzle for size N
export function generateCascadePuzzle(level: number, n: number, difficulty: 'hard' | 'expert'): PuzzleData | null {
  // 1. Pick non-touching columns for rows 0..n-1
  // We want c_{i+1} separated by at least 2 from c_i
  // Standard pattern: e.g. knight-move or step 2 or 3 modulo n
  const maxTrials = n >= 10 ? 600 : 250;
  for (let trial = 0; trial < maxTrials; trial++) {
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

    if (!solve(0)) continue;

    const solution = cols.map((col, row) => ({ row, col }));

    // 2. Build N contiguous regions
    const grid: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    const regions: Region[] = Array.from({ length: n }, (_, i) => ({ id: i + 1, cells: [] }));

    // Region 1 gets (0, cols[0]) (top anchor)
    grid[0][cols[0]] = 1;
    regions[0].cells.push({ row: 0, col: cols[0] });

    // Region n gets (n-1, cols[n-1]) (bottom anchor)
    grid[n - 1][cols[n - 1]] = n;
    regions[n - 1].cells.push({ row: n - 1, col: cols[n - 1] });

    // Middle regions get (i, cols[i])
    for (let i = 1; i < n - 1; i++) {
      grid[i][cols[i]] = i + 1;
      regions[i].cells.push({ row: i, col: cols[i] });
    }

    // Now fill remaining cells row by row
    const unassigned: { row: number; col: number }[] = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (grid[r][c] === 0) unassigned.push({ row: r, col: c });
      }
    }

    unassigned.sort((a, b) => a.row - b.row || a.col - b.col);

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
            // Don't expand region 1 or region n
            if (regId !== 1 && regId !== n && !adjRegs.includes(regId)) {
              adjRegs.push(regId);
            }
          }
        }

        if (adjRegs.length > 0) {
          // Prefer region closest to cell's row
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

    const puzzle: PuzzleData = {
      level,
      gridSize: n,
      regions,
      solution,
      difficulty,
      techniquesRequired: ['single_cell_colour', 'row_elimination', 'column_elimination', 'neighbour_elimination'],
      techniquesIntroduced: [],
      hasLogicalStart: true,
      startingDeduction: `Single-cell colour at (0, ${cols[0]})`,
      estimatedSolvingSteps: n * 2,
    };

    const ver = verifyPuzzle(puzzle);
    if (trial === 0) {
      console.log(`Size ${n} trial 0 ver:`, ver);
    }
    if (ver.validSolution && ver.unique && ver.allConnected && ver.allCovered && ver.hasStart) {
      return puzzle;
    }
  }

  return null;
}
