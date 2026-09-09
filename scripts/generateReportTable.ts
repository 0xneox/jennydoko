import { puzzles } from '../src/data/puzzles';

interface StepLog {
  type: 'puppy' | 'mark';
  row: number;
  col: number;
  reason: string;
  technique: string;
}

function solveLevel(puzzle: any) {
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

    for (let col = 0; col < n; col++) if (col !== c) markX(r, col, `Row ${r} elim`, 'row_elimination');
    for (let row = 0; row < n; row++) if (row !== r) markX(row, c, `Col ${c} elim`, 'column_elimination');
    const reg = puzzle.regions.find((rg: any) => rg.cells.some((cell: any) => cell.row === r && cell.col === c));
    if (reg) {
      for (const cell of reg.cells) {
        if (cell.row !== r || cell.col !== c) markX(cell.row, cell.col, `Reg ${reg.id} elim`, 'region_elimination');
      }
    }
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n) markX(nr, nc, `Neighbor elim`, 'neighbour_elimination');
      }
    }
  }

  let progress = true;
  while (progress && placements < n) {
    progress = false;

    // 1. Single cell in Region
    for (const reg of puzzle.regions) {
      if (reg.cells.some((c: any) => board[c.row][c.col] === 'puppy')) continue;
      const empties = reg.cells.filter((c: any) => board[c.row][c.col] === 'empty');
      if (empties.length === 1) {
        placeDog(empties[0].row, empties[0].col, `Region ${reg.id} single cell`, 'single_cell_colour');
        progress = true; break;
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
        placeDog(r, empties[0], `Row ${r} single cell`, 'colour_unique_row');
        progress = true; break;
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
        placeDog(empties[0], c, `Col ${c} single cell`, 'colour_unique_column');
        progress = true; break;
      }
    }
    if (progress) continue;

    // 4. Line-Region interaction: Region in 1 row
    for (const reg of puzzle.regions) {
      if (reg.cells.some((c: any) => board[c.row][c.col] === 'puppy')) continue;
      const empties = reg.cells.filter((c: any) => board[c.row][c.col] === 'empty');
      if (empties.length > 1) {
        const firstRow = empties[0].row;
        if (empties.every((c: any) => c.row === firstRow)) {
          for (let c = 0; c < n; c++) {
            if (board[firstRow][c] === 'empty' && !reg.cells.some((rc: any) => rc.row === firstRow && rc.col === c)) {
              if (markX(firstRow, c, `Reg ${reg.id} in row ${firstRow}`, 'line_region_confinement')) progress = true;
            }
          }
        }
      }
    }
    if (progress) continue;

    // 5. Line-Region interaction: Region in 1 col
    for (const reg of puzzle.regions) {
      if (reg.cells.some((c: any) => board[c.row][c.col] === 'puppy')) continue;
      const empties = reg.cells.filter((c: any) => board[c.row][c.col] === 'empty');
      if (empties.length > 1) {
        const firstCol = empties[0].col;
        if (empties.every((c: any) => c.col === firstCol)) {
          for (let r = 0; r < n; r++) {
            if (board[r][firstCol] === 'empty' && !reg.cells.some((rc: any) => rc.row === r && rc.col === firstCol)) {
              if (markX(r, firstCol, `Reg ${reg.id} in col ${firstCol}`, 'line_region_confinement')) progress = true;
            }
          }
        }
      }
    }
    if (progress) continue;

    // 6. Row in 1 region
    for (let r = 0; r < n; r++) {
      let puppyInRow = false;
      const empties: { row: number; col: number; regId: number }[] = [];
      for (let c = 0; c < n; c++) {
        if (board[r][c] === 'puppy') { puppyInRow = true; break; }
        if (board[r][c] === 'empty') {
          const reg = puzzle.regions.find((rg: any) => rg.cells.some((cell: any) => cell.row === r && cell.col === c));
          if (reg) empties.push({ row: r, col: c, regId: reg.id });
        }
      }
      if (!puppyInRow && empties.length > 1) {
        const firstRegId = empties[0].regId;
        if (empties.every(e => e.regId === firstRegId)) {
          const reg = puzzle.regions.find((rg: any) => rg.id === firstRegId)!;
          for (const rc of reg.cells) {
            if (rc.row !== r && board[rc.row][rc.col] === 'empty') {
              if (markX(rc.row, rc.col, `Row ${r} in reg ${firstRegId}`, 'line_region_confinement')) progress = true;
            }
          }
        }
      }
    }
    if (progress) continue;

    // 7. Col in 1 region
    for (let c = 0; c < n; c++) {
      let puppyInCol = false;
      const empties: { row: number; col: number; regId: number }[] = [];
      for (let r = 0; r < n; r++) {
        if (board[r][c] === 'puppy') { puppyInCol = true; break; }
        if (board[r][c] === 'empty') {
          const reg = puzzle.regions.find((rg: any) => rg.cells.some((cell: any) => cell.row === r && cell.col === c));
          if (reg) empties.push({ row: r, col: c, regId: reg.id });
        }
      }
      if (!puppyInCol && empties.length > 1) {
        const firstRegId = empties[0].regId;
        if (empties.every(e => e.regId === firstRegId)) {
          const reg = puzzle.regions.find((rg: any) => rg.id === firstRegId)!;
          for (const rc of reg.cells) {
            if (rc.col !== c && board[rc.row][rc.col] === 'empty') {
              if (markX(rc.row, rc.col, `Col ${c} in reg ${firstRegId}`, 'line_region_confinement')) progress = true;
            }
          }
        }
      }
    }
    if (progress) continue;

    // 8. Locked pair (X-Wing)
    for (let r1 = 0; r1 < n; r1++) {
      if (board[r1].some(v => v === 'puppy')) continue;
      const cols1: number[] = [];
      for (let c = 0; c < n; c++) if (board[r1][c] === 'empty') cols1.push(c);
      if (cols1.length === 2) {
        for (let r2 = r1 + 1; r2 < n; r2++) {
          if (board[r2].some(v => v === 'puppy')) continue;
          const cols2: number[] = [];
          for (let c = 0; c < n; c++) if (board[r2][c] === 'empty') cols2.push(c);
          if (cols2.length === 2 && cols1[0] === cols2[0] && cols1[1] === cols2[1]) {
            for (let r = 0; r < n; r++) {
              if (r !== r1 && r !== r2) {
                if (markX(r, cols1[0], `Locked pair in cols`, 'locked_pair')) progress = true;
                if (markX(r, cols1[1], `Locked pair in cols`, 'locked_pair')) progress = true;
              }
            }
          }
        }
      }
    }
    if (progress) continue;

    // 9. Bottleneck / starvation deduction
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (board[r][c] === 'empty') {
          let starves = false;
          for (let tr = 0; tr < n; tr++) {
            if (tr === r || board[tr].some(v => v === 'puppy')) continue;
            let count = 0;
            for (let tc = 0; tc < n; tc++) {
              if (board[tr][tc] === 'empty' && tc !== c && (Math.abs(tr - r) > 1 || Math.abs(tc - c) > 1)) count++;
            }
            if (count === 0) { starves = true; break; }
          }
          if (!starves) {
            for (let tc = 0; tc < n; tc++) {
              if (tc === c) continue;
              let hasP = false;
              for (let tr = 0; tr < n; tr++) if (board[tr][tc] === 'puppy') { hasP = true; break; }
              if (hasP) continue;
              let count = 0;
              for (let tr = 0; tr < n; tr++) {
                if (board[tr][tc] === 'empty' && tr !== r && (Math.abs(tr - r) > 1 || Math.abs(tc - c) > 1)) count++;
              }
              if (count === 0) { starves = true; break; }
            }
          }
          if (!starves) {
            const placedReg = puzzle.regions.find((rg: any) => rg.cells.some((cell: any) => cell.row === r && cell.col === c))!;
            for (const tReg of puzzle.regions) {
              if (tReg.id === placedReg.id || tReg.cells.some((cell: any) => board[cell.row][cell.col] === 'puppy')) continue;
              let count = 0;
              for (const cell of tReg.cells) {
                if (board[cell.row][cell.col] === 'empty' && cell.row !== r && cell.col !== c &&
                    (Math.abs(cell.row - r) > 1 || Math.abs(cell.col - c) > 1)) count++;
              }
              if (count === 0) { starves = true; break; }
            }
          }
          if (starves) {
            if (markX(r, c, 'Starves unit', 'neighbour_elimination')) {
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
    stepsCount: steps.length,
    placements,
    eliminations,
    techniques: Array.from(techniques),
  };
}

const tableData = [];
for (let lvl = 51; lvl <= 100; lvl++) {
  const p = puzzles.find(x => x.level === lvl)!;
  const res = solveLevel(p);
  tableData.push({
    level: lvl,
    grid: `${p.gridSize}x${p.gridSize}`,
    difficulty: p.difficulty,
    solvingSteps: res.stepsCount,
    techniques: res.techniques.map(t => {
      if (t === 'single_cell_colour') return 'Single-Cell';
      if (t === 'colour_unique_row') return 'Row Unique';
      if (t === 'colour_unique_column') return 'Col Unique';
      if (t === 'row_elimination') return 'Row Elim';
      if (t === 'column_elimination') return 'Col Elim';
      if (t === 'region_elimination') return 'Region Elim';
      if (t === 'neighbour_elimination') return 'Adjacency Elim';
      if (t === 'line_region_confinement') return 'Confinement';
      if (t === 'locked_pair') return 'Locked Pair';
      return t;
    }).join(', '),
    guessingRequired: res.solved ? 'No' : 'Yes',
    quality: res.solved ? 'High' : 'Needs replacement',
  });
}

// Format as markdown table
console.log('| Level | Grid | Difficulty | Solving steps | Techniques | Guessing required? | Quality |');
console.log('| :---: | :---: | :---: | :---: | :--- | :---: | :---: |');
for (const row of tableData) {
  console.log(`| ${row.level} | ${row.grid} | ${row.difficulty} | ${row.solvingSteps} | ${row.techniques} | ${row.guessingRequired} | ${row.quality} |`);
}
