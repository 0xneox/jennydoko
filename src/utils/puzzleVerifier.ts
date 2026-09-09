import { GameEngine } from '../game/engine';
import { PuzzleSolver } from '../game/solver';
import { Board, PuzzleData, Region } from '../game/types';

export function isConnected(cells: { row: number; col: number }[]): boolean {
  if (cells.length <= 1) return true;
  const set = new Set(cells.map(c => `${c.row},${c.col}`));
  const visited = new Set<string>();
  const q = [`${cells[0].row},${cells[0].col}`];
  visited.add(q[0]);
  while (q.length > 0) {
    const curr = q.pop()!;
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

export function verifyPuzzle(puzzle: PuzzleData): {
  validSolution: boolean;
  unique: boolean;
  allConnected: boolean;
  allCovered: boolean;
  hasStart: boolean;
  firstDeduction?: string;
  error?: string;
} {
  const engine = new GameEngine(puzzle);
  const validSolution = engine.validateSolution(puzzle.solution);
  if (!validSolution) return { validSolution: false, unique: false, allConnected: false, allCovered: false, hasStart: false, error: 'Invalid solution' };

  let allConnected = true;
  for (const r of puzzle.regions) {
    if (!isConnected(r.cells)) {
      allConnected = false;
      return { validSolution, unique: false, allConnected: false, allCovered: false, hasStart: false, error: `Region ${r.id} not connected` };
    }
  }

  const covered = new Set<string>();
  for (const r of puzzle.regions) {
    for (const c of r.cells) {
      covered.add(`${c.row},${c.col}`);
    }
  }
  const allCovered = covered.size === puzzle.gridSize * puzzle.gridSize;
  if (!allCovered) return { validSolution, unique: false, allConnected, allCovered: false, hasStart: false, error: 'Grid not fully covered' };

  const unique = engine.countValidSolutions() === 1;
  if (!unique) return { validSolution, unique: false, allConnected, allCovered, hasStart: false, error: 'Not unique solution' };

  const emptyBoard: Board = {
    gridSize: puzzle.gridSize,
    cells: Array.from({ length: puzzle.gridSize }, (_, r) =>
      Array.from({ length: puzzle.gridSize }, (_, c) => ({ row: r, col: c, value: 'empty' as const }))
    ),
    regions: puzzle.regions,
  };
  const solver = new PuzzleSolver(emptyBoard);
  const deductions = solver.findAllDeductions();
  const hasStart = deductions.length > 0;
  const firstDeduction = deductions[0] ? `${deductions[0].technique} at (${deductions[0].affectedCell.row},${deductions[0].affectedCell.col})` : undefined;

  return { validSolution, unique, allConnected, allCovered, hasStart, firstDeduction };
}
