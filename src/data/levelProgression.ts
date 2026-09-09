import { PuzzleMetadata, DifficultyLevel, DeductionTechnique } from '../game/types';

export class LevelProgression {
  private static levels: Map<number, PuzzleMetadata> = new Map();

  /**
   * Initialize the level progression system
   */
  public static initialize(): void {
    // Initialize with default level metadata
    this.levels.set(1, {
      level: 1,
      gridSize: 4,
      difficulty: 'beginner',
      techniquesIntroduced: ['colour_unique_row', 'colour_unique_column'],
      techniquesRequired: ['colour_unique_row', 'colour_unique_column', 'neighbour_elimination'],
      completionStatus: 'unlocked',
      starsEarned: 0,
      hintsUsed: 0,
      mistakes: 0,
      bestMoves: null,
      completionTime: null,
    });

    this.levels.set(2, {
      level: 2,
      gridSize: 5,
      difficulty: 'easy',
      techniquesIntroduced: ['row_elimination'],
      techniquesRequired: ['colour_unique_row', 'colour_unique_column', 'neighbour_elimination', 'row_elimination'],
      completionStatus: 'locked',
      starsEarned: 0,
      hintsUsed: 0,
      mistakes: 0,
      bestMoves: null,
      completionTime: null,
    });

    // Additional levels can be added for 6x6, 7x7, 8x8, 9x9, 10x10 grids
    // The architecture supports any grid size from 4x4 to 10x10
  }

  /**
   * Get metadata for a specific level
   */
  public static getLevelMetadata(level: number): PuzzleMetadata | null {
    return this.levels.get(level) || null;
  }

  /**
   * Update level metadata
   */
  public static updateLevelMetadata(metadata: PuzzleMetadata): void {
    this.levels.set(metadata.level, metadata);
  }

  /**
   * Mark a level as completed
   */
  public static completeLevel(
    level: number,
    stars: number,
    hintsUsed: number,
    mistakes: number,
    moves: number,
    completionTime: number
  ): void {
    const metadata = this.levels.get(level);
    if (!metadata) return;

    metadata.completionStatus = 'completed';
    metadata.starsEarned = Math.max(metadata.starsEarned, stars);
    metadata.hintsUsed = hintsUsed;
    metadata.mistakes = mistakes;
    metadata.bestMoves = metadata.bestMoves === null ? moves : Math.min(metadata.bestMoves, moves);
    metadata.completionTime = metadata.completionTime === null ? completionTime : Math.min(metadata.completionTime, completionTime);

    // Unlock next level
    const nextLevel = level + 1;
    const nextMetadata = this.levels.get(nextLevel);
    if (nextMetadata && nextMetadata.completionStatus === 'locked') {
      nextMetadata.completionStatus = 'unlocked';
      this.levels.set(nextLevel, nextMetadata);
    }

    this.levels.set(level, metadata);
  }

  /**
   * Get the next unlocked level
   */
  public static getNextUnlockedLevel(): number {
    for (const [level, metadata] of this.levels) {
      if (metadata.completionStatus === 'unlocked') {
        return level;
      }
    }
    return 1; // Default to level 1
  }

  /**
   * Get all completed levels
   */
  public static getCompletedLevels(): number[] {
    const completed: number[] = [];
    for (const [level, metadata] of this.levels) {
      if (metadata.completionStatus === 'completed') {
        completed.push(level);
      }
    }
    return completed.sort((a, b) => a - b);
  }

  /**
   * Calculate stars earned for a level completion
   */
  public static calculateStars(
    hintsUsed: number,
    mistakes: number,
    moves: number,
    gridSize: number
  ): number {
    let stars = 3;

    // Deduct stars for hints
    if (hintsUsed > 0) stars--;
    if (hintsUsed > 2) stars--;

    // Deduct stars for mistakes
    if (mistakes > 0) stars--;
    if (mistakes > 1) stars--;

    // Bonus for efficient solving
    const optimalMoves = gridSize;
    if (moves <= optimalMoves + 2) {
      // No deduction for efficiency
    } else if (moves > optimalMoves + 5) {
      stars--;
    }

    return Math.max(1, Math.min(3, stars));
  }

  /**
   * Get technique progression information
   */
  public static getTechniqueProgression(): {
    level: number;
    technique: DeductionTechnique;
  }[] {
    const progression: { level: number; technique: DeductionTechnique }[] = [];

    for (const [level, metadata] of this.levels) {
      for (const technique of metadata.techniquesIntroduced) {
        progression.push({ level, technique });
      }
    }

    return progression.sort((a, b) => a.level - b.level);
  }

  /**
   * Get total progress percentage
   */
  public static getTotalProgress(): number {
    const totalLevels = this.levels.size;
    const completedLevels = this.getCompletedLevels().length;
    return (completedLevels / totalLevels) * 100;
  }

  /**
   * Add a new level to the progression
   */
  public static addLevel(metadata: PuzzleMetadata): void {
    this.levels.set(metadata.level, metadata);
  }

  /**
   * Get all levels
   */
  public static getAllLevels(): PuzzleMetadata[] {
    return Array.from(this.levels.values()).sort((a, b) => a.level - b.level);
  }
}