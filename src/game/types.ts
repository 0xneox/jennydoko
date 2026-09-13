export type CellValue = 'empty' | 'puppy' | 'marked' | 'cat';

export interface Cell {
  row: number;
  col: number;
  value: CellValue;
}

export interface Region {
  id: number;
  cells: { row: number; col: number }[];
  /**
   * Linked beds: the region's cells are intentionally non-contiguous —
   * two far-apart flower beds that share a single puppy.
   */
  linked?: boolean;
}

export interface Board {
  gridSize: number;
  cells: Cell[][];
  regions: Region[];
}

export interface GameState {
  board: Board;
  hearts: number;
  moves: number;
  history: Board[];
  isComplete: boolean;
  currentLevel: number;
}

export type DifficultyLevel = 'beginner' | 'easy' | 'medium' | 'hard' | 'expert' | 'master' | 'legend';

export type DeductionTechnique =
  | 'single_cell_colour'
  | 'colour_unique_row'
  | 'colour_unique_column'
  | 'row_elimination'
  | 'column_elimination'
  | 'region_elimination'
  | 'neighbour_elimination'
  | 'deduction_chain'
  /** Hint fallback: a pup placement found by search when deduction stalls. */
  | 'search_placement';

export interface PuzzleData {
  level: number;
  gridSize: number;
  regions: Region[];
  solution: { row: number; col: number }[];
  difficulty: DifficultyLevel;
  techniquesRequired: DeductionTechnique[];
  techniquesIntroduced: DeductionTechnique[];
  hasLogicalStart: boolean;
  startingDeduction?: string;
  estimatedSolvingSteps?: number;
  /**
   * Puppies required per row, column AND region. Defaults to 1.
   * 2 = "Twin Puppies" — Star Battle style double-placement boards.
   */
  puppiesPerUnit?: number;
  /**
   * Grumpy cat cells. A cat can never hold a puppy, and no puppy may sit in
   * any of the 8 cells touching a cat (cats need personal space too).
   */
  cats?: { row: number; col: number }[];
  /** Procedural boards: the seed trial that produced this puzzle. */
  seedTrial?: number;
}

export interface PuzzleMetadata {
  level: number;
  gridSize: number;
  difficulty: DifficultyLevel;
  techniquesIntroduced: DeductionTechnique[];
  techniquesRequired: DeductionTechnique[];
  completionStatus: 'locked' | 'unlocked' | 'completed';
  starsEarned: number;
  hintsUsed: number;
  mistakes: number;
  bestMoves: number | null;
  completionTime: number | null;
}

export interface Deduction {
  technique: DeductionTechnique;
  affectedCell: { row: number; col: number };
  explanation: string;
  eliminatedCells: { row: number; col: number }[];
  difficultyValue: number;
}
