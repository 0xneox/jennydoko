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
  // Load progress from storage on initialization
  loadProgress().then(progress => {
    if (progress) {
      set({
        unlockedLevels: progress.unlockedLevels,
        currentLevel: progress.currentLevel,
      });
    }
  }).catch(error => {
    console.error('Failed to load progress:', error);
  });

  return {
    activeScreen: 'home' as ScreenName,
    setActiveScreen: (screen: ScreenName) => set({ activeScreen: screen }),
    isDailyChallenge: false,
    startLevel: (level: number) => {
      const clampedLevel = Math.max(1, Math.min(1000, level));
      set({ isDailyChallenge: false });
      get().initializeLevel(clampedLevel);
      set({ activeScreen: 'game' });
    },
    startDailyChallenge: () => {
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
    unlockedLevels: 1000, // All 1000 levels unlocked for seamless adventure exploration
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
      console.log('[placePuppy] called with row:', row, 'col:', col, 'engine exists:', !!engine);
      if (!engine) return false;

      const success = engine.placePuppy(row, col);
      console.log('[placePuppy] engine.placePuppy returned:', success);
      const state = engine.getState();
      console.log('[placePuppy] state after placement - board cell value:', state.board.cells[row]?.[col]?.value);
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
      console.log('[placePuppy] store updated with new board state');

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
      console.log('[undo] called, engine exists:', !!engine);
      if (!engine) return false;

      const success = engine.undo();
      console.log('[undo] engine.undo returned:', success);
      const state = engine.getState();
      console.log('[undo] state after undo - board cell values changed');
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
