import { Board, PuzzleData, Region, DifficultyLevel } from '../src/game/types';
import { verifyPuzzle } from '../src/utils/puzzleVerifier';

// Helper to get valid non-touching solutions
export function findPermutationSolution(n: number): { row: number; col: number }[] | null {
  const cols: number[] = [];

  function solve(row: number): boolean {
    if (row === n) return true;

    const candidateCols: number[] = [];
    for (let c = 0; c < n; c++) {
      if (!cols.includes(c)) {
        if (row === 0 || Math.abs(c - cols[row - 1]) >= 2) {
          candidateCols.push(c);
        }
      }
    }

    candidateCols.sort(() => Math.random() - 0.5);

    for (const c of candidateCols) {
      cols.push(c);
      if (solve(row + 1)) return true;
      cols.pop();
    }
    return false;
  }

  return solve(0) ? cols.map((col, row) => ({ row, col })) : null;
}

// Construct sensible connected regions around the solution using fast frontier flood-fill
export function constructPuzzle(
  level: number,
  gridSize: number,
  difficulty: DifficultyLevel,
  clueType: 'single_cell' | 'row_unique' | 'col_unique' | 'bottleneck' = 'single_cell'
): PuzzleData | null {
  for (let trial = 0; trial < 200; trial++) {
    const solution = findPermutationSolution(gridSize);
    if (!solution) continue;

    for (let attempt = 0; attempt < 50; attempt++) {
      const grid = new Int32Array(gridSize * gridSize);
      const regions: Region[] = solution.map((p, idx) => {
        grid[p.row * gridSize + p.col] = idx + 1;
        return { id: idx + 1, cells: [{ row: p.row, col: p.col }] };
      });

      const lockedRegionId = clueType === 'single_cell' ? 1 : 0;
      const frontier = new Map<number, number[]>();

      const addNeighboursToFrontier = (r: number, c: number, regId: number) => {
        if (regId === lockedRegionId) return;
        for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize) {
            const idx = nr * gridSize + nc;
            if (grid[idx] === 0) {
              const list = frontier.get(idx) || [];
              if (!list.includes(regId)) list.push(regId);
              frontier.set(idx, list);
            }
          }
        }
      };

      for (let i = 0; i < gridSize; i++) {
        addNeighboursToFrontier(solution[i].row, solution[i].col, i + 1);
      }

      let filledCount = gridSize;
      const totalCells = gridSize * gridSize;

      while (filledCount < totalCells && frontier.size > 0) {
        const keys = Array.from(frontier.keys());
        const chosenKey = keys[Math.floor(Math.random() * keys.length)];
        const availableRegs = frontier.get(chosenKey)!;
        frontier.delete(chosenKey);

        availableRegs.sort((a, b) => regions[a - 1].cells.length - regions[b - 1].cells.length);
        const chosenReg = availableRegs[0];

        const r = Math.floor(chosenKey / gridSize);
        const c = chosenKey % gridSize;

        grid[chosenKey] = chosenReg;
        regions[chosenReg - 1].cells.push({ row: r, col: c });
        filledCount++;

        addNeighboursToFrontier(r, c, chosenReg);
      }

      if (filledCount < totalCells) continue;

      const candidatePuzzle: PuzzleData = {
        level,
        gridSize,
        regions,
        solution,
        difficulty,
        techniquesRequired: ['row_elimination', 'column_elimination', 'neighbour_elimination'],
        techniquesIntroduced: [],
        hasLogicalStart: true,
      };

      const ver = verifyPuzzle(candidatePuzzle);
      if (ver.validSolution && ver.unique && ver.allConnected && ver.allCovered && ver.hasStart) {
        candidatePuzzle.startingDeduction = ver.firstDeduction;
        candidatePuzzle.estimatedSolvingSteps = gridSize * 2;
        return candidatePuzzle;
      }
    }
  }

  return null;
}
