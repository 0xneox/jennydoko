import { puzzles } from '../src/data/puzzles';
import { GameEngine } from '../src/game/engine';
import { PuzzleSolver } from '../src/game/solver';
import { PuzzleData } from '../src/game/types';
import * as fs from 'fs';

interface StepLog {
  type: 'puppy' | 'mark';
  row: number;
  col: number;
  reason: string;
  technique: string;
}

export function simulateAdvancedHumanSolver(puzzle: PuzzleData): {
  solved: boolean;
  steps: StepLog[];
  placements: number;
  eliminations: number;
  techniques: Set<string>;
  stuckAtStep: number;
  remainingPuppies: number;
} {
  const n = puzzle.gridSize;
  const board: ('empty' | 'puppy' | 'X')[][] = Array.from({ length: n }, () => Array(n).fill('empty'));
  const steps: StepLog[] = [];
  const techniques = new Set<string>();
  let placements = 0;
  let eliminations = 0;

  function markX(r: number, c: number, reason: string, tech: string): boolean {
    if (board[r][c] === 'empty') {
      board[r][c] = 'X';
      eliminations++;
      steps.push({ type: 'mark', row: r, col: c, reason, technique: tech });
      techniques.add(tech);
      return true;
    }
    return false;
  }

  function placeDog(r: number, c: number, reason: string, tech: string) {
    board[r][c] = 'puppy';
    placements++;
    steps.push({ type: 'puppy', row: r, col: c, reason, technique: tech });
    techniques.add(tech);

    // Auto-eliminate row, col, region, neighbors
    for (let col = 0; col < n; col++) {
      if (col !== c) markX(r, col, `Row ${r} has puppy at (${r},${c})`, 'row_elimination');
    }
    for (let row = 0; row < n; row++) {
      if (row !== r) markX(row, c, `Column ${c} has puppy at (${r},${c})`, 'column_elimination');
    }
    const reg = puzzle.regions.find(rg => rg.cells.some(cell => cell.row === r && cell.col === c));
    if (reg) {
      for (const cell of reg.cells) {
        if (cell.row !== r || cell.col !== c) {
          markX(cell.row, cell.col, `Region ${reg.id} has puppy at (${r},${c})`, 'region_elimination');
        }
      }
    }
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
          markX(nr, nc, `Neighbor of puppy at (${r},${c})`, 'neighbour_elimination');
        }
      }
    }
  }

  let progress = true;
  while (progress && placements < n) {
    progress = false;

    // 1. Single cell in Region
    for (const reg of puzzle.regions) {
      const hasPuppy = reg.cells.some(c => board[c.row][c.col] === 'puppy');
      if (hasPuppy) continue;
      const empties = reg.cells.filter(c => board[c.row][c.col] === 'empty');
      if (empties.length === 1) {
        placeDog(empties[0].row, empties[0].col, `Region ${reg.id} has only 1 cell left`, 'single_cell_colour');
        progress = true;
        break;
      }
    }
    if (progress) continue;

    // 2. Single cell in Row
    for (let r = 0; r < n; r++) {
      let puppyInRow = false;
      const empties: number[] = [];
      for (let c = 0; c < n; c++) {
        if (board[r][c] === 'puppy') { puppyInRow = true; break; }
        if (board[r][c] === 'empty') empties.push(c);
      }
      if (!puppyInRow && empties.length === 1) {
        placeDog(r, empties[0], `Row ${r} has only 1 cell left`, 'colour_unique_row');
        progress = true;
        break;
      }
    }
    if (progress) continue;

    // 3. Single cell in Column
    for (let c = 0; c < n; c++) {
      let puppyInCol = false;
      const empties: number[] = [];
      for (let r = 0; r < n; r++) {
        if (board[r][c] === 'puppy') { puppyInCol = true; break; }
        if (board[r][c] === 'empty') empties.push(r);
      }
      if (!puppyInCol && empties.length === 1) {
        placeDog(empties[0], c, `Column ${c} has only 1 cell left`, 'colour_unique_column');
        progress = true;
        break;
      }
    }
    if (progress) continue;

    // 4. Line-Region interaction: Region confined to 1 row
    for (const reg of puzzle.regions) {
      const hasPuppy = reg.cells.some(c => board[c.row][c.col] === 'puppy');
      if (hasPuppy) continue;
      const empties = reg.cells.filter(c => board[c.row][c.col] === 'empty');
      if (empties.length > 1) {
        const firstRow = empties[0].row;
        if (empties.every(c => c.row === firstRow)) {
          for (let c = 0; c < n; c++) {
            if (board[firstRow][c] === 'empty' && !reg.cells.some(rc => rc.row === firstRow && rc.col === c)) {
              if (markX(firstRow, c, `Region ${reg.id} must be in Row ${firstRow}`, 'line_region_confinement')) {
                progress = true;
              }
            }
          }
        }
      }
    }
    if (progress) continue;

    // 5. Line-Region interaction: Region confined to 1 col
    for (const reg of puzzle.regions) {
      const hasPuppy = reg.cells.some(c => board[c.row][c.col] === 'puppy');
      if (hasPuppy) continue;
      const empties = reg.cells.filter(c => board[c.row][c.col] === 'empty');
      if (empties.length > 1) {
        const firstCol = empties[0].col;
        if (empties.every(c => c.col === firstCol)) {
          for (let r = 0; r < n; r++) {
            if (board[r][firstCol] === 'empty' && !reg.cells.some(rc => rc.row === r && rc.col === firstCol)) {
              if (markX(r, firstCol, `Region ${reg.id} must be in Col ${firstCol}`, 'line_region_confinement')) {
                progress = true;
              }
            }
          }
        }
      }
    }
    if (progress) continue;

    // 6. Row confined to 1 region
    for (let r = 0; r < n; r++) {
      let puppyInRow = false;
      const empties: { row: number; col: number; regId: number }[] = [];
      for (let c = 0; c < n; c++) {
        if (board[r][c] === 'puppy') { puppyInRow = true; break; }
        if (board[r][c] === 'empty') {
          const reg = puzzle.regions.find(rg => rg.cells.some(cell => cell.row === r && cell.col === c));
          if (reg) empties.push({ row: r, col: c, regId: reg.id });
        }
      }
      if (!puppyInRow && empties.length > 1) {
        const firstRegId = empties[0].regId;
        if (empties.every(e => e.regId === firstRegId)) {
          const reg = puzzle.regions.find(rg => rg.id === firstRegId)!;
          for (const rc of reg.cells) {
            if (rc.row !== r && board[rc.row][rc.col] === 'empty') {
              if (markX(rc.row, rc.col, `Row ${r} must be in Region ${firstRegId}`, 'line_region_confinement')) {
                progress = true;
              }
            }
          }
        }
      }
    }
    if (progress) continue;

    // 7. Col confined to 1 region
    for (let c = 0; c < n; c++) {
      let puppyInCol = false;
      const empties: { row: number; col: number; regId: number }[] = [];
      for (let r = 0; r < n; r++) {
        if (board[r][c] === 'puppy') { puppyInCol = true; break; }
        if (board[r][c] === 'empty') {
          const reg = puzzle.regions.find(rg => rg.cells.some(cell => cell.row === r && cell.col === c));
          if (reg) empties.push({ row: r, col: c, regId: reg.id });
        }
      }
      if (!puppyInCol && empties.length > 1) {
        const firstRegId = empties[0].regId;
        if (empties.every(e => e.regId === firstRegId)) {
          const reg = puzzle.regions.find(rg => rg.id === firstRegId)!;
          for (const rc of reg.cells) {
            if (rc.col !== c && board[rc.row][rc.col] === 'empty') {
              if (markX(rc.row, rc.col, `Col ${c} must be in Region ${firstRegId}`, 'line_region_confinement')) {
                progress = true;
              }
            }
          }
        }
      }
    }
    if (progress) continue;

    // 8. Starvation / Unit-choking deduction (Bottleneck / 1-step lookahead constraint):
    // If placing a puppy at (r, c) starves ANY row, col, or region of having a valid placement, (r, c) is X
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (board[r][c] === 'empty') {
          let starves = false;

          // Check all unfilled rows
          for (let tr = 0; tr < n; tr++) {
            if (tr === r) continue;
            let rowHasPuppy = false;
            for (let tc = 0; tc < n; tc++) if (board[tr][tc] === 'puppy') { rowHasPuppy = true; break; }
            if (rowHasPuppy) continue;

            let validCount = 0;
            for (let tc = 0; tc < n; tc++) {
              if (board[tr][tc] === 'empty' && tc !== c && (Math.abs(tr - r) > 1 || Math.abs(tc - c) > 1)) {
                validCount++;
              }
            }
            if (validCount === 0) { starves = true; break; }
          }

          // Check all unfilled columns
          if (!starves) {
            for (let tc = 0; tc < n; tc++) {
              if (tc === c) continue;
              let colHasPuppy = false;
              for (let tr = 0; tr < n; tr++) if (board[tr][tc] === 'puppy') { colHasPuppy = true; break; }
              if (colHasPuppy) continue;

              let validCount = 0;
              for (let tr = 0; tr < n; tr++) {
                if (board[tr][tc] === 'empty' && tr !== r && (Math.abs(tr - r) > 1 || Math.abs(tc - c) > 1)) {
                  validCount++;
                }
              }
              if (validCount === 0) { starves = true; break; }
            }
          }

          // Check all unfilled regions
          if (!starves) {
            const placedReg = puzzle.regions.find(rg => rg.cells.some(cell => cell.row === r && cell.col === c))!;
            for (const tReg of puzzle.regions) {
              if (tReg.id === placedReg.id) continue;
              const regHasPuppy = tReg.cells.some(cell => board[cell.row][cell.col] === 'puppy');
              if (regHasPuppy) continue;

              let validCount = 0;
              for (const cell of tReg.cells) {
                if (board[cell.row][cell.col] === 'empty' && cell.row !== r && cell.col !== c &&
                    (Math.abs(cell.row - r) > 1 || Math.abs(cell.col - c) > 1)) {
                  validCount++;
                }
              }
              if (validCount === 0) { starves = true; break; }
            }
          }

          if (starves) {
            if (markX(r, c, 'Placing puppy here starves another unit', 'neighbour_elimination')) {
              progress = true;
              break;
            }
          }
        }
      }
      if (progress) break;
    }
  }

  return {
    solved: placements === n,
    steps,
    placements,
    eliminations,
    techniques,
    stuckAtStep: steps.length,
    remainingPuppies: n - placements,
  };
}

