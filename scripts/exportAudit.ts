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

function simulateHumanSolver(puzzle: PuzzleData) {
  const n = puzzle.gridSize;
  const board: ('empty' | 'puppy' | 'X')[][] = Array.from({ length: n }, () => Array(n).fill('empty'));
  const solutionSet = new Set(puzzle.solution.map(s => `${s.row},${s.col}`));
  const steps: StepLog[] = [];
  const techniques = new Set<string>();
  let placements = 0;
  let eliminations = 0;

  function markX(r: number, c: number, reason: string, tech: string) {
    if (board[r][c] === 'empty') {
      board[r][c] = 'X';
      eliminations++;
      steps.push({ type: 'mark', row: r, col: c, reason, technique: tech });
      techniques.add(tech);
    }
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
        const cell = empties[0];
        placeDog(cell.row, cell.col, `Region ${reg.id} has only 1 cell left`, 'single_cell_colour');
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
              markX(firstRow, c, `Region ${reg.id} must be in Row ${firstRow}`, 'line_region_confinement');
              progress = true;
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
              markX(r, firstCol, `Region ${reg.id} must be in Col ${firstCol}`, 'line_region_confinement');
              progress = true;
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
              markX(rc.row, rc.col, `Row ${r} must be in Region ${firstRegId}`, 'line_region_confinement');
              progress = true;
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
              markX(rc.row, rc.col, `Col ${c} must be in Region ${firstRegId}`, 'line_region_confinement');
              progress = true;
            }
          }
        }
      }
    }
  }

  // Also test 2-cell block adjacency:
  // If a region has only 2 empty cells and they share row or col, any cells touching both can be eliminated
  // Let's see if that helps any stuck puzzles

  return {
    solved: placements === n,
    stepsCount: steps.length,
    placements,
    eliminations,
    techniques: Array.from(techniques),
    firstMove: steps[0] ? `${steps[0].technique} at (${steps[0].row},${steps[0].col})` : 'None',
  };
}

// Also test what engine.getHint() does from initial state
function testHints(puzzle: PuzzleData) {
  const engine = new GameEngine(puzzle);
  const h1 = engine.getHint(1);
  const h2 = engine.getHint(2);
  const h3 = engine.getHint(3);
  const h4 = engine.getHint(4);

  const solutionSet = new Set(puzzle.solution.map(s => `${s.row},${s.col}`));
  let hintValid = true;
  let error = '';

  if (!h1 || !h2 || !h3 || !h4) {
    hintValid = false;
    error = 'Missing hints from initial state';
  } else if (h4.targetCell) {
    const key = `${h4.targetCell.row},${h4.targetCell.col}`;
    if (!solutionSet.has(key)) {
      hintValid = false;
      error = `Hint 4 target (${key}) is NOT in solution! Tech: ${h4.technique}`;
    }
  }
  return { hintValid, error, hintTechnique: h4?.technique, hintTarget: h4?.targetCell };
}

// Region sensible layout check:
// Max region size, min region size, connectivity
function checkRegions(puzzle: PuzzleData) {
  const n = puzzle.gridSize;
  const sizes = puzzle.regions.map(r => r.cells.length);
  const minSize = Math.min(...sizes);
  const maxSize = Math.max(...sizes);
  const avgSize = (n * n) / n; // = n
  return { minSize, maxSize, sensible: minSize >= 1 && maxSize <= n * 4 };
}

const auditData = [];
for (let lvl = 51; lvl <= 100; lvl++) {
  const puzzle = puzzles.find(p => p.level === lvl)!;
  const human = simulateHumanSolver(puzzle);
  const hints = testHints(puzzle);
  const regions = checkRegions(puzzle);

  auditData.push({
    level: lvl,
    gridSize: puzzle.gridSize,
    difficulty: puzzle.difficulty,
    humanSolved: human.solved,
    placements: human.placements,
    eliminations: human.eliminations,
    steps: human.stepsCount,
    techniques: human.techniques,
    firstMove: human.firstMove,
    hintValid: hints.hintValid,
    hintError: hints.error,
    hintTech: hints.hintTechnique,
    regionsSensible: regions.sensible,
    minRegSize: regions.minSize,
    maxRegSize: regions.maxSize,
  });
}

fs.writeFileSync('scripts/audit_output.json', JSON.stringify(auditData, null, 2));
console.log('Saved audit data to scripts/audit_output.json');
