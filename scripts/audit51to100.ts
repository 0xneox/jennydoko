import { puzzles } from '../src/data/puzzles';
import { GameEngine } from '../src/game/engine';
import { PuzzleSolver } from '../src/game/solver';
import { PuzzleData, DeductionTechnique } from '../src/game/types';

interface AuditResult {
  level: number;
  gridSize: number;
  difficulty: string;
  solved: boolean;
  stepsCount: number;
  techniquesUsed: Set<DeductionTechnique>;
  guessingRequired: boolean;
  deadEnd: boolean;
  hintsValid: boolean;
  firstMoveValid: boolean;
  firstMoveDesc: string;
  excessiveXCount: number;
  totalPlacements: number;
  totalEliminations: number;
  issues: string[];
}

function auditLevel(puzzle: PuzzleData): AuditResult {
  const engine = new GameEngine(puzzle);
  const solutionSet = new Set(puzzle.solution.map(s => `${s.row},${s.col}`));
  
  const techniquesUsed = new Set<DeductionTechnique>();
  const issues: string[] = [];
  let stepsCount = 0;
  let totalPlacements = 0;
  let totalEliminations = 0;
  let hintsValid = true;
  let firstMoveValid = false;
  let firstMoveDesc = '';

  const maxSteps = puzzle.gridSize * puzzle.gridSize * 3;
  let iteration = 0;

  while (!engine.getState().isComplete && iteration < maxSteps) {
    iteration++;

    // Check hint at current state
    const hint1 = engine.getHint(1);
    const hint2 = engine.getHint(2);
    const hint3 = engine.getHint(3);
    const hint4 = engine.getHint(4);

    if (!hint1 || !hint2 || !hint3 || !hint4) {
      // No hint available -> solver stuck?
      break;
    }

    // Verify hint coherence
    if (hint1.technique !== hint2.technique || 
        hint2.technique !== hint3.technique || 
        hint3.technique !== hint4.technique) {
      hintsValid = false;
      issues.push(`Hint technique mismatch at step ${iteration}: h1=${hint1.technique}, h4=${hint4.technique}`);
    }

    // If hint suggests a puppy placement, verify it matches solution
    if (['single_cell_colour', 'colour_unique_row', 'colour_unique_column'].includes(hint4.technique)) {
      if (!hint4.targetCell) {
        hintsValid = false;
        issues.push(`Hint 4 missing targetCell for placement technique ${hint4.technique}`);
      } else {
        const key = `${hint4.targetCell.row},${hint4.targetCell.col}`;
        if (!solutionSet.has(key)) {
          hintsValid = false;
          issues.push(`Fake/wrong hint: suggested (${key}) not in solution!`);
        }
      }
    }

    // Get deductions from solver
    const solver = new PuzzleSolver(engine.getState().board);
    const deductions = solver.findAllDeductions();

    if (deductions.length === 0) {
      break;
    }

    if (iteration === 1) {
      firstMoveValid = true;
      firstMoveDesc = `${deductions[0].technique} at (${deductions[0].affectedCell.row},${deductions[0].affectedCell.col})`;
    }

    // Prioritize puppy placements
    const placementDeductions = deductions.filter(d =>
      ['single_cell_colour', 'colour_unique_row', 'colour_unique_column'].includes(d.technique)
    );

    if (placementDeductions.length > 0) {
      const deduction = placementDeductions[0];
      techniquesUsed.add(deduction.technique);
      const { row, col } = deduction.affectedCell;
      const key = `${row},${col}`;

      if (!solutionSet.has(key)) {
        issues.push(`Solver deduced placement at (${key}) which is NOT in solution!`);
      }

      const placed = engine.placePuppy(row, col);
      if (!placed) {
        issues.push(`engine.placePuppy failed at (${row}, ${col})`);
        break;
      }
      totalPlacements++;
      stepsCount++;

      // After placing, the player logically marks row, col, region, neighbors as X
      // In GameEngine, does it auto-mark or does solver deduce eliminations?
      // Let's see: PuzzleSolver has row_elimination, column_elimination, region_elimination, neighbour_elimination
    } else {
      // Must do elimination deduction
      const elimDeduction = deductions[0];
      techniquesUsed.add(elimDeduction.technique);

      let markedAny = false;
      for (const cell of elimDeduction.eliminatedCells) {
        const currentVal = engine.getState().board.cells[cell.row][cell.col].value;
        if (currentVal === 'empty') {
          // Verify we aren't marking a cell that is in the solution!
          if (solutionSet.has(`${cell.row},${cell.col}`)) {
            issues.push(`Elimination attempted to mark solution cell (${cell.row},${cell.col}) as X!`);
          }
          engine.markCell(cell.row, cell.col);
          markedAny = true;
          totalEliminations++;
          stepsCount++;
        }
      }

      if (!markedAny) {
        // Deduced eliminated cells already marked? Advance solver
        break;
      }
    }
  }

  const isComplete = engine.getState().isComplete;
  const deadEnd = !isComplete;
  const guessingRequired = !isComplete;

  return {
    level: puzzle.level,
    gridSize: puzzle.gridSize,
    difficulty: puzzle.difficulty,
    solved: isComplete,
    stepsCount,
    techniquesUsed,
    guessingRequired,
    deadEnd,
    hintsValid,
    firstMoveValid,
    firstMoveDesc,
    excessiveXCount: totalEliminations,
    totalPlacements,
    totalEliminations,
    issues,
  };
}

async function run() {
  console.log('Running audit for levels 51 to 100...\n');
  const results: AuditResult[] = [];

  for (let lvl = 51; lvl <= 100; lvl++) {
    const puzzle = puzzles.find(p => p.level === lvl);
    if (!puzzle) {
      console.error(`Level ${lvl} not found in puzzles array!`);
      continue;
    }
    const res = auditLevel(puzzle);
    results.push(res);
  }

  let failedCount = 0;
  for (const r of results) {
    const techStr = Array.from(r.techniquesUsed).join(', ');
    const quality = r.solved && r.hintsValid && !r.guessingRequired ? 'PASS' : 'FAIL';
    if (quality === 'FAIL') failedCount++;
    console.log(`Lvl ${r.level} (${r.gridSize}x${r.gridSize}, ${r.difficulty}): Solved=${r.solved}, Steps=${r.stepsCount} (Placements=${r.totalPlacements}, X=${r.totalEliminations}), Techniques=[${techStr}], Guessing=${r.guessingRequired}, Quality=${quality}`);
    if (r.issues.length > 0) {
      console.log(`   Issues: ${r.issues.join('; ')}`);
    }
  }

  console.log(`\nAudit Complete: ${results.length - failedCount}/${results.length} PASSED.`);
}

run();
