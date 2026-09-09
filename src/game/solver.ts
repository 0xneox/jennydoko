import { Board, Deduction, DeductionTechnique } from './types';

export class PuzzleSolver {
  private board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  /**
   * Find all possible logical deductions for the current board state
   */
  public findAllDeductions(): Deduction[] {
    const deductions: Deduction[] = [];

    // Try each deduction technique
    deductions.push(...this.findSingleCellColourDeductions());
    deductions.push(...this.findColourUniqueRowDeductions());
    deductions.push(...this.findColourUniqueColumnDeductions());
    deductions.push(...this.findRowEliminationDeductions());
    deductions.push(...this.findColumnEliminationDeductions());
    deductions.push(...this.findRegionEliminationDeductions());
    deductions.push(...this.findNeighbourEliminationDeductions());

    return deductions;
  }

  /**
   * RULE A: Single-Cell Colour
   * If a colour/region appears in only one remaining possible cell, that cell must contain the dog
   */
  private findSingleCellColourDeductions(): Deduction[] {
    const deductions: Deduction[] = [];

    for (const region of this.board.regions) {
      const emptyCells = region.cells.filter(
        cell => this.board.cells[cell.row][cell.col].value === 'empty'
      );

      if (emptyCells.length === 1) {
        const cell = emptyCells[0];
        deductions.push({
          technique: 'single_cell_colour',
          affectedCell: { row: cell.row, col: cell.col },
          explanation: `Region ${region.id} has only one empty cell remaining, so the dog must go here.`,
          eliminatedCells: [],
          difficultyValue: 1,
        });
      }
    }

    return deductions;
  }

  /**
   * RULE B: Colour Unique to Row
   * If a colour can appear in only one cell within a particular row, that cell must contain the dog
   */
  /**
   * Helper: returns a map of regionId -> Set of rows where the region appears anywhere on the board.
   */
  private getRegionRowsMap(): Map<number, Set<number>> {
    const map = new Map<number, Set<number>>();
    for (const region of this.board.regions) {
      for (const cell of region.cells) {
        if (!map.has(region.id)) {
          map.set(region.id, new Set<number>());
        }
        map.get(region.id)!.add(cell.row);
      }
    }
    return map;
  }

  /**
   * Helper: returns a map of regionId -> Set of columns where the region appears anywhere on the board.
   */
  private getRegionColsMap(): Map<number, Set<number>> {
    const map = new Map<number, Set<number>>();
    for (const region of this.board.regions) {
      for (const cell of region.cells) {
        if (!map.has(region.id)) {
          map.set(region.id, new Set<number>());
        }
        map.get(region.id)!.add(cell.col);
      }
    }
    return map;
  }

  private findColourUniqueRowDeductions(): Deduction[] {
    const deductions: Deduction[] = [];
    const regionRows = this.getRegionRowsMap();

    for (let row = 0; row < this.board.gridSize; row++) {
      const regionCounts = new Map<number, number>();
      const regionCells = new Map<number, { row: number; col: number }>();

      for (let col = 0; col < this.board.gridSize; col++) {
        const cellRegion = this.board.regions.find(region =>
          region.cells.some(c => c.row === row && c.col === col)
        );
        if (cellRegion && this.board.cells[row][col].value === 'empty') {
          regionCounts.set(cellRegion.id, (regionCounts.get(cellRegion.id) || 0) + 1);
          regionCells.set(cellRegion.id, { row, col });
        }
      }

      for (const [regionId, count] of regionCounts) {
        const rowsSet = regionRows.get(regionId);
        const isSingleCellRegion = this.board.regions.find(r => r.id === regionId)?.cells.length === 1;
        if (count === 1 && rowsSet && (rowsSet.size > 1 || isSingleCellRegion)) {
          const cell = regionCells.get(regionId);
          if (cell) {
            const eliminatedCells: { row: number; col: number }[] = [];
            for (let c = 0; c < this.board.gridSize; c++) {
              if (c !== cell.col && this.board.cells[row][c].value === 'empty') {
                eliminatedCells.push({ row, col: c });
              }
            }
            deductions.push({
              technique: 'colour_unique_row',
              affectedCell: cell,
              explanation: `Region ${regionId} appears only once in row ${row}, so the dog must go here.`,
              eliminatedCells,
              difficultyValue: 2,
            });
          }
        }
      }
    }

    return deductions;
  }

  /**
   * RULE B: Colour Unique to Column
   * If a colour can appear in only one cell within a particular column, that cell must contain the dog
   */
  private findColourUniqueColumnDeductions(): Deduction[] {
    const deductions: Deduction[] = [];
    const regionCols = this.getRegionColsMap();

    for (let col = 0; col < this.board.gridSize; col++) {
      const regionCounts = new Map<number, number>();
      const regionCells = new Map<number, { row: number; col: number }>();

      for (let row = 0; row < this.board.gridSize; row++) {
        const cellRegion = this.board.regions.find(region =>
          region.cells.some(c => c.row === row && c.col === col)
        );
        if (cellRegion && this.board.cells[row][col].value === 'empty') {
          regionCounts.set(cellRegion.id, (regionCounts.get(cellRegion.id) || 0) + 1);
          regionCells.set(cellRegion.id, { row, col });
        }
      }

      for (const [regionId, count] of regionCounts) {
        const colsSet = regionCols.get(regionId);
        const isSingleCellRegion = this.board.regions.find(r => r.id === regionId)?.cells.length === 1;
        if (count === 1 && colsSet && (colsSet.size > 1 || isSingleCellRegion)) {
          const cell = regionCells.get(regionId);
          if (cell) {
            const eliminatedCells: { row: number; col: number }[] = [];
            for (let r = 0; r < this.board.gridSize; r++) {
              if (r !== cell.row && this.board.cells[r][col].value === 'empty') {
                eliminatedCells.push({ row: r, col });
              }
            }
            deductions.push({
              technique: 'colour_unique_column',
              affectedCell: cell,
              explanation: `Region ${regionId} appears only once in column ${col}, so the dog must go here.`,
              eliminatedCells,
              difficultyValue: 2,
            });
          }
        }
      }
    }
    return deductions;
  }

