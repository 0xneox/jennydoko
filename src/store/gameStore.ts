import { create } from 'zustand';
import { GameEngine } from '../game/engine';
import { getRandomizedLevel1 } from '../data/puzzles';
import { getPuzzle, getDailyPuzzle } from '../data/proceduralPuzzles';
import { GameState, Hint } from '../game/types';
import { saveProgress, loadProgress, GameProgress } from '../utils/storage';

export type ScreenName = 'home' | 'map' | 'game';

interface GameStore extends Omit<GameState, 'currentLevel'> {
  activeScreen: ScreenName;
  setActiveScreen: (screen: ScreenName) => void;
  startLevel: (level: number) => void;
  initializeLevel: (level: number) => void;
  placePuppy: (row: number, col: number) => boolean;
  markCell: (row: number, col: number) => boolean;
  undo: () => boolean;
  restart: () => void;
  currentLevel: number;
  unlockedLevels: number;
  unlockNextLevel: () => void;
  engine: GameEngine | null;
  getHint: (level?: 1 | 2 | 3 | 4) => Hint | null;
  getEliminationHints: () => { row: number; col: number; reason: string }[];
  highlightedHint: { row: number; col: number } | null;
  setHighlightedHint: (hint: { row: number; col: number } | null) => void;
  hintsUsed: number;
  mistakes: number;
  lastWrongCell: { row: number; col: number } | null;
  setLastWrongCell: (cell: { row: number; col: number } | null) => void;
  isGameOver: boolean;
  keepLooking: () => void;
  gameMode: 'zen' | 'challenge';
  setGameMode: (mode: 'zen' | 'challenge') => void;
  isDailyChallenge: boolean;
  startDailyChallenge: () => void;
}

