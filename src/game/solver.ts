import { Board, Deduction, DeductionTechnique } from './types';

export interface SolverOptions {
  /** Puppies required per row/column/region. Defaults to 1. */
  puppiesPerUnit?: number;
}

export interface SolveAnalysis {
  /** True when the puzzle can be finished by deduction alone (no guessing). */
  solvable: boolean;
  /** How many hypothesis-chain deductions were needed to finish. */
  chainsUsed: number;
  /** Total deduction steps applied. */
  deductionsApplied: number;
}

export class PuzzleSolver {
  private board: Board;
  private quota: number;

  constructor(board: Board, options?: SolverOptions) {
    this.board = board;
    this.quota = Math.max(1, options?.puppiesPerUnit ?? 1);
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
  public findOrderedDeductions(): Deduction[] {
    if (this.hasContradiction()) return [];
    const basic = this.findAllDeductions();
    const deductions = basic.length > 0 ? basic : this.findChainDeductions(this.board.gridSize ** 2);
    return deductions.sort((a, b) => a.difficultyValue - b.difficultyValue);
  }

  /**
   * Backtracking search for ANY full arrangement consistent with the current
   * board: existing pups are kept, marked cells and cat auras are excluded.
   * Returns the empty cells that still need a pup, or null when the board can
   * no longer be completed. Used as the hint fallback on search-heavy twin
   * boards where pure deduction stalls.
   */
  public findAnySolution(): { row: number; col: number }[] | null {
    const size = this.board.gridSize;
    const quota = this.quota;
    const cells = this.board.cells;
    const regionOf = new Int32Array(size * size).fill(-1);
    for (const region of this.board.regions) {
      for (const cell of region.cells) regionOf[cell.row * size + cell.col] = region.id;
    }
    const blocked = new Uint8Array(size * size);
    const rowPups = new Uint8Array(size);
    const colPups = new Uint8Array(size);
    const regPups = new Map<number, number>();
    const fixed: boolean[][] = [];
    for (let r = 0; r < size; r++) {
      fixed[r] = [];
      for (let c = 0; c < size; c++) {
        const v = cells[r][c].value;
        fixed[r][c] = v === 'puppy';
        if (v === 'marked') blocked[r * size + c] = 1;
        if (v === 'cat') {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr, nc = c + dc;
              if (nr >= 0 && nr < size && nc >= 0 && nc < size) blocked[nr * size + nc] = 1;
            }
          }
        }
        if (v === 'puppy') {
          rowPups[r]++;
          colPups[c]++;
          const id = regionOf[r * size + c];
          regPups.set(id, (regPups.get(id) ?? 0) + 1);
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              const nr = r + dr, nc = c + dc;
              if (nr >= 0 && nr < size && nc >= 0 && nc < size) blocked[nr * size + nc] = 1;
            }
          }
        }
      }
    }
    for (let r = 0; r < size; r++) if (rowPups[r] > quota) return null;
    for (let c = 0; c < size; c++) if (colPups[c] > quota) return null;
    for (const n of regPups.values()) if (n > quota) return null;

    const grid: boolean[][] = fixed.map(row => row.slice());
    const added: { row: number; col: number }[] = [];

    const touches = (r: number, c: number): boolean => {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < size && nc >= 0 && nc < size && grid[nr][nc]) return true;
        }
      }
      return false;
    };

    const solveRow = (r: number): boolean => {
      if (r === size) {
        for (let c = 0; c < size; c++) if (colPups[c] !== quota) return false;
        for (const region of this.board.regions) {
          if ((regPups.get(region.id) ?? 0) !== quota) return false;
        }
        return true;
      }
      if (rowPups[r] === quota) return solveRow(r + 1);
      // Prune: remaining rows must still be able to fill every column/region.
      return placeInRow(r, 0);
    };

    const placeInRow = (r: number, start: number): boolean => {
      if (rowPups[r] === quota) return solveRow(r + 1);
      for (let c = start; c < size; c++) {
        if (grid[r][c] || blocked[r * size + c] || colPups[c] >= quota) continue;
        const id = regionOf[r * size + c];
        if ((regPups.get(id) ?? 0) >= quota || touches(r, c)) continue;
        grid[r][c] = true;
        rowPups[r]++;
        colPups[c]++;
        regPups.set(id, (regPups.get(id) ?? 0) + 1);
        added.push({ row: r, col: c });
        if (placeInRow(r, c + 2)) return true;
        added.pop();
        regPups.set(id, regPups.get(id)! - 1);
        colPups[c]--;
        rowPups[r]--;
        grid[r][c] = false;
      }
      return false;
    };

    return solveRow(0) ? added : null;
  }

  public hasContradiction(): boolean {
    const regionOf = new Map<number, number>();
    for (const region of this.board.regions) {
      for (const cell of region.cells) {
        regionOf.set(cell.row * this.board.gridSize + cell.col, region.id);
      }
    }
    return this.propagateAndCheck(
      this.board.cells.map(row => row.map(cell => ({ ...cell }))),
      regionOf
    );
  }

  private findSingleCellColourDeductions(): Deduction[] {
    const deductions: Deduction[] = [];

    for (const region of this.board.regions) {
      const emptyCells = region.cells.filter(
        cell => this.board.cells[cell.row][cell.col].value === 'empty'
      );
      const puppyCount = region.cells.filter(
        cell => this.board.cells[cell.row][cell.col].value === 'puppy'
      ).length;
      const needed = this.quota - puppyCount;

      // Every remaining empty cell must hold a pup when the count matches
      if (needed > 0 && emptyCells.length === needed) {
        const cell = emptyCells[0];
        deductions.push({
          technique: 'single_cell_colour',
          affectedCell: { row: cell.row, col: cell.col },
          explanation: `Region ${region.id} needs ${needed} more ${needed === 1 ? 'puppy' : 'puppies'} and only has ${needed} ${needed === 1 ? 'spot' : 'spots'} left.`,
          eliminatedCells: emptyCells.slice(1).map(c => ({ row: c.row, col: c.col })),
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
    const size = this.board.gridSize;

    // A region whose cells ALL live in a single row supplies that row's
    // entire quota — every other empty cell in the row is eliminated.
    for (const [regionId, rowsSet] of regionRows) {
      if (rowsSet.size !== 1) continue;
      const row = Array.from(rowsSet)[0];
      const region = this.board.regions.find(r => r.id === regionId);
      if (!region) continue;

      let rowPups = 0;
      for (let c = 0; c < size; c++) {
        if (this.board.cells[row][c].value === 'puppy') rowPups++;
      }
      if (rowPups >= this.quota) continue;

      const regionCols = new Set(
        region.cells.filter(c => c.row === row).map(c => c.col)
      );
      const eliminatedCells: { row: number; col: number }[] = [];
      for (let c = 0; c < size; c++) {
        if (!regionCols.has(c) && this.board.cells[row][c].value === 'empty') {
          eliminatedCells.push({ row, col: c });
        }
      }

      if (eliminatedCells.length > 0) {
        const anchor = region.cells.find(c => c.row === row)!;
        deductions.push({
          technique: 'colour_unique_row',
          affectedCell: { row: anchor.row, col: anchor.col },
          explanation: `Region ${regionId} only exists in row ${row}, so this row's ${this.quota === 1 ? 'puppy' : 'puppies'} must be that colour — mark the rest of the row.`,
          eliminatedCells,
          difficultyValue: 2,
        });
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
    const size = this.board.gridSize;

    // Column-twin of the row rule: a region confined to one column fills it.
    for (const [regionId, colsSet] of regionCols) {
      if (colsSet.size !== 1) continue;
      const col = Array.from(colsSet)[0];
      const region = this.board.regions.find(r => r.id === regionId);
      if (!region) continue;

      let colPups = 0;
      for (let r = 0; r < size; r++) {
        if (this.board.cells[r][col].value === 'puppy') colPups++;
      }
      if (colPups >= this.quota) continue;

      const regionRows = new Set(
        region.cells.filter(c => c.col === col).map(c => c.row)
      );
      const eliminatedCells: { row: number; col: number }[] = [];
      for (let r = 0; r < size; r++) {
        if (!regionRows.has(r) && this.board.cells[r][col].value === 'empty') {
          eliminatedCells.push({ row: r, col });
        }
      }

      if (eliminatedCells.length > 0) {
        const anchor = region.cells.find(c => c.col === col)!;
        deductions.push({
          technique: 'colour_unique_column',
          affectedCell: { row: anchor.row, col: anchor.col },
          explanation: `Region ${regionId} only exists in column ${col}, so this column's ${this.quota === 1 ? 'puppy' : 'puppies'} must be that colour — mark the rest of the column.`,
          eliminatedCells,
          difficultyValue: 2,
        });
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

      if (puppyCount === this.quota) {
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
            explanation: `Row ${row} already has ${this.quota === 1 ? 'a dog' : `${this.quota} dogs`}, so all other cells in this row can be marked as X.`,
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

      if (puppyCount === this.quota) {
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
            explanation: `Column ${col} already has ${this.quota === 1 ? 'a dog' : `${this.quota} dogs`}, so all other cells in this column can be marked as X.`,
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

      if (puppyCount === this.quota && puppyCell) {
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
              newCol >= 0 && newCol < this.board.gridSize
            ) {
              const neighbour = this.board.cells[newRow][newCol].value;
              if (neighbour === 'puppy' || neighbour === 'cat') {
                deductions.push({
                  technique: 'neighbour_elimination',
                  affectedCell: { row, col },
                  explanation: neighbour === 'cat'
                    ? `This cell touches a grumpy cat at (${newRow}, ${newCol}), so no pup can sit here.`
                    : `This cell touches a dog at (${newRow}, ${newCol}), so it cannot contain a dog.`,
                  eliminatedCells: [{ row, col }],
                  difficultyValue: 1,
                });
                break; // Only need one neighbour to eliminate
              }
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

  /**
   * RULE H: Deduction Chain (hypothesis → contradiction)
   * For each empty cell, tentatively place a pup and propagate forced
   * eliminations. If the hypothesis makes any unit impossible to satisfy,
   * the cell cannot hold a pup — eliminate it.
   */
  public findChainDeductions(maxHypotheses = 60): Deduction[] {
    const deductions: Deduction[] = [];
    const size = this.board.gridSize;

    const regionOf = new Map<number, number>();
    for (const region of this.board.regions) {
      for (const cell of region.cells) {
        regionOf.set(cell.row * size + cell.col, region.id);
      }
    }

    let hypotheses = 0;
    for (let row = 0; row < size && hypotheses < maxHypotheses; row++) {
      for (let col = 0; col < size && hypotheses < maxHypotheses; col++) {
        if (this.board.cells[row][col].value !== 'empty') continue;
        hypotheses++;

        if (this.hypothesisContradicts(row, col, regionOf)) {
          deductions.push({
            technique: 'deduction_chain',
            affectedCell: { row, col },
            explanation: `Placing a pup at (${row}, ${col}) strands a row, column, or patch with no room left — so it can't go here.`,
            eliminatedCells: [{ row, col }],
            difficultyValue: 5,
          });
          continue;
        }

        // Complementary hypothesis: if MARKING this cell strands a unit,
        // the cell is forced — it must hold a pup. Empty eliminatedCells
        // signals "placement" to analyze().
        if (this.skipHypothesisContradicts(row, col, regionOf)) {
          deductions.push({
            technique: 'deduction_chain',
            affectedCell: { row, col },
            explanation: `Skipping (${row}, ${col}) leaves a row, column, or patch without room — so a pup must go here.`,
            eliminatedCells: [],
            difficultyValue: 5,
          });
        }
      }
    }

    return deductions;
  }

  /**
   * Tentatively MARK (row,col) as empty-forever and propagate; true when a
   * unit can no longer reach its quota → the cell is forced to hold a pup.
   */
  private skipHypothesisContradicts(
    row: number,
    col: number,
    regionOf: Map<number, number>
  ): boolean {
    const size = this.board.gridSize;
    const cells = this.board.cells.map(r => r.map(c => ({ ...c })));
    cells[row][col].value = 'marked';
    return this.propagateAndCheck(cells, regionOf);
  }

  /**
   * Tentatively place a pup at (row,col) on a scratch board and greedily
   * eliminate everything the placement forces. Returns true when a unit
   * (row/col/region) can no longer reach its quota.
   */
  private hypothesisContradicts(
    row: number,
    col: number,
    regionOf: Map<number, number>
  ): boolean {
    const cells = this.board.cells.map(r => r.map(c => ({ ...c })));
    cells[row][col].value = 'puppy';
    return this.propagateAndCheck(cells, regionOf);
  }

  /**
   * Shared propagation+contradiction pass over a scratch board.
   * Eliminates every cell forced out by pups/cats/quota, then reports whether
   * any row, column, or region can no longer reach its quota.
   */
  private propagateAndCheck(
    cells: { value: string }[][],
    regionOf: Map<number, number>
  ): boolean {
    const size = this.board.gridSize;
    const quota = this.quota;
    const regionCells = this.board.regions;

    const propagate = (): void => {
      let changed = true;
      while (changed) {
        changed = false;
        for (let r = 0; r < size; r++) {
          for (let c = 0; c < size; c++) {
            if (cells[r][c].value !== 'empty') continue;

            let rowPups = 0;
            let colPups = 0;
            for (let i = 0; i < size; i++) {
              if (cells[r][i].value === 'puppy') rowPups++;
              if (cells[i][c].value === 'puppy') colPups++;
            }
            const regId = regionOf.get(r * size + c);
            let regPups = 0;
            if (regId !== undefined) {
              const region = regionCells.find(reg => reg.id === regId);
              if (region) {
                for (const cell of region.cells) {
                  if (cells[cell.row][cell.col].value === 'puppy') regPups++;
                }
              }
            }

            let touchesPupOrCat = false;
            for (let dr = -1; dr <= 1 && !touchesPupOrCat; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const nr = r + dr;
                const nc = c + dc;
                if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;
                const v = cells[nr][nc].value;
                if (v === 'puppy' || v === 'cat') {
                  touchesPupOrCat = true;
                  break;
                }
              }
            }

            if (rowPups >= quota || colPups >= quota || regPups >= quota || touchesPupOrCat) {
              cells[r][c].value = 'marked';
              changed = true;
            }
          }
        }
      }
    };

    propagate();

    // A unit is contradictory when puppies already placed exceed the quota,
    // or placed + remaining empty candidates can no longer reach the quota.
    const unitState = (pups: number, empties: number) =>
      pups > quota || pups + empties < quota;

    for (let r = 0; r < size; r++) {
      let pups = 0;
      let empties = 0;
      for (let c = 0; c < size; c++) {
        if (cells[r][c].value === 'puppy') pups++;
        else if (cells[r][c].value === 'empty') empties++;
      }
      if (unitState(pups, empties)) return true;
    }
    for (let c = 0; c < size; c++) {
      let pups = 0;
      let empties = 0;
      for (let r = 0; r < size; r++) {
        if (cells[r][c].value === 'puppy') pups++;
        else if (cells[r][c].value === 'empty') empties++;
      }
      if (unitState(pups, empties)) return true;
    }
    for (const region of regionCells) {
      let pups = 0;
      let empties = 0;
      for (const cell of region.cells) {
        if (cells[cell.row][cell.col].value === 'puppy') pups++;
        else if (cells[cell.row][cell.col].value === 'empty') empties++;
      }
      if (unitState(pups, empties)) return true;
    }

    return false;
  }

  /**
   * Greedy logical solve: apply basic deductions until stalled, then fall
   * back to chain deductions. Reports whether the puzzle finishes by logic
   * alone — the generator uses this to reject guess-dependent boards.
   */
  public analyze(maxRounds = 400): SolveAnalysis {
    const size = this.board.gridSize;
    const cells = this.board.cells.map(r => r.map(c => ({ ...c })));
    const workBoard: Board = {
      gridSize: size,
      cells,
      regions: this.board.regions,
    };

    let chainsUsed = 0;
    let deductionsApplied = 0;

    for (let round = 0; round < maxRounds; round++) {
      const solver = new PuzzleSolver(workBoard, { puppiesPerUnit: this.quota });
      const basic = solver.findAllDeductions();

      if (basic.length === 0) {
        const chains = solver.findChainDeductions();
        if (chains.length === 0) break;
        chainsUsed++;
        // Empty eliminatedCells = mark-hypothesis contradicted → forced placement
        if (chains[0].eliminatedCells.length === 0) {
          cells[chains[0].affectedCell.row][chains[0].affectedCell.col].value = 'puppy';
        } else {
          for (const cell of chains[0].eliminatedCells) {
            cells[cell.row][cell.col].value = 'marked';
          }
        }
        deductionsApplied++;
        continue;
      }

      // single_cell_colour is the only technique that pinpoints exact cells;
      // colour_unique_* and *_elimination only eliminate candidates.
      const placement = basic.find(d => d.technique === 'single_cell_colour');
      const chosen = placement ?? basic[0];

      if (placement) {
        cells[chosen.affectedCell.row][chosen.affectedCell.col].value = 'puppy';
        // At quota>1 the other forced region cells are co-placements
        const coPlace = true;
        for (const cell of chosen.eliminatedCells) {
          if (cells[cell.row][cell.col].value === 'empty') {
            cells[cell.row][cell.col].value = coPlace ? 'puppy' : 'marked';
          }
        }
      } else {
        for (const cell of chosen.eliminatedCells) {
          cells[cell.row][cell.col].value = 'marked';
        }
      }
      deductionsApplied++;
    }

    // Solved when every row holds exactly `quota` pups
    let complete = true;
    for (let r = 0; r < size && complete; r++) {
      let pups = 0;
      for (let c = 0; c < size; c++) {
        if (cells[r][c].value === 'puppy') pups++;
      }
      if (pups !== this.quota) complete = false;
    }

    return { solvable: complete, chainsUsed, deductionsApplied };
  }
}