async function run() {
  console.log('--- COMPREHENSIVE HUMAN DEDUCTION AUDIT (51-100) ---');
  let solvedCount = 0;
  const auditList = [];

  for (let lvl = 51; lvl <= 100; lvl++) {
    const puzzle = puzzles.find(p => p.level === lvl)!;
    const res = simulateAdvancedHumanSolver(puzzle);
    if (res.solved) solvedCount++;
    auditList.push({
      level: lvl,
      grid: `${puzzle.gridSize}x${puzzle.gridSize}`,
      diff: puzzle.difficulty,
      solved: res.solved,
      steps: res.steps.length,
      placed: res.placements,
      elim: res.eliminations,
      techs: Array.from(res.techniques),
      firstMove: res.steps[0]?.reason || 'None',
    });
  }

  console.log(`\nSOLVED: ${solvedCount}/50 levels completely without guessing!`);
  
  const byTier: Record<string, { total: number; solved: number }> = {};
  for (const a of auditList) {
    const key = `${a.grid} (${a.diff})`;
    if (!byTier[key]) byTier[key] = { total: 0, solved: 0 };
    byTier[key].total++;
    if (a.solved) byTier[key].solved++;
  }
  console.table(byTier);

  fs.writeFileSync('scripts/advanced_audit.json', JSON.stringify(auditList, null, 2));
}

run();
