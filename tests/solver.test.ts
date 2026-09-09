import { PuzzleSolver } from '../src/game/solver';
import { Board } from '../src/game/types';
import { level1, level2 } from '../src/data/puzzles';

function createEmptyBoard(gridSize: number, regions: any[]): Board {
  const board: Board = {
    gridSize,
    cells: [],
    regions,
  };

  for (let row = 0; row < gridSize; row++) {
    board.cells[row] = [];
    for (let col = 0; col < gridSize; col++) {
      board.cells[row][col] = { row, col, value: 'empty' };
    }
  }

  return board;
}

describe('PuzzleSolver', () => {
  describe('Level 1', () => {
    it('should find single-cell colour deductions', () => {
      const board = createEmptyBoard(4, level1.regions);
      const solver = new PuzzleSolver(board);
      const deductions = solver.findAllDeductions();

      expect(deductions.length).toBeGreaterThan(0);
      expect(deductions.some(d => d.technique === 'colour_unique_row' || d.technique === 'colour_unique_column')).toBe(true);
    });

    it('should detect colour unique in row', () => {
      const board = createEmptyBoard(4, level1.regions);
      const solver = new PuzzleSolver(board);
      const deductions = solver.findAllDeductions();

      expect(deductions.some(d => d.technique === 'colour_unique_row')).toBe(true);
    });

    it('should detect colour unique in column', () => {
      const board = createEmptyBoard(4, level1.regions);
      const solver = new PuzzleSolver(board);
      const deductions = solver.findAllDeductions();

      expect(deductions.some(d => d.technique === 'colour_unique_column')).toBe(true);
    });

    it('should detect neighbour elimination', () => {
      const board = createEmptyBoard(4, level1.regions);
      board.cells[0][1].value = 'puppy';

      const solver = new PuzzleSolver(board);
      const deductions = solver.findAllDeductions();

      expect(deductions.some(d => d.technique === 'neighbour_elimination')).toBe(true);
    });

    it('should have logical starting move', () => {
      const board = createEmptyBoard(4, level1.regions);
      const solver = new PuzzleSolver(board);
      const hasLogicalStart = solver.hasLogicalStartingMove();

      expect(hasLogicalStart).toBe(true);
    });
  });

  describe('Level 2', () => {
    it('should find deductions for 5x5 grid', () => {
      const board = createEmptyBoard(5, level2.regions);
      const solver = new PuzzleSolver(board);
      const deductions = solver.findAllDeductions();

      expect(deductions.length).toBeGreaterThan(0);
    });

    it('should calculate difficulty score', () => {
      const board = createEmptyBoard(5, level2.regions);
      const solver = new PuzzleSolver(board);
      const score = solver.calculateDifficultyScore();

      expect(typeof score).toBe('number');
      expect(score).toBeGreaterThanOrEqual(0);
    });

    it('should get required techniques', () => {
      const board = createEmptyBoard(5, level2.regions);
      const solver = new PuzzleSolver(board);
      const techniques = solver.getRequiredTechniques();

      expect(Array.isArray(techniques)).toBe(true);
    });
  });

  describe('Row Elimination', () => {
    it('should detect row elimination when puppy is placed', () => {
      const board = createEmptyBoard(4, level1.regions);
      board.cells[0][1].value = 'puppy';

      const solver = new PuzzleSolver(board);
      const deductions = solver.findAllDeductions();

      expect(deductions.some(d => d.technique === 'row_elimination')).toBe(true);
    });
  });

  describe('Column Elimination', () => {
    it('should detect column elimination when puppy is placed', () => {
      const board = createEmptyBoard(4, level1.regions);
      board.cells[0][1].value = 'puppy';

      const solver = new PuzzleSolver(board);
      const deductions = solver.findAllDeductions();

      expect(deductions.some(d => d.technique === 'column_elimination')).toBe(true);
    });
  });

  describe('Region Elimination', () => {
    it('should detect region elimination when puppy is placed', () => {
      const board = createEmptyBoard(4, level1.regions);
      board.cells[0][1].value = 'puppy';

      const solver = new PuzzleSolver(board);
      const deductions = solver.findAllDeductions();

      expect(deductions.some(d => d.technique === 'region_elimination')).toBe(true);
    });
  });
});