  /**
   * Row Elimination
   * If a row already has a dog, all other cells in that row can be marked as X
   */
  private findRowEliminationDeductions(): Deduction[] {
    const deductions: Deduction[] = [];

    for (let row = 0; row < this.board.gridSize; row++) {
      let puppyCount = 0;
      let puppyCol = -1;

      for (let col = 0; col < this.board.gridSize; col++) {
        if (this.board.cells[row][col].value === 'puppy') {
          puppyCount++;
          puppyCol = col;
        }
      }

      if (puppyCount === 1) {
        const eliminatedCells: { row: number; col: number }[] = [];
        for (let col = 0; col < this.board.gridSize; col++) {
          if (col !== puppyCol && this.board.cells[row][col].value === 'empty') {
            eliminatedCells.push({ row, col });
          }
        }

        if (eliminatedCells.length > 0) {
          deductions.push({
            technique: 'row_elimination',
            affectedCell: { row, col: puppyCol },
            explanation: `Row ${row} already has a dog, so all other cells in this row can be marked as X.`,
            eliminatedCells,
            difficultyValue: 1,
          });
        }
      }
    }

    return deductions;
  }

  /**
   * Column Elimination
   * If a column already has a dog, all other cells in that column can be marked as X
   */
  private findColumnEliminationDeductions(): Deduction[] {
    const deductions: Deduction[] = [];

    for (let col = 0; col < this.board.gridSize; col++) {
      let puppyCount = 0;
      let puppyRow = -1;

      for (let row = 0; row < this.board.gridSize; row++) {
        if (this.board.cells[row][col].value === 'puppy') {
          puppyCount++;
          puppyRow = row;
        }
      }

      if (puppyCount === 1) {
        const eliminatedCells: { row: number; col: number }[] = [];
        for (let row = 0; row < this.board.gridSize; row++) {
          if (row !== puppyRow && this.board.cells[row][col].value === 'empty') {
            eliminatedCells.push({ row, col });
          }
        }

        if (eliminatedCells.length > 0) {
          deductions.push({
            technique: 'column_elimination',
            affectedCell: { row: puppyRow, col },
            explanation: `Column ${col} already has a dog, so all other cells in this column can be marked as X.`,
            eliminatedCells,
            difficultyValue: 1,
          });
        }
      }
    }

    return deductions;
  }

  /**
   * Region Elimination
   * If a region already has a dog, all other cells in that region can be marked as X
   */
  private findRegionEliminationDeductions(): Deduction[] {
    const deductions: Deduction[] = [];

    for (const region of this.board.regions) {
      let puppyCount = 0;
      let puppyCell: { row: number; col: number } | null = null;

      for (const cell of region.cells) {
        if (this.board.cells[cell.row][cell.col].value === 'puppy') {
          puppyCount++;
          puppyCell = cell;
        }
      }

      if (puppyCount === 1 && puppyCell) {
        const eliminatedCells: { row: number; col: number }[] = [];
        for (const cell of region.cells) {
          if (
            (cell.row !== puppyCell.row || cell.col !== puppyCell.col) &&
            this.board.cells[cell.row][cell.col].value === 'empty'
          ) {
            eliminatedCells.push(cell);
          }
        }

        if (eliminatedCells.length > 0) {
          deductions.push({
            technique: 'region_elimination',
            affectedCell: puppyCell,
            explanation: `Region ${region.id} already has a dog, so all other cells in this region can be marked as X.`,
            eliminatedCells,
            difficultyValue: 1,
          });
        }
      }
    }

    return deductions;
  }

  /**
   * Neighbour Elimination
   * If a cell has a neighbouring dog, it cannot contain a dog
   */
  private findNeighbourEliminationDeductions(): Deduction[] {
    const deductions: Deduction[] = [];
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1],
    ];

    for (let row = 0; row < this.board.gridSize; row++) {
      for (let col = 0; col < this.board.gridSize; col++) {
        if (this.board.cells[row][col].value === 'empty') {
          // Check all neighbours for dogs
          for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (
              newRow >= 0 && newRow < this.board.gridSize &&
              newCol >= 0 && newCol < this.board.gridSize &&
              this.board.cells[newRow][newCol].value === 'puppy'
            ) {
              deductions.push({
                technique: 'neighbour_elimination',
                affectedCell: { row, col },
                explanation: `This cell touches a dog at (${newRow}, ${newCol}), so it cannot contain a dog.`,
                eliminatedCells: [{ row, col }],
                difficultyValue: 1,
              });
              break; // Only need one neighbour to eliminate
            }
          }
        }
      }
    }

    return deductions;
  }

  /**
   * Check if the puzzle has at least one logical starting move
   */
  public hasLogicalStartingMove(): boolean {
    const deductions = this.findAllDeductions();
    return deductions.length > 0;
  }

  /**
   * Count total difficulty score based on deduction techniques
   */
  public calculateDifficultyScore(): number {
    const deductions = this.findAllDeductions();
    return deductions.reduce((sum, deduction) => sum + deduction.difficultyValue, 0);
  }

  /**
   * Get required techniques for solving this puzzle
   */
  public getRequiredTechniques(): DeductionTechnique[] {
    const deductions = this.findAllDeductions();
    const techniques = new Set<DeductionTechnique>();
    for (const deduction of deductions) {
      techniques.add(deduction.technique);
    }
    return Array.from(techniques);
  }
}