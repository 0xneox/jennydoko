import { PuzzleGenerator } from '../src/game/puzzleGenerator';
import { PuzzleData } from '../src/game/types';
import { DifficultyLevel } from '../src/game/types';

/**
 * Generate additional puzzles for the game
 */
function generateAdditionalPuzzles(): PuzzleData[] {
  const newPuzzles: PuzzleData[] = [];

  // Generate Level 3 (6x6, medium)
  const level3 = PuzzleGenerator.generatePuzzle(6, 'medium', 3);
  if (level3) {
    newPuzzles.push(level3);
    console.log('Generated Level 3 (6x6, medium)');
  }

  // Generate Level 4 (6x6, medium)
  const level4 = PuzzleGenerator.generatePuzzle(6, 'medium', 4);
  if (level4) {
    newPuzzles.push(level4);
    console.log('Generated Level 4 (6x6, medium)');
  }

  // Generate Level 5 (7x7, hard)
  const level5 = PuzzleGenerator.generatePuzzle(7, 'hard', 5);
  if (level5) {
    newPuzzles.push(level5);
    console.log('Generated Level 5 (7x7, hard)');
  }

  // Generate Level 6 (7x7, hard)
  const level6 = PuzzleGenerator.generatePuzzle(7, 'hard', 6);
  if (level6) {
    newPuzzles.push(level6);
    console.log('Generated Level 6 (7x7, hard)');
  }

  // Generate Level 7 (8x8, expert)
  const level7 = PuzzleGenerator.generatePuzzle(8, 'expert', 7);
  if (level7) {
    newPuzzles.push(level7);
    console.log('Generated Level 7 (8x8, expert)');
  }

  // Generate Level 8 (8x8, expert)
  const level8 = PuzzleGenerator.generatePuzzle(8, 'expert', 8);
  if (level8) {
    newPuzzles.push(level8);
    console.log('Generated Level 8 (8x8, expert)');
  }

  return newPuzzles;
}

// Generate puzzles
const newPuzzles = generateAdditionalPuzzles();

// Output the puzzle data in TypeScript format
console.log('\n=== Generated Puzzle Data ===\n');
newPuzzles.forEach((puzzle, index) => {
  const levelNum = index + 3;
  console.log(`export const level${levelNum}: PuzzleData = {`);
  console.log(`  level: ${levelNum},`);
  console.log(`  gridSize: ${puzzle.gridSize},`);
  console.log(`  regions: ${JSON.stringify(puzzle.regions, null, 2)},`);
  console.log(`  solution: ${JSON.stringify(puzzle.solution, null, 2)},`);
  console.log(`  difficulty: '${puzzle.difficulty}',`);
  console.log(`  techniquesRequired: ${JSON.stringify(puzzle.techniquesRequired)},`);
  console.log(`  techniquesIntroduced: ${JSON.stringify(puzzle.techniquesIntroduced)},`);
  console.log(`  hasLogicalStart: ${puzzle.hasLogicalStart},`);
  console.log(`};\n`);
});

console.log(`\nTotal puzzles generated: ${newPuzzles.length}`);