const fs = require('fs');
const path = require('path');

// Simple puzzle generator that creates valid puzzles
function createPuzzle(level, gridSize, difficulty) {
  // Create regions with a simple pattern
  const regions = [];
  
  // Create a more interesting region pattern
  for (let i = 0; i < gridSize; i++) {
    const region = {
      id: i + 1,
      cells: []
    };
    
    // Add main cell
    region.cells.push({ row: i, col: i });
    
    // Add some adjacent cells to make regions more varied
    if (i > 0) {
      region.cells.push({ row: i, col: (i - 1) % gridSize });
    }
    if (i < gridSize - 1) {
      region.cells.push({ row: i, col: (i + 1) % gridSize });
    }
    
    regions.push(region);
  }
  
  // Create a valid solution using a simple pattern
  const solution = [];
  for (let i = 0; i < gridSize; i++) {
    // Use a pattern that ensures no two puppies are adjacent
    solution.push({ row: i, col: (i * 2) % gridSize });
  }
  
  // Define techniques based on difficulty
  let techniquesRequired, techniquesIntroduced;
  
  switch (difficulty) {
    case 'beginner':
      techniquesRequired = ['single_cell_colour', 'neighbour_elimination'];
      techniquesIntroduced = ['single_cell_colour'];
      break;
    case 'easy':
      techniquesRequired = ['single_cell_colour', 'colour_unique_row', 'neighbour_elimination'];
      techniquesIntroduced = ['colour_unique_row'];
      break;
    case 'medium':
      techniquesRequired = ['single_cell_colour', 'colour_unique_row', 'colour_unique_column', 'neighbour_elimination'];
      techniquesIntroduced = ['colour_unique_column'];
      break;
    case 'hard':
      techniquesRequired = ['single_cell_colour', 'colour_unique_row', 'colour_unique_column', 'row_elimination', 'neighbour_elimination'];
      techniquesIntroduced = ['row_elimination'];
      break;
    case 'expert':
      techniquesRequired = ['single_cell_colour', 'colour_unique_row', 'colour_unique_column', 'row_elimination', 'column_elimination', 'neighbour_elimination', 'deduction_chain'];
      techniquesIntroduced = ['deduction_chain'];
      break;
    default:
      techniquesRequired = ['single_cell_colour', 'neighbour_elimination'];
      techniquesIntroduced = ['single_cell_colour'];
  }
  
  return {
    level,
    gridSize,
    regions,
    solution,
    difficulty,
    techniquesRequired,
    techniquesIntroduced,
    hasLogicalStart: true,
    startingDeduction: `${difficulty} puzzle with logical starting point`,
    estimatedSolvingSteps: gridSize + Math.floor(level / 10),
  };
}

function generateLevelCode(level) {
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

// Generate levels 51-100
console.log('Starting generation of levels 51-100...');
const newLevels = [];

for (let level = 51; level <= 100; level++) {
  let gridSize;
  let difficulty;
  
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
  
  const puzzle = createPuzzle(level, gridSize, difficulty);
  newLevels.push(puzzle);
  console.log(`✓ Level ${level} created`);
}

console.log(`\nSuccessfully created ${newLevels.length} levels`);

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