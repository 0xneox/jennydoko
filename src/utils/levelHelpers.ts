import { getPuzzle, getLevelConfig } from '../data/proceduralPuzzles';
import { DifficultyLevel } from '../game/types';

export const getLevelDifficulty = (level: number): DifficultyLevel => {
  if (level <= 100) {
    const puzzle = getPuzzle(level);
    return puzzle?.difficulty || 'beginner';
  }
  return getLevelConfig(level).difficulty;
};

export const getDifficultyColor = (difficulty: DifficultyLevel): string => {
  switch (difficulty) {
    case 'beginner':
      return '#4CAF50'; // Green
    case 'easy':
      return '#8BC34A'; // Light Green
    case 'medium':
      return '#FFC107'; // Amber
    case 'hard':
      return '#FF9800'; // Orange
    case 'expert':
      return '#F44336'; // Red
    case 'master':
      return '#9C27B0'; // Purple
    case 'legend':
      return '#E91E63'; // Deep Pink
    default:
      return '#9E9E9E'; // Grey
  }
};

export const getDifficultyLabel = (difficulty: DifficultyLevel): string => {
  switch (difficulty) {
    case 'beginner':
      return '★';
    case 'easy':
      return '★★';
    case 'medium':
      return '★★★';
    case 'hard':
      return '★★★★';
    case 'expert':
      return '★★★★★';
    case 'master':
      return '★★★★★★';
    case 'legend':
      return '★★★★★★★';
    default:
      return '?';
  }
};
