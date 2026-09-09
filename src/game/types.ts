export type CellValue = 'empty' | 'puppy' | 'marked';

export interface Cell {
  row: number;
  col: number;
  value: CellValue;
}

export interface Region {
  id: number;
  cells: { row: number; col: number }[];
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
  | 'deduction_chain';

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

export interface Hint {
  level: 1 | 2 | 3 | 4;
  technique: DeductionTechnique;
  title?: string;
  explanation: string;
  highlightArea: HighlightArea;
  targetCell?: { row: number; col: number };
}

export interface HighlightArea {
  rows: number[];
  cols: number[];
  regions: number[];
}
