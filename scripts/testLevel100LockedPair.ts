import { puzzles } from '../src/data/puzzles';

const p100 = puzzles.find(p => p.level === 100)!;
const n = p100.gridSize;
const board: string[][] = Array.from({ length: n }, () => Array(n).fill('.'));

function mark(r: number, c: number, reason: string): boolean {
  if (board[r][c] === '.') {
    board[r][c] = 'X';
    return true;
  }
  return false;
}

function place(r: number, c: number, reason: string) {
  board[r][c] = 'P';
  for (let col = 0; col < n; col++) if (col !== c) mark(r, col, 'row elim');
  for (let row = 0; row < n; row++) if (row !== r) mark(row, c, 'col elim');
  const reg = p100.regions.find(rg => rg.cells.some(cell => cell.row === r && cell.col === c))!;
  for (const cell of reg.cells) if (cell.row !== r || cell.col !== c) mark(cell.row, cell.col, 'reg elim');
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n) mark(nr, nc, 'diag elim');
    }
  }
}

// Pre-place known moves from initial state
place(0, 8, 'Region 1 single cell');
place(6, 9, 'Region 7 single cell');
place(9, 3, 'Region 10 single cell');

// Run locked set check (2 rows sharing exactly the same 2 columns)
function runSolver() {
  let changed = true;
  while (changed) {
    changed = false;

    // Single cell in region
    for (const reg of p100.regions) {
      if (reg.cells.some(c => board[c.row][c.col] === 'P')) continue;
      const empties = reg.cells.filter(c => board[c.row][c.col] === '.');
      if (empties.length === 1) {
        place(empties[0].row, empties[0].col, `Reg ${reg.id} single cell`);
        changed = true; break;
      }
    }
    if (changed) continue;

    // Single cell in row
    for (let r = 0; r < n; r++) {
      if (board[r].some(v => v === 'P')) continue;
      const empties: number[] = [];
      for (let c = 0; c < n; c++) if (board[r][c] === '.') empties.push(c);
      if (empties.length === 1) {
        place(r, empties[0], `Row ${r} single cell`);
        changed = true; break;
      }
    }
    if (changed) continue;

    // Single cell in col
    for (let c = 0; c < n; c++) {
      let hasP = false;
      for (let r = 0; r < n; r++) if (board[r][c] === 'P') { hasP = true; break; }
      if (hasP) continue;
      const empties: number[] = [];
      for (let r = 0; r < n; r++) if (board[r][c] === '.') empties.push(r);
      if (empties.length === 1) {
        place(empties[0], c, `Col ${c} single cell`);
        changed = true; break;
      }
    }
    if (changed) continue;

    // Line-region confinement
    for (const reg of p100.regions) {
      if (reg.cells.some(c => board[c.row][c.col] === 'P')) continue;
      const empties = reg.cells.filter(c => board[c.row][c.col] === '.');
      if (empties.length > 1) {
        const row0 = empties[0].row;
        if (empties.every(c => c.row === row0)) {
          for (let c = 0; c < n; c++) {
            if (board[row0][c] === '.' && !reg.cells.some(rc => rc.row === row0 && rc.col === c)) {
              if (mark(row0, c, `Reg ${reg.id} in row ${row0}`)) changed = true;
            }
          }
        }
        const col0 = empties[0].col;
        if (empties.every(c => c.col === col0)) {
          for (let r = 0; r < n; r++) {
            if (board[r][col0] === '.' && !reg.cells.some(rc => rc.row === r && rc.col === col0)) {
              if (mark(r, col0, `Reg ${reg.id} in col ${col0}`)) changed = true;
            }
          }
        }
      }
    }
    if (changed) continue;

    // Locked set: 2 rows having empty cells in the exact same 2 columns
    for (let r1 = 0; r1 < n; r1++) {
      if (board[r1].some(v => v === 'P')) continue;
      const cols1: number[] = [];
      for (let c = 0; c < n; c++) if (board[r1][c] === '.') cols1.push(c);
      if (cols1.length === 2) {
        for (let r2 = r1 + 1; r2 < n; r2++) {
          if (board[r2].some(v => v === 'P')) continue;
          const cols2: number[] = [];
          for (let c = 0; c < n; c++) if (board[r2][c] === '.') cols2.push(c);
          if (cols2.length === 2 && cols1[0] === cols2[0] && cols1[1] === cols2[1]) {
            // Rows r1 and r2 exclusively occupy cols1[0] and cols1[1]
            // Eliminate cols1[0] and cols1[1] from all other rows
            for (let r = 0; r < n; r++) {
              if (r !== r1 && r !== r2) {
                if (mark(r, cols1[0], `Locked pair in cols ${cols1.join(',')}`)) changed = true;
                if (mark(r, cols1[1], `Locked pair in cols ${cols1.join(',')}`)) changed = true;
              }
            }
          }
        }
      }
    }
    if (changed) continue;

    // Starvation / unit choking
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (board[r][c] === '.') {
          let starves = false;
          for (let tr = 0; tr < n; tr++) {
            if (tr === r || board[tr].some(v => v === 'P')) continue;
            let count = 0;
            for (let tc = 0; tc < n; tc++) {
              if (board[tr][tc] === '.' && tc !== c && (Math.abs(tr - r) > 1 || Math.abs(tc - c) > 1)) count++;
            }
            if (count === 0) { starves = true; break; }
          }
          if (!starves) {
            for (let tc = 0; tc < n; tc++) {
              if (tc === c) continue;
              let hasP = false;
              for (let tr = 0; tr < n; tr++) if (board[tr][tc] === 'P') { hasP = true; break; }
              if (hasP) continue;
              let count = 0;
              for (let tr = 0; tr < n; tr++) {
                if (board[tr][tc] === '.' && tr !== r && (Math.abs(tr - r) > 1 || Math.abs(tc - c) > 1)) count++;
              }
              if (count === 0) { starves = true; break; }
            }
          }
          if (starves) {
            if (mark(r, c, 'Starves unit')) {
              changed = true;
              break;
            }
          }
        }
      }
      if (changed) break;
    }
  }

  let pCount = 0;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (board[r][c] === 'P') pCount++;
  console.log('Placed puppies:', pCount, '/', n);
  console.log('Is Level 100 100% Solved?', pCount === n);
}

runSolver();
