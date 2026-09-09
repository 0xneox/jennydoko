import { puzzles } from '../src/data/puzzles';
import { simulateAdvancedHumanSolver } from './advancedAudit';

const p100 = puzzles.find(p => p.level === 100)!;
console.log('--- LEVEL 100 ANALYSIS ---');
console.log('Grid:', p100.gridSize, 'x', p100.gridSize);
console.log('Solution:', p100.solution);

// Print regions
const n = p100.gridSize;
console.log('Regions layout:');
for (let r = 0; r < n; r++) {
  let rowStr = '';
  for (let c = 0; c < n; c++) {
    const reg = p100.regions.find(rg => rg.cells.some(cell => cell.row === r && cell.col === c));
    rowStr += (reg ? reg.id.toString().padStart(2, ' ') : '??') + ' ';
  }
  console.log(rowStr);
}

const res = simulateAdvancedHumanSolver(p100);
console.log('\nResult:', res.solved ? 'SOLVED' : 'STUCK');
console.log('Placements:', res.placements, '/', n);
console.log('Eliminations:', res.eliminations);
console.log('Steps:', res.steps.length);
console.log('\nLast 10 steps:');
for (const step of res.steps.slice(-10)) {
  console.log(`  ${step.type}: (${step.row}, ${step.col}) - ${step.reason}`);
}

// Recreate board at stuck point to see what cells are empty
const board: string[][] = Array.from({ length: n }, () => Array(n).fill('.'));
for (const step of res.steps) {
  if (step.type === 'puppy') board[step.row][step.col] = 'P';
  if (step.type === 'mark') board[step.row][step.col] = 'X';
}

console.log('\nStuck Board:');
for (let r = 0; r < n; r++) {
  console.log(board[r].map(c => c.padStart(2, ' ')).join(' '));
}

// Find remaining empty cells
const remainingEmpties: { r: number; c: number; regId: number }[] = [];
for (let r = 0; r < n; r++) {
  for (let c = 0; c < n; c++) {
    if (board[r][c] === '.') {
      const reg = p100.regions.find(rg => rg.cells.some(cell => cell.row === r && cell.col === c))!;
      remainingEmpties.push({ r, c, regId: reg.id });
    }
  }
}
console.log('\nRemaining empty cells count:', remainingEmpties.length);
console.log(remainingEmpties);
