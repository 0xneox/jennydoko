import { Board, Region, PuzzleData, DifficultyLevel, DeductionTechnique } from './types';
import { PuzzleSolver } from './solver';
import { GameEngine } from './engine';

export class PuzzleGenerator {
  /**
   * Generate a valid puzzle with the specified parameters
   */
  public static generatePuzzle(
    gridSize: number,
    targetDifficulty: DifficultyLevel,
    levelNumber: number
  ): PuzzleData | null {
    const maxAttempts = 100;
    let bestPuzzle: PuzzleData | null = null;
    let bestScore = -1;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const puzzle = this.attemptPuzzleGeneration(gridSize, targetDifficulty, levelNumber, attempt);
      if (puzzle) {
        const score = this.evaluatePuzzleQuality(puzzle);
        if (score > bestScore) {
          bestScore = score;
          bestPuzzle = puzzle;
        }
      }
    }

    return bestPuzzle;
  }

  private static attemptPuzzleGeneration(
    gridSize: number,
    targetDifficulty: DifficultyLevel,
    levelNumber: number,
    attempt: number
  ): PuzzleData | null {
    // Generate regions
    const regions = this.generateRegions(gridSize, levelNumber * 7919 + attempt * 31);

    // Generate a valid solution
    const solution = this.generateValidSolution(gridSize, regions);
    if (!solution) {
      return null;
    }

    // Create puzzle data
    const puzzle: PuzzleData = {
      level: levelNumber,
      gridSize,
      regions,
      solution,
      difficulty: targetDifficulty,
      techniquesRequired: [],
      techniquesIntroduced: [],
      hasLogicalStart: false,
    };

    // Validate the puzzle
    if (!this.validatePuzzle(puzzle)) {
      return null;
    }

    // Analyze techniques required
    const board = this.createBoardFromPuzzle(puzzle);
    const solver = new PuzzleSolver(board);
    puzzle.techniquesRequired = solver.getRequiredTechniques();
    puzzle.hasLogicalStart = solver.hasLogicalStartingMove();

    // Determine techniques introduced based on level
    puzzle.techniquesIntroduced = this.determineIntroducedTechniques(levelNumber, puzzle.techniquesRequired);

    // Check if puzzle meets difficulty requirements
    if (!this.meetsDifficultyRequirements(puzzle, targetDifficulty)) {
      return null;
    }

    return puzzle;
  }

  private static generateRegions(gridSize: number, seed: number): Region[] {
    const regions: Region[] = [];
    const cellAssignments = new Map<string, number>();

    // Create a simple region generation strategy
    // For now, use a deterministic but varied approach
    let seedValue = seed;

    const random = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280;
      return seedValue / 233280;
    };

    for (let regionId = 0; regionId < gridSize; regionId++) {
      const region: Region = {
        id: regionId + 1,
        cells: [],
      };

      // Start with a random cell
      let startRow = Math.floor(random() * gridSize);
      let startCol = Math.floor(random() * gridSize);
      let attempts = 0;

      while (cellAssignments.has(`${startRow},${startCol}`) && attempts < gridSize * gridSize) {
        startRow = Math.floor(random() * gridSize);
        startCol = Math.floor(random() * gridSize);
        attempts++;
      }

      if (attempts >= gridSize * gridSize) {
        // Fallback to sequential assignment
        for (let row = 0; row < gridSize; row++) {
          for (let col = 0; col < gridSize; col++) {
            if (!cellAssignments.has(`${row},${col}`)) {
              startRow = row;
              startCol = col;
              break;
            }
          }
        }
      }

      region.cells.push({ row: startRow, col: startCol });
      cellAssignments.set(`${startRow},${startCol}`, regionId);

      // Grow the region
      const targetSize = Math.floor(random() * 2) + 1 + Math.floor(gridSize / 2);
      let currentSize = 1;

      while (currentSize < targetSize && currentSize < gridSize) {
        const boundaryCells = this.findBoundaryCells(region, gridSize, cellAssignments);
        if (boundaryCells.length === 0) break;

        const nextCell = boundaryCells[Math.floor(random() * boundaryCells.length)];
        region.cells.push(nextCell);
        cellAssignments.set(`${nextCell.row},${nextCell.col}`, regionId);
        currentSize++;
      }
    }

    // Ensure all cells are assigned
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (!cellAssignments.has(`${row},${col}`)) {
          // Assign to smallest region
          let smallestRegion = regions[0];
          if (smallestRegion) {
            for (const region of regions) {
              if (region.cells.length < smallestRegion.cells.length) {
                smallestRegion = region;
              }
            }
            smallestRegion.cells.push({ row, col });
          }
        }
      }
    }

    return regions;
  }

  private static findBoundaryCells(
    region: Region,
    gridSize: number,
    cellAssignments: Map<string, number>
  ): { row: number; col: number }[] {
    const boundaryCells: { row: number; col: number }[] = [];
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1],
    ];

    for (const cell of region.cells) {
      for (const [dr, dc] of directions) {
        const newRow = cell.row + dr;
        const newCol = cell.col + dc;

        if (
          newRow >= 0 && newRow < gridSize &&
          newCol >= 0 && newCol < gridSize &&
          !cellAssignments.has(`${newRow},${newCol}`)
        ) {
          boundaryCells.push({ row: newRow, col: newCol });
        }
      }
    }

    return boundaryCells;
  }

  private static generateValidSolution(
    gridSize: number,
    regions: Region[]
  ): { row: number; col: number }[] | null {
    // Use backtracking to find a valid solution
    const solution: { row: number; col: number }[] = [];
    const usedRows = new Set<number>();
    const usedCols = new Set<number>();
    const usedRegions = new Set<number>();

    if (this.findSolution(
      gridSize,
      regions,
      0,
      solution,
      usedRows,
      usedCols,
      usedRegions
    )) {
      return solution;
    }

    return null;
  }

  private static findSolution(
    gridSize: number,
    regions: Region[],
    row: number,
    solution: { row: number; col: number }[],
    usedRows: Set<number>,
    usedCols: Set<number>,
    usedRegions: Set<number>
  ): boolean {
    if (solution.length === gridSize) {
      return true;
    }

    if (row >= gridSize) {
      return false;
    }

    for (let col = 0; col < gridSize; col++) {
      if (usedRows.has(row) || usedCols.has(col)) {
        continue;
      }

      const cellRegion = regions.find(region =>
        region.cells.some(cell => cell.row === row && cell.col === col)
      );

      if (!cellRegion || usedRegions.has(cellRegion.id)) {
        continue;
      }

      // Check adjacency with existing solution
      let valid = true;
      for (const sol of solution) {
        const rowDiff = Math.abs(sol.row - row);
        const colDiff = Math.abs(sol.col - col);
        if (rowDiff <= 1 && colDiff <= 1) {
          valid = false;
          break;
        }
      }

      if (!valid) continue;

      // Try this placement
      solution.push({ row, col });
      usedRows.add(row);
      usedCols.add(col);
      usedRegions.add(cellRegion.id);

      if (this.findSolution(
        gridSize,
        regions,
        row + 1,
        solution,
        usedRows,
        usedCols,
        usedRegions
      )) {
        return true;
      }

      // Backtrack
      solution.pop();
      usedRows.delete(row);
      usedCols.delete(col);
      usedRegions.delete(cellRegion.id);
    }

    return false;
  }

  private static validatePuzzle(puzzle: PuzzleData): boolean {
    // Check if solution is valid
    const engine = new GameEngine(puzzle);
    if (!engine.validateSolution(puzzle.solution)) {
      return false;
    }

    // Check if solution is unique
    const solutionCount = engine.countValidSolutions();
    if (solutionCount !== 1) {
      return false;
    }

    return true;
  }

  private static createBoardFromPuzzle(puzzle: PuzzleData): Board {
    const cells: any[][] = [];
    for (let row = 0; row < puzzle.gridSize; row++) {
      cells[row] = [];
      for (let col = 0; col < puzzle.gridSize; col++) {
        cells[row][col] = { row, col, value: 'empty' };
      }
    }

    return {
      gridSize: puzzle.gridSize,
      cells,
      regions: puzzle.regions,
    };
  }

  private static determineIntroducedTechniques(
    levelNumber: number,
    requiredTechniques: DeductionTechnique[]
  ): DeductionTechnique[] {
    // Progressive introduction of techniques based on level
    const techniqueProgression: DeductionTechnique[] = [
      'single_cell_colour',
      'colour_unique_row',
      'colour_unique_column',
      'row_elimination',
      'column_elimination',
      'region_elimination',
      'neighbour_elimination',
    ];

    const introduced: DeductionTechnique[] = [];
    const maxIndex = Math.min(levelNumber, techniqueProgression.length);

    for (let i = 0; i < maxIndex; i++) {
      if (requiredTechniques.includes(techniqueProgression[i])) {
        introduced.push(techniqueProgression[i]);
      }
    }

    return introduced;
  }

  private static meetsDifficultyRequirements(
    puzzle: PuzzleData,
    targetDifficulty: DifficultyLevel
  ): boolean {
    if (!puzzle.hasLogicalStart) {
      return false;
    }

    const techniqueCount = puzzle.techniquesRequired.length;

    switch (targetDifficulty) {
      case 'beginner':
        return techniqueCount <= 2 && puzzle.techniquesRequired.every(t =>
          ['single_cell_colour', 'colour_unique_row', 'colour_unique_column'].includes(t)
        );
      case 'easy':
        return techniqueCount <= 3 && puzzle.techniquesRequired.every(t =>
          ['single_cell_colour', 'colour_unique_row', 'colour_unique_column', 'row_elimination'].includes(t)
        );
      case 'medium':
        return techniqueCount <= 4;
      case 'hard':
        return techniqueCount <= 5;
      case 'expert':
        return techniqueCount <= 7;
      default:
        return true;
    }
  }

  private static evaluatePuzzleQuality(puzzle: PuzzleData): number {
    let score = 0;

    // Has logical start
    if (puzzle.hasLogicalStart) score += 10;

    // Unique solution
    const engine = new GameEngine(puzzle);
    if (engine.countValidSolutions() === 1) score += 10;

    // Reasonable technique complexity
    const techniqueCount = puzzle.techniquesRequired.length;
    if (techniqueCount >= 2 && techniqueCount <= 4) score += 5;

    // Region quality (not too fragmented)
    const avgRegionSize = puzzle.regions.reduce((sum, r) => sum + r.cells.length, 0) / puzzle.regions.length;
    if (avgRegionSize >= 2 && avgRegionSize <= puzzle.gridSize / 2 + 1) score += 3;

    return score;
  }
}