export const useGameStore = create<GameStore>((set, get) => {
  const progressLoadedRef = { current: false };

  // Load progress from storage on initialization
  // IMPORTANT: this promise resolves asynchronously — we must NEVER overwrite user-initiated
  // navigation or level selection (causes flash if it resolves mid/first paint after)
  loadProgress().then(progress => {
    if (progress) {
      set(state => {
        // If user has already navigated or started a level, do not clobber their current state
        if (progressLoadedRef.current && state.activeScreen !== 'home') return {};
        progressLoadedRef.current = true;
        return {
          unlockedLevels: Math.max(state.unlockedLevels, progress.unlockedLevels),
          currentLevel: state.currentLevel <= 1 ? progress.currentLevel : state.currentLevel,
        };
      });
    } else {
        progressLoadedRef.current = true;
    }
  }).catch(error => {
    progressLoadedRef.current = true;
    console.error('Failed to load progress:', error);
  });

  return {
    activeScreen: 'home' as ScreenName,
    setActiveScreen: (screen: ScreenName) => {
      progressLoadedRef.current = true;
      set({ activeScreen: screen });
    },
    isDailyChallenge: false,
    startLevel: (level: number) => {
      progressLoadedRef.current = true;
      const clampedLevel = Math.max(1, Math.min(1000, level));
      set({
        isDailyChallenge: false,
        currentLevel: clampedLevel,
        activeScreen: 'game',
      });
    },
    startDailyChallenge: () => {
      progressLoadedRef.current = true;
      const puzzleData = getDailyPuzzle();
      const engine = new GameEngine(puzzleData);
      const state = engine.getState();
      set({
        board: state.board,
        hearts: state.hearts,
        moves: state.moves,
        history: state.history,
        isComplete: state.isComplete,
        currentLevel: puzzleData.level,
        engine,
        hintsUsed: 0,
        mistakes: 0,
        lastWrongCell: null,
        isGameOver: false,
        highlightedHint: null,
        isDailyChallenge: true,
        activeScreen: 'game',
      });
    },
    board: { gridSize: 4, cells: [], regions: [] },
    hearts: 3,
    moves: 0,
    history: [],
    isComplete: false,
    currentLevel: 1,
    unlockedLevels: 1,
    engine: null as GameEngine | null,
    highlightedHint: null,
    hintsUsed: 0,
    mistakes: 0,
    lastWrongCell: null as { row: number; col: number } | null,
    isGameOver: false,
    gameMode: 'zen' as 'zen' | 'challenge',
    setGameMode: (mode: 'zen' | 'challenge') => set({ gameMode: mode }),

    initializeLevel: (level: number) => {
      const puzzleData = level === 1 ? getRandomizedLevel1() : getPuzzle(level);
      const engine = new GameEngine(puzzleData);
      const state = engine.getState();
      set({
        board: state.board,
        hearts: state.hearts,
        moves: state.moves,
        history: state.history,
        isComplete: state.isComplete,
        currentLevel: level,
        engine,
        hintsUsed: 0,
        mistakes: 0,
        lastWrongCell: null,
        isGameOver: false,
        highlightedHint: null,
      });
      saveProgress({ unlockedLevels: get().unlockedLevels, currentLevel: level });
    },

    placePuppy: (row: number, col: number) => {
      const { engine, mistakes, gameMode } = get();
      if (!engine) return false;

      const success = engine.placePuppy(row, col);
      const state = engine.getState();
      const newMistakes = success ? mistakes : mistakes + 1;

      // In Zen Mode, player has unlimited chances (hearts stay at 3, no sudden death)
      const isGameOver = gameMode === 'challenge' ? state.hearts <= 0 : false;
      const currentHearts = gameMode === 'zen' ? 3 : state.hearts;

      set({
        board: state.board,
        hearts: currentHearts,
        moves: state.moves,
        history: state.history,
        isComplete: state.isComplete,
        mistakes: newMistakes,
        lastWrongCell: success ? null : { row, col },
        isGameOver,
      });

      if (state.isComplete) {
        get().unlockNextLevel();
      }

      return success;
    },

    markCell: (row: number, col: number) => {
      const { engine } = get();
      if (!engine) return false;

      const success = engine.markCell(row, col);
      const state = engine.getState();
      set({
        board: state.board,
        moves: state.moves,
        history: state.history,
      });

      return success;
    },

    undo: () => {
      const { engine } = get();
      if (!engine) return false;

      const success = engine.undo();
      const state = engine.getState();
      set({
        board: state.board,
        moves: state.moves,
        history: state.history,
      });

      return success;
    },

    restart: () => {
      const { currentLevel } = get();
      if (currentLevel === 1) {
        get().initializeLevel(1);
        return;
      }
      const { engine } = get();
      if (!engine) return;

      engine.restart();
      const state = engine.getState();
      set({
        board: state.board,
        hearts: state.hearts,
        moves: state.moves,
        history: state.history,
        isComplete: state.isComplete,
        isGameOver: false,
        lastWrongCell: null,
        highlightedHint: null,
      });
    },

    keepLooking: () => {
      const { engine } = get();
      if (engine) {
        engine.addHeart(1);
        const state = engine.getState();
        set({
          hearts: state.hearts,
          isGameOver: false,
        });
      } else {
        set({
          hearts: 1,
          isGameOver: false,
        });
      }
    },

    unlockNextLevel: () => {
      const { currentLevel, unlockedLevels } = get();
      if (currentLevel >= unlockedLevels && currentLevel < 1000) {
        const newUnlockedLevels = currentLevel + 1;
        set({ unlockedLevels: newUnlockedLevels });
        saveProgress({ unlockedLevels: newUnlockedLevels, currentLevel });
      }
    },

    getHint: (level: 1 | 2 | 3 | 4 = 1) => {
      const { engine, hintsUsed } = get();
      if (!engine) return null;
      set({ hintsUsed: hintsUsed + 1 });
      return engine.getHint(level);
    },

    getEliminationHints: () => {
      const { engine } = get();
      if (!engine) return [];
      return engine.getEliminationHints();
    },

    setHighlightedHint: (hint: { row: number; col: number } | null) => {
      set({ highlightedHint: hint });
    },

    setLastWrongCell: (cell: { row: number; col: number } | null) => {
      set({ lastWrongCell: cell });
    },
  };
});
