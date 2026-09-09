import { Board, Cell, CellValue, Region, GameState, PuzzleData, Hint, Deduction } from './types';
import { PuzzleSolver } from './solver';

export class GameEngine {
  // Helper to check if a coordinate is within board bounds
  private static isInsideBoard(row: number, col: number, size: number): boolean {
    return row >= 0 && row < size && col >= 0 && col < size;
  }
  private state: GameState;
  private solver: PuzzleSolver;

  constructor(puzzleData: PuzzleData) {
    const board = this.createBoard(puzzleData);
    this.state = {
      board,
      hearts: 3,
      moves: 0,
      history: [GameEngine.cloneBoard(board)],
      isComplete: false,
      currentLevel: puzzleData.level,
    };
    this.solver = new PuzzleSolver(board);
  }

  private createBoard(puzzleData: PuzzleData): Board {
    const cells: Cell[][] = [];
    for (let row = 0; row < puzzleData.gridSize; row++) {
      cells[row] = [];
      for (let col = 0; col < puzzleData.gridSize; col++) {
        cells[row][col] = { row, col, value: 'empty' };
      }
    }

    return {
      gridSize: puzzleData.gridSize,
      cells,
      regions: puzzleData.regions,
    };
  }

  private static cloneBoard(board: Board): Board {
    const cells: Cell[][] = [];
    for (let row = 0; row < board.gridSize; row++) {
      cells[row] = [];
      for (let col = 0; col < board.gridSize; col++) {
        cells[row][col] = { ...board.cells[row][col] };
      }
    }

    return {
      gridSize: board.gridSize,
      cells,
      regions: board.regions.map(region => ({
        ...region,
        cells: region.cells.map(cell => ({ ...cell })),
      })),
    };
  }

  public getState(): GameState {
    return { ...this.state, board: GameEngine.cloneBoard(this.state.board) };
  }

  public placePuppy(row: number, col: number): boolean {
    if (this.state.isComplete) {
      return false;
    }

    const board = this.state.board;
    // Correct boundary check: indices must be within [0, gridSize)
    if (!GameEngine.isInsideBoard(row, col, board.gridSize)) {
      return false;
    }

    // If cell already has a puppy, tap toggles it off (removes it)
    if (board.cells[row][col].value === 'puppy') {
      board.cells[row][col].value = 'empty';
      this.state.moves++;
      this.state.history.push(GameEngine.cloneBoard(board));
      this.solver = new PuzzleSolver(board);
      return true;
    }

    if (!this.isValidPlacement(board, row, col)) {
      this.state.hearts = Math.max(0, this.state.hearts - 1);
      return false;
    }

    board.cells[row][col].value = 'puppy';
    this.state.moves++;
    this.state.history.push(GameEngine.cloneBoard(board));
    this.solver = new PuzzleSolver(board); // Update solver with new board state

    if (this.checkWinCondition()) {
      this.state.isComplete = true;
    }

    return true;
  }

  public markCell(row: number, col: number): boolean {
    if (this.state.isComplete) {
      return false;
    }

    const board = this.state.board;
    if (!GameEngine.isInsideBoard(row, col, board.gridSize)) {
      return false;
    }

    if (board.cells[row][col].value === 'puppy') {
      return false;
    }

    if (board.cells[row][col].value === 'empty') {
      board.cells[row][col].value = 'marked';
    } else {
      board.cells[row][col].value = 'empty';
    }

    this.state.moves++;
    this.state.history.push(GameEngine.cloneBoard(board));

    return true;
  }

  public undo(): boolean {
    if (this.state.history.length <= 1) {
      return false;
    }

    this.state.history.pop();
    this.state.board = GameEngine.cloneBoard(this.state.history[this.state.history.length - 1]);
    this.state.moves--;

    return true;
  }

  public restart(): void {
    const initialBoard = GameEngine.cloneBoard(this.state.history[0]);
    this.state.board = initialBoard;
    this.state.hearts = 3;
    this.state.moves = 0;
    this.state.history = [initialBoard];
    this.state.isComplete = false;
    this.solver = new PuzzleSolver(initialBoard); // Reset solver
  }

