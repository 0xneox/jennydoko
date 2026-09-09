import { DifficultyLevel, DeductionTechnique, PuzzleData, Region, Board } from './types';
import { PuzzleSolver } from './solver';
import { GameEngine } from './engine';

export class DifficultyScorer {
  private static techniqueDifficultyValues: Record<DeductionTechnique, number> = {
    single_cell_colour: 1,
    colour_unique_row: 2,
    colour_unique_column: 2,
    row_elimination: 1,
    column_elimination: 1,
    region_elimination: 1,
    neighbour_elimination: 1,
    deduction_chain: 5,
  };

  /**
   * Calculate the difficulty score for a puzzle
   */
  public static calculateDifficultyScore(puzzle: PuzzleData): number {
    let score = 0;

    // Base score from techniques required
    for (const technique of puzzle.techniquesRequired) {
      score += this.techniqueDifficultyValues[technique] || 2;
    }

    // Grid size multiplier
    const gridSizeMultiplier = puzzle.gridSize / 4;
    score *= gridSizeMultiplier;

    // Complexity bonus based on region irregularity
    const regionComplexity = this.calculateRegionComplexity(puzzle);
    score += regionComplexity;

    return score;
  }

  /**
   * Classify a puzzle into a difficulty level
   */
  public static classifyDifficulty(puzzle: PuzzleData): DifficultyLevel {
    const score = this.calculateDifficultyScore(puzzle);
    const gridSize = puzzle.gridSize;

    // Adjust thresholds based on grid size
    const baseThreshold = gridSize * 2;

    if (score < baseThreshold * 1.5) {
      return 'beginner';
    } else if (score < baseThreshold * 2.5) {
      return 'easy';
    } else if (score < baseThreshold * 3.5) {
      return 'medium';
    } else if (score < baseThreshold * 4.5) {
      return 'hard';
    } else if (score < baseThreshold * 5.5) {
      return 'expert';
    } else if (score < baseThreshold * 6.5) {
      return 'master';
    } else {
      return 'legend';
    }
  }

  /**
   * Estimate the number of deductions required to solve
   */
  public static estimateDeductionCount(puzzle: PuzzleData): number {
    const engine = new GameEngine(puzzle);
    const board = engine.getState().board;
    const solver = new PuzzleSolver(board);

    let deductionCount = 0;
    let currentBoard = this.cloneBoard(board);

    // Simulate solving process
    while (deductionCount < puzzle.gridSize * 2) {
      const tempSolver = new PuzzleSolver(currentBoard);
      const deductions = tempSolver.findAllDeductions();

      if (deductions.length === 0) {
        break;
      }

      // Apply the easiest deduction
      const easiestDeduction = deductions.sort((a, b) => a.difficultyValue - b.difficultyValue)[0];
      currentBoard.cells[easiestDeduction.affectedCell.row][easiestDeduction.affectedCell.col].value = 'puppy';

      deductionCount++;
    }

    return deductionCount;
  }

  /**
   * Calculate region complexity (how irregular the regions are)
   */
  private static calculateRegionComplexity(puzzle: PuzzleData): number {
    let complexity = 0;

    for (const region of puzzle.regions) {
      // Check if region is contiguous
      if (!this.isRegionContiguous(region, puzzle.gridSize)) {
        complexity += 2;
      }

      // Check shape irregularity
      const shapeScore = this.calculateShapeScore(region, puzzle.gridSize);
      complexity += shapeScore;
    }

    return complexity;
  }

  private static isRegionContiguous(region: Region, gridSize: number): boolean {
    if (region.cells.length === 0) return true;

    const visited = new Set<string>();
    const queue = [region.cells[0]];
    visited.add(`${region.cells[0].row},${region.cells[0].col}`);

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    while (queue.length > 0) {
      const current = queue.shift()!;
      for (const [dr, dc] of directions) {
        const newRow = current.row + dr;
        const newCol = current.col + dc;

        if (
          newRow >= 0 && newRow < gridSize &&
          newCol >= 0 && newCol < gridSize
        ) {
          const key = `${newRow},${newCol}`;
          if (!visited.has(key) && region.cells.some((c: any) => c.row === newRow && c.col === newCol)) {
            visited.add(key);
            queue.push({ row: newRow, col: newCol });
          }
        }
      }
    }

    return visited.size === region.cells.length;
  }

  private static calculateShapeScore(region: Region, gridSize: number): number {
    // Simple heuristic: count corners and edges
    let corners = 0;
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1],
    ];

    for (const cell of region.cells) {
      let neighborCount = 0;
      for (const [dr, dc] of directions) {
        const newRow = cell.row + dr;
        const newCol = cell.col + dc;

        if (
          newRow >= 0 && newRow < gridSize &&
          newCol >= 0 && newCol < gridSize &&
          region.cells.some((c: any) => c.row === newRow && c.col === newCol)
        ) {
          neighborCount++;
        }
      }

      if (neighborCount <= 2) {
        corners++;
      }
    }

    return Math.min(corners, 3);
  }

  private static cloneBoard(board: Board): Board {
    const cells: any[][] = [];
    for (let row = 0; row < board.gridSize; row++) {
      cells[row] = [];
      for (let col = 0; col < board.gridSize; col++) {
        cells[row][col] = { ...board.cells[row][col] };
      }
    }

    return {
      gridSize: board.gridSize,
      cells,
      regions: board.regions.map((region: any) => ({
        ...region,
        cells: region.cells.map((cell: any) => ({ ...cell })),
      })),
    };
  }
}