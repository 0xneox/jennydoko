const STATS_KEY = '@jenny_game_stats';

export interface LevelStats {
  bestMoves: number;
  bestTime: number; // in seconds
  completions: number;
  hintsUsed: number;
  stars?: number;
}

export interface StarResult {
  stars: number;
  label: string;
  subtext: string;
}

/**
 * Paw-fect rating. Every wrong move and every hint costs half a star, with a
 * half-star floor so a cleared garden is never zero. Zen mode is the
 * no-pressure mode: it always awards three stars and only hints are counted.
 * `heartsLeft` is kept for backwards compatibility; `mistakes` is the source
 * of truth when supplied (forgiven mistakes refill hearts, so hearts alone
 * under-count).
 */
export function calculatePawfectStars(
  heartsLeft: number = 3,
  hintsUsed: number = 0,
  mistakes?: number,
  zen: boolean = false
): StarResult {
  const wrongMoves = mistakes ?? Math.max(0, 3 - heartsLeft);
  const penalty = (zen ? 0 : wrongMoves) * 0.5 + Math.floor(hintsUsed) * 0.5;
  const stars = Math.max(0.5, 3 - penalty);

  if (hintsUsed > 0) {
    return {
      stars,
      label: 'Garden Cleared Together!',
      subtext: 'A little help, a lot of learning — all puppies are safe!',
    };
  }
  if (stars >= 3) {
    return {
      stars,
      label: 'Paw-fect Master! 🐾',
      subtext: 'Flawless deduction with gentle paws!',
    };
  }
  if (stars >= 2) {
    return {
      stars,
      label: 'Wonderful Sitter! 🐶',
      subtext: 'Great focus and loving care!',
    };
  }
  return {
    stars,
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

// Web localStorage can throw (private mode, quota exceeded). Once a web op
// fails we permanently fall back to in-memory stats for the session so reads
// stay consistent with earlier writes instead of silently losing them.
let webStorageBroken = false;

const webGetStats = (): string | null => {
  if (webStorageBroken) return null; // serve from memoryStats
  try {
    return localStorage.getItem(STATS_KEY);
  } catch {
    webStorageBroken = true;
    return null;
  }
};

const webSetStats = (stats: GameStats): void => {
  if (webStorageBroken) {
    memoryStats = stats;
    return;
  }
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    webStorageBroken = true;
    memoryStats = stats;
  }
};

// JSON.parse only checks syntax — validate shape before trusting the payload.
// Invalid levelStats entries are dropped individually so partially-corrupt
// data degrades gracefully instead of crashing downstream math.
const isFiniteNumber = (v: unknown): v is number =>
  typeof v === 'number' && Number.isFinite(v);

const parseGameStats = (raw: string | null): GameStats | null => {
  if (raw == null) return null;
  const parsed: unknown = JSON.parse(raw);
  if (typeof parsed !== 'object' || parsed === null) return null;
  const s = parsed as Record<string, unknown>;
  if (!isFiniteNumber(s.totalPuzzlesSolved) || !isFiniteNumber(s.totalPlayTime)) {
    console.warn('Discarding corrupt game stats payload');
    return null;
  }
  const levelStats: Record<number, LevelStats> = {};
  if (typeof s.levelStats === 'object' && s.levelStats !== null) {
    for (const [key, val] of Object.entries(s.levelStats as Record<string, unknown>)) {
      const level = Number(key);
      const v = val as Record<string, unknown> | null;
      if (
        Number.isInteger(level) &&
        v !== null &&
        typeof v === 'object' &&
        isFiniteNumber(v.bestMoves) &&
        isFiniteNumber(v.bestTime) &&
        isFiniteNumber(v.completions) &&
        isFiniteNumber(v.hintsUsed)
      ) {
        levelStats[level] = {
          bestMoves: v.bestMoves,
          bestTime: v.bestTime,
          completions: v.completions,
          hintsUsed: v.hintsUsed,
          ...(isFiniteNumber(v.stars) ? { stars: v.stars } : {}),
        };
      }
    }
  }
  return {
    totalPuzzlesSolved: s.totalPuzzlesSolved,
    totalPlayTime: s.totalPlayTime,
    levelStats,
  };
};

type AsyncStorageLike = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

let asyncStorage: AsyncStorageLike | null = null;

// Probe AsyncStorage once; every read/write awaits the probe so an early
// load (HomeScreen stats on first paint) can't race ahead of it.
const checkAsyncStorage = async (): Promise<void> => {
  if (isWeb) {
    asyncStorageAvailable = false;
    return;
  }
  try {
    const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
    const AsyncStorage = (AsyncStorageModule.default || AsyncStorageModule) as AsyncStorageLike;
    await AsyncStorage.setItem('__test__', 'test');
    await AsyncStorage.removeItem('__test__');
    asyncStorage = AsyncStorage;
    asyncStorageAvailable = true;
  } catch (error) {
    console.log('AsyncStorage not available, using in-memory stats');
    asyncStorageAvailable = false;
  }
};

export const statsStorageReady: Promise<void> = checkAsyncStorage();

export const loadStats = async (): Promise<GameStats> => {
  try {
    await statsStorageReady;
    let jsonValue: string | null;
    if (isWeb) {
      jsonValue = webGetStats();
    } else if (asyncStorageAvailable && asyncStorage) {
      jsonValue = await asyncStorage.getItem(STATS_KEY);
    } else {
      return memoryStats;
    }
    return parseGameStats(jsonValue) ?? memoryStats;
  } catch (error) {
    console.error('Error loading stats:', error);
    return memoryStats;
  }
};

export const saveStats = async (stats: GameStats): Promise<void> => {
  try {
    await statsStorageReady;
    if (isWeb) {
      webSetStats(stats);
    } else if (asyncStorageAvailable && asyncStorage) {
      await asyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } else {
      memoryStats = stats;
    }
  } catch (error) {
    console.error('Error saving stats:', error);
  }
};

export interface CompletionContext {
  mistakes?: number;
  zen?: boolean;
}

export const recordLevelCompletion = async (
  level: number,
  moves: number,
  time: number,
  heartsLeft: number = 3,
  hintsUsed: number = 0,
  context: CompletionContext = {}
): Promise<StarResult> => {
  const stats = await loadStats();
  const starResult = calculatePawfectStars(heartsLeft, hintsUsed, context.mistakes, context.zen);
  
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
  levelStats.stars = Math.max(levelStats.stars ?? 0, starResult.stars);

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