  private isValidPlacement(board: Board, row: number, col: number): boolean {
    if (!this.validateRow(board, row, col)) {
      return false;
    }

    if (!this.validateColumn(board, row, col)) {
      return false;
    }

    if (!this.validateRegion(board, row, col)) {
      return false;
    }

    if (!this.validateAdjacency(board, row, col)) {
      return false;
    }

    return true;
  }

  private validateRow(board: Board, row: number, col: number): boolean {
    for (let c = 0; c < board.gridSize; c++) {
      if (c !== col && board.cells[row][c].value === 'puppy') {
        return false;
      }
    }
    return true;
  }

  private validateColumn(board: Board, row: number, col: number): boolean {
    for (let r = 0; r < board.gridSize; r++) {
      if (r !== row && board.cells[r][col].value === 'puppy') {
        return false;
      }
    }
    return true;
  }

  private validateRegion(board: Board, row: number, col: number): boolean {
    const cellRegion = board.regions.find(region =>
      region.cells.some(cell => cell.row === row && cell.col === col)
    );

    if (!cellRegion) {
      return false;
    }

    for (const cell of cellRegion.cells) {
      if (cell.row !== row || cell.col !== col) {
        if (board.cells[cell.row][cell.col].value === 'puppy') {
          return false;
        }
      }
    }

    return true;
  }

