import { Board, Cell, Region, GameState, PuzzleData } from './types';

export class GameEngine {
  private static isInsideBoard(row: number, col: number, size: number): boolean {
    return row >= 0 && row < size && col >= 0 && col < size;
  }
  private state: GameState;
  // cell (row*size+col) -> Region; regions are immutable for a puzzle's lifetime
  private cellRegionIndex: Map<number, Region>;
  // Puppies required per row / column / region (1 = classic, 2 = Twin Puppies)
  private quota: number;

  constructor(puzzleData: PuzzleData) {
    const board = this.createBoard(puzzleData);
    this.quota = Math.max(1, puzzleData.puppiesPerUnit ?? 1);
    this.cellRegionIndex = new Map();
    for (const region of board.regions) {
      for (const cell of region.cells) {
        this.cellRegionIndex.set(cell.row * board.gridSize + cell.col, region);
      }
    }
    this.state = {
      board,
      hearts: 3,
      moves: 0,
      history: [GameEngine.cloneBoard(board)],
      isComplete: false,
      currentLevel: puzzleData.level,
    };
  }

  private createBoard(puzzleData: PuzzleData): Board {
    const cells: Cell[][] = [];
    for (let row = 0; row < puzzleData.gridSize; row++) {
      cells[row] = [];
      for (let col = 0; col < puzzleData.gridSize; col++) {
        cells[row][col] = { row, col, value: 'empty' };
      }
    }

    for (const cat of puzzleData.cats ?? []) {
      if (GameEngine.isInsideBoard(cat.row, cat.col, puzzleData.gridSize)) {
        cells[cat.row][cat.col].value = 'cat';
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
      regions: board.regions,
    };
  }

  public getState(): GameState {
    return {
      ...this.state,
      board: GameEngine.cloneBoard(this.state.board),
      // History entries are immutable snapshots — share them instead of
      // deep-cloning the entire history on every call (O(moves) otherwise).
      history: this.state.history.slice(),
    };
  }

  public placePuppy(row: number, col: number): boolean {
    if (this.state.isComplete) {
      return false;
    }

    const board = this.state.board;
    if (!GameEngine.isInsideBoard(row, col, board.gridSize)) {
      return false;
    }

    if (board.cells[row][col].value === 'puppy') {
      board.cells[row][col].value = 'empty';
      this.state.moves++;
      this.state.history.push(GameEngine.cloneBoard(board));
      this.state.isComplete = false;
      return true;
    }

    if (!this.isValidPlacement(board, row, col)) {
      this.state.hearts = Math.max(0, this.state.hearts - 1);
      return false;
    }

    board.cells[row][col].value = 'puppy';
    this.state.moves++;
    this.state.history.push(GameEngine.cloneBoard(board));

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

    if (board.cells[row][col].value === 'cat') {
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

  public restart(): void {
    const initialBoard = GameEngine.cloneBoard(this.state.history[0]);
    this.state.board = initialBoard;
    this.state.hearts = 3;
    this.state.moves = 0;
    this.state.history = [GameEngine.cloneBoard(initialBoard)];
    this.state.isComplete = false;
  }

  public undo(): boolean {
    if (this.state.history.length <= 1) {
      return false;
    }
    this.state.history.pop();
    const board = GameEngine.cloneBoard(this.state.history[this.state.history.length - 1]);
    this.state.board = board;
    this.state.moves = Math.max(0, this.state.moves - 1);
    this.state.isComplete = false;
    return true;
  }

  private isValidPlacement(board: Board, row: number, col: number): boolean {
    if (board.cells[row][col].value === 'cat') {
      return false;
    }

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
    let count = 0;
    for (let c = 0; c < board.gridSize; c++) {
      if (c !== col && board.cells[row][c].value === 'puppy') {
        count++;
      }
    }
    return count < this.quota;
  }

  private validateColumn(board: Board, row: number, col: number): boolean {
    let count = 0;
    for (let r = 0; r < board.gridSize; r++) {
      if (r !== row && board.cells[r][col].value === 'puppy') {
        count++;
      }
    }
    return count < this.quota;
  }

  private validateRegion(board: Board, row: number, col: number): boolean {
    const cellRegion = this.cellRegionIndex.get(row * board.gridSize + col);

    if (!cellRegion) {
      return false;
    }

    let count = 0;
    for (const cell of cellRegion.cells) {
      if (cell.row !== row || cell.col !== col) {
        if (board.cells[cell.row][cell.col].value === 'puppy') {
          count++;
        }
      }
    }

    return count < this.quota;
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
        const neighbour = board.cells[newRow][newCol].value;
        // Cats need the same personal-space buffer puppies do
        if (neighbour === 'puppy' || neighbour === 'cat') {
          return false;
        }
      }
    }

    return true;
  }

  private checkWinCondition(): boolean {
    const board = this.state.board;
    const puppyCount = this.countPuppies(board);

    if (puppyCount !== board.gridSize * this.quota) {
      return false;
    }

    for (let row = 0; row < board.gridSize; row++) {
      let rowPuppies = 0;
      for (let col = 0; col < board.gridSize; col++) {
        if (board.cells[row][col].value === 'puppy') {
          rowPuppies++;
        }
      }
      if (rowPuppies !== this.quota) {
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
      if (colPuppies !== this.quota) {
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
      if (regionPuppies !== this.quota) {
        return false;
      }
    }

    // C1: Pairwise 8-directional adjacency check.
    // Collect all puppy coordinates, then verify NO two touch (even diagonally).
    const puppies: Array<[number, number]> = [];
    for (let r = 0; r < board.gridSize; r++) {
      for (let c = 0; c < board.gridSize; c++) {
        if (board.cells[r][c].value === 'puppy') {
          puppies.push([r, c]);
        }
      }
    }
    const adjacencyDirections = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1],
    ];
    for (const [pr, pc] of puppies) {
      for (const [dr, dc] of adjacencyDirections) {
        const nr = pr + dr;
        const nc = pc + dc;
        if (!GameEngine.isInsideBoard(nr, nc, board.gridSize)) continue;
        if (board.cells[nr][nc].value === 'puppy' && !(nr === pr && nc === pc)) {
          return false;
        }
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
    const quota = this.quota;
    const solutionSet = new Set(
      solution.map(s => `${s.row},${s.col}`)
    );

    if (solutionSet.size !== board.gridSize * quota) {
      return false;
    }

    for (const sol of solution) {
      if (sol.row < 0 || sol.row >= board.gridSize ||
          sol.col < 0 || sol.col >= board.gridSize) {
        return false;
      }
      if (board.cells[sol.row][sol.col].value === 'cat') {
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
      if (rowPuppies !== quota) {
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
      if (colPuppies !== quota) {
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
      if (regionPuppies !== quota) {
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
          const neighbour = tempBoard.cells[newRow][newCol].value;
          if (neighbour === 'puppy' || neighbour === 'cat') {
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
    const quota = this.quota;

    const regionMap = new Int32Array(size * size);
    for (const region of board.regions) {
      for (const cell of region.cells) {
        regionMap[cell.row * size + cell.col] = region.id;
      }
    }

    // Cat cells and every cell touching a cat are permanently forbidden
    const forbidden = new Uint8Array(size * size);
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (board.cells[r][c].value === 'cat') {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
                forbidden[nr * size + nc] = 1;
              }
            }
          }
        }
      }
    }

    let solutionCount = 0;
    const usedCols = new Uint8Array(size);
    const usedRegions = new Map<number, number>();
    // placedCols[row*quota + k] = col of the k-th puppy placed on that row
    const placedCols = new Int32Array(size * quota).fill(-1);

    function cellUsable(row: number, col: number): boolean {
      if (forbidden[row * size + col]) return false;
      if (usedCols[col] >= quota) return false;
      const regId = regionMap[row * size + col];
      if ((usedRegions.get(regId) || 0) >= quota) return false;
      if (row > 0) {
        for (let k = 0; k < quota; k++) {
          const pc = placedCols[(row - 1) * quota + k];
          if (pc >= 0 && Math.abs(col - pc) <= 1) return false;
        }
      }
      return true;
    }

    // Place `quota` mutually non-adjacent puppies on this row, then recurse.
    function placeOnRow(row: number, startCol: number, placed: number): void {
      if (solutionCount >= 2) return;
      if (placed === quota) {
        solveRow(row + 1);
        return;
      }
      for (let col = startCol; col < size; col++) {
        // same-row spacing: previous pick on this row must be >= 2 away
        if (placed > 0 && col - placedCols[row * quota + placed - 1] <= 1) continue;
        if (!cellUsable(row, col)) continue;

        const regId = regionMap[row * size + col];
        usedCols[col]++;
        usedRegions.set(regId, (usedRegions.get(regId) || 0) + 1);
        placedCols[row * quota + placed] = col;

        placeOnRow(row, col + 1, placed + 1);

        usedCols[col]--;
        usedRegions.set(regId, usedRegions.get(regId)! - 1);
        placedCols[row * quota + placed] = -1;
        if (solutionCount >= 2) return;
      }
    }

    function solveRow(row: number): void {
      if (solutionCount >= 2) return;
      if (row === size) {
        // every row placed `quota` pups — regions/cols hit quota exactly
        // only if all quotas are met (region capacities enforced during placement)
        for (const region of board.regions) {
          if ((usedRegions.get(region.id) || 0) !== quota) return;
        }
        for (let c = 0; c < size; c++) {
          if (usedCols[c] !== quota) return;
        }
        solutionCount++;
        return;
      }
      placeOnRow(row, 0, 0);
    }

    solveRow(0);
    return solutionCount;
  }

  public addHeart(count: number = 1): void {
    this.state.hearts = Math.min(3, this.state.hearts + count);
  }

}
