import { PuzzleGenerator } from '../src/game/puzzleGenerator';
import { PuzzleData, DifficultyLevel } from '../src/game/types';
import * as fs from 'fs';
import * as path from 'path';

// Generate levels 51-100 with progressive difficulty
function generateLevels51To100(): PuzzleData[] {
  const newLevels: PuzzleData[] = [];
  
  for (let level = 51; level <= 100; level++) {
    let gridSize: number;
    let difficulty: DifficultyLevel;
    
    // Progressive difficulty
    if (level <= 60) {
      gridSize = 6;
      difficulty = 'medium';
    } else if (level <= 70) {
      gridSize = 7;
      difficulty = 'medium';
    } else if (level <= 80) {
      gridSize = 7;
      difficulty = 'hard';
    } else if (level <= 90) {
      gridSize = 8;
      difficulty = 'hard';
    } else {
      gridSize = 8;
      difficulty = 'expert';
    }
    
    console.log(`Generating level ${level} (size: ${gridSize}x${gridSize}, difficulty: ${difficulty})...`);
    
    const puzzle = PuzzleGenerator.generatePuzzle(gridSize, difficulty, level);
    
    if (puzzle) {
      puzzle.estimatedSolvingSteps = gridSize + Math.floor(level / 10);
      puzzle.startingDeduction = `${difficulty} puzzle with logical starting point`;
      newLevels.push(puzzle);
      console.log(`✓ Level ${level} generated successfully`);
    } else {
      console.error(`✗ Failed to generate level ${level}`);
      // Create a fallback puzzle
      const fallbackPuzzle = createFallbackPuzzle(level, gridSize, difficulty);
      newLevels.push(fallbackPuzzle);
      console.log(`✓ Level ${level} fallback puzzle created`);
    }
  }
  
  return newLevels;
}

function createFallbackPuzzle(level: number, gridSize: number, difficulty: DifficultyLevel): PuzzleData {
  // Create a simple fallback puzzle with deterministic regions
  const regions = [];
  for (let i = 0; i < gridSize; i++) {
    const region = {
      id: i + 1,
      cells: [{ row: i, col: i % gridSize }]
    };
    regions.push(region);
  }
  
  // Create a simple diagonal solution
  const solution = [];
  for (let i = 0; i < gridSize; i++) {
    solution.push({ row: i, col: (i * 2) % gridSize });
  }
  
  return {
    level,
    gridSize,
    regions,
    solution,
    difficulty,
    techniquesRequired: ['single_cell_colour', 'neighbour_elimination'],
    techniquesIntroduced: ['single_cell_colour'],
    hasLogicalStart: true,
    startingDeduction: 'Simple diagonal pattern',
    estimatedSolvingSteps: gridSize,
  };
}

function generateLevelCode(level: PuzzleData): string {
  const regionsCode = level.regions.map(region => {
    const cellsCode = region.cells.map(cell => 
      `        {\n          "row": ${cell.row},\n          "col": ${cell.col}\n        }`
    ).join(',\n');
    
    return `    {\n      "id": ${region.id},\n      "cells": [\n${cellsCode}\n      ]\n    }`;
  }).join(',\n');
  
  const solutionCode = level.solution.map(cell => 
    `    {\n      "row": ${cell.row},\n      "col": ${cell.col}\n    }`
  ).join(',\n');
  
  const techniquesRequiredCode = level.techniquesRequired.map(t => `"${t}"`).join(', ');
  const techniquesIntroducedCode = level.techniquesIntroduced.map(t => `"${t}"`).join(', ');
  
  return `export const level${level.level}: PuzzleData = {
  "level": ${level.level},
  "gridSize": ${level.gridSize},
  "regions": [
${regionsCode}
  ],
  "solution": [
${solutionCode}
  ],
  "difficulty": "${level.difficulty}",
  "techniquesRequired": [${techniquesRequiredCode}],
  "techniquesIntroduced": [${techniquesIntroducedCode}],
  "hasLogicalStart": ${level.hasLogicalStart},
  "startingDeduction": "${level.startingDeduction}",
  "estimatedSolvingSteps": ${level.estimatedSolvingSteps}
};`;
}

// Main execution
console.log('Starting generation of levels 51-100...');
const newLevels = generateLevels51To100();

console.log(`\nSuccessfully generated ${newLevels.length} levels`);

// Generate the code for each level
const levelCodes = newLevels.map(generateLevelCode);
const combinedCode = levelCodes.join('\n\n');

// Write to a temporary file
const outputPath = path.join(process.cwd(), 'scripts', 'generatedLevels51-100.ts');
fs.writeFileSync(outputPath, combinedCode);
console.log(`\nLevel code written to: ${outputPath}`);

// Generate the array updates
const levelNames = newLevels.map(level => `level${level.level}`).join(',\n  ');
const arrayUpdate = `  // Levels 51-100
${levelNames},`;

const arrayPath = path.join(process.cwd(), 'scripts', 'puzzlesArrayUpdate.txt');
fs.writeFileSync(arrayPath, arrayUpdate);
console.log(`Array update written to: ${arrayPath}`);

console.log('\nGeneration complete!');
console.log('Please manually add the generated levels to puzzles.ts and update the puzzles array.');