  private validateAdjacency(board: Board, row: number, col: number): boolean {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1],
    ];

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (GameEngine.isInsideBoard(newRow, newCol, board.gridSize)) {
        if (board.cells[newRow][newCol].value === 'puppy') {
          return false;
        }
      }
    }

    return true;
  }

  private checkWinCondition(): boolean {
    const board = this.state.board;
    const puppyCount = this.countPuppies(board);

    if (puppyCount !== board.gridSize) {
      return false;
    }

    for (let row = 0; row < board.gridSize; row++) {
      let rowPuppies = 0;
      for (let col = 0; col < board.gridSize; col++) {
        if (board.cells[row][col].value === 'puppy') {
          rowPuppies++;
        }
      }
      if (rowPuppies !== 1) {
        return false;
      }
    }

    for (let col = 0; col < board.gridSize; col++) {
      let colPuppies = 0;
      for (let row = 0; row < board.gridSize; row++) {
        if (board.cells[row][col].value === 'puppy') {
          colPuppies++;
        }
      }
      if (colPuppies !== 1) {
        return false;
      }
    }

    for (const region of board.regions) {
      let regionPuppies = 0;
      for (const cell of region.cells) {
        if (board.cells[cell.row][cell.col].value === 'puppy') {
          regionPuppies++;
        }
      }
      if (regionPuppies !== 1) {
        return false;
      }
    }

    return true;
  }

  private countPuppies(board: Board): number {
    let count = 0;
    for (let row = 0; row < board.gridSize; row++) {
      for (let col = 0; col < board.gridSize; col++) {
        if (board.cells[row][col].value === 'puppy') {
          count++;
        }
      }
    }
    return count;
  }

  public validateSolution(solution: { row: number; col: number }[]): boolean {
    const board = this.state.board;
    const solutionSet = new Set(
      solution.map(s => `${s.row},${s.col}`)
    );

    if (solutionSet.size !== board.gridSize) {
      return false;
    }

    for (const sol of solution) {
      if (sol.row < 0 || sol.row >= board.gridSize ||
          sol.col < 0 || sol.col >= board.gridSize) {
        return false;
      }
    }

    const tempBoard = GameEngine.cloneBoard(board);
    for (const sol of solution) {
      tempBoard.cells[sol.row][sol.col].value = 'puppy';
    }

    for (let row = 0; row < tempBoard.gridSize; row++) {
      let rowPuppies = 0;
      for (let col = 0; col < tempBoard.gridSize; col++) {
        if (tempBoard.cells[row][col].value === 'puppy') {
          rowPuppies++;
        }
      }
      if (rowPuppies !== 1) {
        return false;
      }
    }

    for (let col = 0; col < tempBoard.gridSize; col++) {
      let colPuppies = 0;
      for (let row = 0; row < tempBoard.gridSize; row++) {
        if (tempBoard.cells[row][col].value === 'puppy') {
          colPuppies++;
        }
      }
      if (colPuppies !== 1) {
        return false;
      }
    }

    for (const region of tempBoard.regions) {
      let regionPuppies = 0;
      for (const cell of region.cells) {
        if (tempBoard.cells[cell.row][cell.col].value === 'puppy') {
          regionPuppies++;
        }
      }
      if (regionPuppies !== 1) {
        return false;
      }
    }

    for (const sol of solution) {
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1],
      ];

      for (const [dr, dc] of directions) {
        const newRow = sol.row + dr;
        const newCol = sol.col + dc;

        if (
          newRow >= 0 && newRow < tempBoard.gridSize &&
          newCol >= 0 && newCol < tempBoard.gridSize
        ) {
          if (tempBoard.cells[newRow][newCol].value === 'puppy') {
            return false;
          }
        }
      }
    }

    return true;
  }

  public countValidSolutions(): number {
    const board = this.state.board;
    const size = board.gridSize;

    // Precompute region matrix for O(1) lookup
    const regionMap = new Int32Array(size * size);
    for (const region of board.regions) {
      for (const cell of region.cells) {
        regionMap[cell.row * size + cell.col] = region.id;
      }
    }

    let solutionCount = 0;
    const usedCols = new Uint8Array(size);
    const usedRegions = new Set<number>();
    const currentCols = new Int32Array(size);

    function solveRow(row: number): void {
      if (solutionCount >= 2) return;
      if (row === size) {
        solutionCount++;
        return;
      }

      const prevCol = row > 0 ? currentCols[row - 1] : -99;
      for (let col = 0; col < size; col++) {
        // 1. Column uniqueness
        if (usedCols[col]) continue;
        // 2. 8-direction adjacency (only row-1 can touch)
        if (Math.abs(col - prevCol) <= 1) continue;
        // 3. Region uniqueness
        const regId = regionMap[row * size + col];
        if (usedRegions.has(regId)) continue;

        // Place
        usedCols[col] = 1;
        usedRegions.add(regId);
        currentCols[row] = col;

        solveRow(row + 1);

        // Backtrack
        usedCols[col] = 0;
        usedRegions.delete(regId);
        if (solutionCount >= 2) return;
      }
    }

    solveRow(0);
    return solutionCount;
  }



  public getEliminationHints(): { row: number; col: number; reason: string }[] {
    const board = this.state.board;
    const hints: { row: number; col: number; reason: string }[] = [];

    // Find cells that can be marked as X based on row constraints
    for (let row = 0; row < board.gridSize; row++) {
      const regionCounts = new Map<number, number>();

      for (let col = 0; col < board.gridSize; col++) {
        const cellRegion = board.regions.find(region =>
          region.cells.some(cell => cell.row === row && cell.col === col)
        );

        if (cellRegion) {
          regionCounts.set(cellRegion.id, (regionCounts.get(cellRegion.id) || 0) + 1);
        }
      }

      // If a region appears only in one row, mark other cells in that row as X
      for (const [regionId, count] of regionCounts) {
        if (count === 1) {
          const region = board.regions.find(r => r.id === regionId);
          if (region) {
            // Mark cells in this row that belong to other regions
            for (let col = 0; col < board.gridSize; col++) {
              const cellRegion = board.regions.find(r =>
                r.cells.some(cell => cell.row === row && cell.col === col)
              );

              if (cellRegion && cellRegion.id !== regionId) {
                if (board.cells[row][col].value === 'empty') {
                  hints.push({
                    row,
                    col,
                    reason: `Cannot place puppy here - region ${regionId} must be in row ${row}`
                  });
                }
              }
            }
          }
        }
      }
    }

    return hints;
  }

  public addHeart(count: number = 1): void {
    this.state.hearts = Math.min(3, this.state.hearts + count);
  }

  /**
   * Get a progressive 4-level hint with natural casual-friendly wording
   */
  public getHint(level: 1 | 2 | 3 | 4 = 1): Hint | null {
    const deductions = this.solver.findAllDeductions();

    if (deductions.length === 0) {
      return null;
    }

    // Prioritize constructive puppy placements over pure X-eliminations
    const placementDeductions = deductions.filter(d =>
      d.technique === 'single_cell_colour' ||
      d.technique === 'colour_unique_row' ||
      d.technique === 'colour_unique_column'
    );
    const candidates = placementDeductions.length > 0 ? placementDeductions : deductions;
    candidates.sort((a, b) => a.difficultyValue - b.difficultyValue);
    const deduction = candidates[0];

    const board = this.state.board;
    const cellRegion = board.regions.find(r =>
      r.cells.some(c => c.row === deduction.affectedCell.row && c.col === deduction.affectedCell.col)
    );
    const COLOR_NAMES = ['Red', 'Yellow', 'Blue', 'Green', 'Purple', 'Orange', 'Teal', 'Lavender', 'Lime', 'Pink'];
    const colorName = cellRegion ? COLOR_NAMES[(cellRegion.id - 1) % COLOR_NAMES.length] : 'this';
    const rNum = deduction.affectedCell.row + 1;
    const cNum = deduction.affectedCell.col + 1;

    let title = '💡 Hint';
    let explanation = '';
    let highlightArea: { rows: number[]; cols: number[]; regions: number[] } = { rows: [], cols: [], regions: [] };
    let targetCell: { row: number; col: number } | undefined = undefined;

    switch (deduction.technique) {
      case 'single_cell_colour':
        if (level === 1) {
          title = '💡 First Deduction';
          explanation = 'Look for a colour that has only one possible place.';
          highlightArea = { rows: [], cols: [], regions: cellRegion ? [cellRegion.id] : [] };
        } else if (level === 2) {
          title = '💡 Logical Reason';
          explanation = `The ${colorName} colour has only one possible cell remaining.`;
          highlightArea = { rows: [], cols: [], regions: cellRegion ? [cellRegion.id] : [] };
        } else if (level === 3) {
          title = '💡 Specific Location';
          explanation = `Look at Row ${rNum}, Column ${cNum}. The ${colorName} colour must go here.`;
          highlightArea = { rows: [deduction.affectedCell.row], cols: [deduction.affectedCell.col], regions: [] };
        } else {
          title = '🐶 Next Puppy';
          explanation = `Place a puppy at Row ${rNum}, Column ${cNum}!`;
          highlightArea = { rows: [deduction.affectedCell.row], cols: [deduction.affectedCell.col], regions: [] };
          targetCell = deduction.affectedCell;
        }
        break;

      case 'colour_unique_row':
        if (level === 1) {
          title = '💡 First Deduction';
          explanation = 'One row has only one place left for its colour.';
          highlightArea = { rows: [deduction.affectedCell.row], cols: [], regions: [] };
        } else if (level === 2) {
          title = '💡 Logical Reason';
          explanation = `In Row ${rNum}, ${colorName} can only fit in one spot.`;
          highlightArea = { rows: [deduction.affectedCell.row], cols: [], regions: [] };
        } else if (level === 3) {
          title = '💡 Specific Location';
          explanation = `Look at Row ${rNum}, Column ${cNum}. ${colorName} has only one spot in this row.`;
          highlightArea = { rows: [deduction.affectedCell.row], cols: [deduction.affectedCell.col], regions: [] };
        } else {
          title = '🐶 Next Puppy';
          explanation = `Place a puppy at Row ${rNum}, Column ${cNum}!`;
          highlightArea = { rows: [deduction.affectedCell.row], cols: [deduction.affectedCell.col], regions: [] };
          targetCell = deduction.affectedCell;
        }
        break;

      case 'colour_unique_column':
        if (level === 1) {
          title = '💡 First Deduction';
          explanation = 'One column has only one place left for its colour.';
          highlightArea = { rows: [], cols: [deduction.affectedCell.col], regions: [] };
        } else if (level === 2) {
          title = '💡 Logical Reason';
          explanation = `In Column ${cNum}, ${colorName} can only fit in one spot.`;
          highlightArea = { rows: [], cols: [deduction.affectedCell.col], regions: [] };
        } else if (level === 3) {
          title = '💡 Specific Location';
          explanation = `Look at Column ${cNum}, Row ${rNum}. ${colorName} has only one spot in this column.`;
          highlightArea = { rows: [deduction.affectedCell.row], cols: [deduction.affectedCell.col], regions: [] };
        } else {
          title = '🐶 Next Puppy';
          explanation = `Place a puppy at Row ${rNum}, Column ${cNum}!`;
          highlightArea = { rows: [deduction.affectedCell.row], cols: [deduction.affectedCell.col], regions: [] };
          targetCell = deduction.affectedCell;
        }
        break;

      case 'neighbour_elimination':
        if (level === 1) {
          title = '💡 Neighbour Rule';
          explanation = 'Remember puppies cannot touch, even diagonally.';
          highlightArea = { rows: [deduction.affectedCell.row], cols: [deduction.affectedCell.col], regions: [] };
        } else if (level === 2) {
          title = '💡 Logical Reason';
          explanation = 'A placed puppy prevents neighbours from having puppies here.';
          highlightArea = { rows: [deduction.affectedCell.row], cols: [deduction.affectedCell.col], regions: [] };
        } else if (level === 3) {
          title = '💡 Specific Location';
          explanation = `Check Row ${rNum}, Column ${cNum} to mark impossible spots.`;
          highlightArea = { rows: [deduction.affectedCell.row], cols: [deduction.affectedCell.col], regions: [] };
        } else {
          title = '🐶 Safe Elimination';
          explanation = `Row ${rNum}, Column ${cNum} cannot touch any existing puppies.`;
          highlightArea = { rows: [deduction.affectedCell.row], cols: [deduction.affectedCell.col], regions: [] };
          targetCell = deduction.affectedCell;
        }
        break;

      default:
        if (level === 1) {
          title = '💡 First Deduction';
          explanation = board.gridSize >= 6
            ? `There's a small bottleneck in this ${board.gridSize}×${board.gridSize} board.`
            : 'Look closely at rows and columns with almost all spots marked.';
          highlightArea = { rows: [deduction.affectedCell.row], cols: [], regions: [] };
        } else if (level === 2) {
          title = '💡 Logical Reason';
          explanation = `Row ${rNum} has only one valid position remaining.`;
          highlightArea = { rows: [deduction.affectedCell.row], cols: [], regions: [] };
        } else if (level === 3) {
          title = '💡 Specific Location';
          explanation = `Look closely at Row ${rNum}, Column ${cNum}.`;
          highlightArea = { rows: [deduction.affectedCell.row], cols: [deduction.affectedCell.col], regions: [] };
        } else {
          title = '🐶 Next Puppy';
          explanation = `This is the next puppy at Row ${rNum}, Column ${cNum}!`;
          highlightArea = { rows: [deduction.affectedCell.row], cols: [deduction.affectedCell.col], regions: [] };
          targetCell = deduction.affectedCell;
        }
        break;
    }

    return {
      level,
      technique: deduction.technique,
      title,
      explanation,
      highlightArea,
      targetCell,
    };
  }

  /**
   * Get all available deductions for the current board state
   */
  public getAllDeductions(): Deduction[] {
    return this.solver.findAllDeductions();
  }

  /**
   * Check if the puzzle has a logical starting move
   */
  public hasLogicalStartingMove(): boolean {
    return this.solver.hasLogicalStartingMove();
  }

  /**
   * Get the difficulty score for the current board state
   */
  public getDifficultyScore(): number {
    return this.solver.calculateDifficultyScore();
  }

  /**
   * Get the required techniques for solving this puzzle
   */
  public getRequiredTechniques() {
    return this.solver.getRequiredTechniques();
  }
}
