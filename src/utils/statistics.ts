const STATS_KEY = '@jenny_game_stats';

export interface LevelStats {
  bestMoves: number;
  bestTime: number; // in seconds
  completions: number;
  hintsUsed: number;
  stars?: number;
}

export function calculatePawfectStars(heartsLeft: number = 3, _hintsUsed: number = 0): {
  stars: 1 | 2 | 3;
  label: string;
  subtext: string;
} {
  if (heartsLeft >= 3) {
    return {
      stars: 3,
      label: 'Paw-fect Master! 🐾',
      subtext: 'Flawless deduction with gentle paws!',
    };
  }
  if (heartsLeft === 2) {
    return {
      stars: 2,
      label: 'Wonderful Sitter! 🐶',
      subtext: 'Great focus and loving care!',
    };
  }
  return {
    stars: 1,
    label: 'Garden Cleared! 🌸',
    subtext: 'All puppies are safe and happy!',
  };
}

export interface GameStats {
  totalPuzzlesSolved: number;
  totalPlayTime: number; // in seconds
  levelStats: Record<number, LevelStats>;
}

const isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
let asyncStorageAvailable: boolean = false;
let memoryStats: GameStats = {
  totalPuzzlesSolved: 0,
  totalPlayTime: 0,
  levelStats: {},
};

// Check if AsyncStorage is available
const checkAsyncStorage = async () => {
  if (isWeb) {
    asyncStorageAvailable = false;
    return;
  }
  try {
    const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
    const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
    await AsyncStorage.setItem('__test__', 'test');
    await AsyncStorage.removeItem('__test__');
    asyncStorageAvailable = true;
  } catch (error) {
    console.log('AsyncStorage not available, using in-memory stats');
    asyncStorageAvailable = false;
  }
};

checkAsyncStorage();

export const loadStats = async (): Promise<GameStats> => {
  try {
    let jsonValue: string | null;
    if (isWeb) {
      jsonValue = localStorage.getItem(STATS_KEY);
    } else if (asyncStorageAvailable) {
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      jsonValue = await AsyncStorage.getItem(STATS_KEY);
    } else {
      return memoryStats;
    }
    return jsonValue != null ? JSON.parse(jsonValue) : memoryStats;
  } catch (error) {
    console.error('Error loading stats:', error);
    return memoryStats;
  }
};

export const saveStats = async (stats: GameStats): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(stats);
    if (isWeb) {
      localStorage.setItem(STATS_KEY, jsonValue);
    } else if (asyncStorageAvailable) {
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      await AsyncStorage.setItem(STATS_KEY, jsonValue);
    } else {
      memoryStats = stats;
    }
  } catch (error) {
    console.error('Error saving stats:', error);
  }
};

export const recordLevelCompletion = async (
  level: number,
  moves: number,
  time: number,
  hintsUsed: number,
  heartsLeft: number = 3
): Promise<{ stars: 1 | 2 | 3; label: string; subtext: string }> => {
  const stats = await loadStats();
  const starResult = calculatePawfectStars(heartsLeft);
  
  stats.totalPuzzlesSolved++;
  stats.totalPlayTime += time;

  if (!stats.levelStats[level]) {
    stats.levelStats[level] = {
      bestMoves: moves,
      bestTime: time,
      completions: 0,
      hintsUsed: 0,
      stars: starResult.stars,
    };
  }

  const levelStats = stats.levelStats[level];
  levelStats.completions++;
  levelStats.hintsUsed += hintsUsed;
  levelStats.stars = Math.max(levelStats.stars || 1, starResult.stars);

  if (moves < levelStats.bestMoves) {
    levelStats.bestMoves = moves;
  }

  if (time < levelStats.bestTime) {
    levelStats.bestTime = time;
  }

  await saveStats(stats);
  return starResult;
};

export const getLevelStats = async (level: number): Promise<LevelStats | null> => {
  const stats = await loadStats();
  return stats.levelStats[level] || null;
};

export const getTotalStats = async (): Promise<GameStats> => {
  return await loadStats();
};

export const clearStats = async (): Promise<void> => {
  const emptyStats: GameStats = {
    totalPuzzlesSolved: 0,
    totalPlayTime: 0,
    levelStats: {},
  };
  await saveStats(emptyStats);
  memoryStats = emptyStats;
};
