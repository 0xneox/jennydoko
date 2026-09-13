import { create } from 'zustand';
import { GameEngine } from '../game/engine';
import { getRandomizedLevel1 } from '../data/puzzles';
import { getPuzzle, getDailyPuzzle } from '../data/proceduralPuzzles';
import { Deduction, PuzzleData } from '../game/types';
import { PuzzleSolver } from '../game/solver';

export type GameMode = 'normal' | 'zen' | 'challenge';

export interface ActiveHint {
  deduction: Deduction;
  cell: { row: number; col: number };
  value: 'puppy' | 'marked';
  tier: 1 | 2;
  explanation: string;
}

const explainHint = (deduction: Deduction, quota: number): string => {
  const { row, col } = deduction.affectedCell;
  switch (deduction.technique) {
    case 'row_elimination':
      return `Row ${row + 1} is full — X out the rest with Paw Mark!`;
    case 'column_elimination':
      return `Column ${col + 1} is full — X out the rest with Paw Mark!`;
    case 'region_elimination':
      return `This patch has all ${quota === 1 ? 'its puppy' : `${quota} puppies`} — X out its other spots!`;
    case 'neighbour_elimination':
      return 'Puppies need space! X out spots touching a puppy or cat, even diagonally.';
    case 'single_cell_colour':
      return 'This patch has just enough open spots left — each one needs a puppy!';
    case 'colour_unique_row':
      return `One patch fits only in row ${row + 1}. Its puppies fill that row — X out the other colours!`;
    case 'colour_unique_column':
      return `One patch fits only in column ${col + 1}. Its puppies fill that column — X out the other colours!`;
    case 'deduction_chain':
      return deduction.eliminatedCells.length === 0
        ? 'Leaving a spot out would leave a row, column or patch without enough room. That spot needs a puppy!'
        : 'A puppy in one spot would leave a row, column or patch without enough room. We can X that spot out!';
    case 'search_placement':
      return 'Twin gardens take a little experimenting! Here’s a cosy spot that fits everything so far.';
  }
};

const RECOVERY_MESSAGE =
  'Let’s check our earlier moves! Try Undo or remove a Paw Mark to make room, then ask me again.';

export interface ActiveMechanics {
  puppiesPerUnit: number;
  catCount: number;
  linkedCount: number;
}

const DEFAULT_MECHANICS: ActiveMechanics = {
  puppiesPerUnit: 1,
  catCount: 0,
  linkedCount: 0,
};

const mechanicsFromPuzzle = (puzzle: PuzzleData): ActiveMechanics => ({
  puppiesPerUnit: puzzle.puppiesPerUnit ?? 1,
  catCount: puzzle.cats?.length ?? 0,
  linkedCount: puzzle.regions.filter(r => r.linked).length,
});
import { GameState } from '../game/types';
import { saveProgress, loadProgress, GameProgress } from '../utils/storage';

// Unlock every level for local testing only. Must stay false for release.
const DEV_UNLOCK_ALL_LEVELS = false;

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
  mistakes: number;
  lastWrongCell: { row: number; col: number } | null;
  setLastWrongCell: (cell: { row: number; col: number } | null) => void;
  isGameOver: boolean;
  keepLooking: () => void;
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  lastMistakeForgiven: boolean;
  hintsUsed: number;
  activeHint: ActiveHint | null;
  hintMessage: string | null;
  requestHint: () => boolean;
  isDailyChallenge: boolean;
  startDailyChallenge: () => void;
  /** Chapter-twist mechanics active on the current board. */
  mechanics: ActiveMechanics;
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
      set({ isDailyChallenge: false });
      get().initializeLevel(clampedLevel);
      set({ activeScreen: 'game' });
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
        mistakes: 0,
        lastMistakeForgiven: false,
        hintsUsed: 0,
        activeHint: null,
        hintMessage: null,
        lastWrongCell: null,
        isGameOver: false,
        isDailyChallenge: true,
        activeScreen: 'game',
        mechanics: mechanicsFromPuzzle(puzzleData),
      });
    },
    board: { gridSize: 4, cells: [], regions: [] },
    hearts: 3,
    moves: 0,
    history: [],
    isComplete: false,
    currentLevel: 1,
    unlockedLevels: DEV_UNLOCK_ALL_LEVELS ? 1000 : 1,
    engine: null as GameEngine | null,
    mistakes: 0,
    lastWrongCell: null as { row: number; col: number } | null,
    isGameOver: false,
    mechanics: DEFAULT_MECHANICS,
    lastMistakeForgiven: false,
    hintsUsed: 0,
    activeHint: null,
    hintMessage: null,
    gameMode: 'normal' as GameMode,
    setGameMode: (mode: GameMode) => {
      const { engine, gameMode } = get();
      if (mode === gameMode) return;
      if (!engine) {
        set({ gameMode: mode });
        return;
      }
      // Zen hides the heart drain but the engine still tracks it — refill on
      // mode swap so switching to Challenge mid-level can't instant game-over.
      get().restart();
      set({ gameMode: mode });
    },

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
        mistakes: 0,
        lastMistakeForgiven: false,
        hintsUsed: 0,
        activeHint: null,
        hintMessage: null,
        lastWrongCell: null,
        isGameOver: false,
        mechanics: mechanicsFromPuzzle(puzzleData),
      });
      if (!DEV_UNLOCK_ALL_LEVELS) {
        saveProgress({ unlockedLevels: get().unlockedLevels, currentLevel: level });
      }
    },

    placePuppy: (row: number, col: number) => {
      const { engine, mistakes, gameMode, isGameOver: blocked, isComplete, board } = get();
      if (!engine || blocked || isComplete || !board.cells[row]?.[col] || board.cells[row][col].value === 'cat') return false;

      const success = engine.placePuppy(row, col);
      const forgiven = !success && (gameMode === 'zen' || (gameMode === 'normal' && mistakes < 3));
      if (forgiven) engine.addHeart(1);
      const state = engine.getState();
      const newMistakes = success ? mistakes : mistakes + 1;

      // In Zen Mode, player has unlimited chances (hearts stay at 3, no sudden death)
      const isGameOver = gameMode !== 'zen' && state.hearts <= 0;
      const currentHearts = state.hearts;

      set({
        board: state.board,
        hearts: currentHearts,
        moves: state.moves,
        history: state.history,
        isComplete: state.isComplete,
        mistakes: newMistakes,
        lastMistakeForgiven: forgiven,
        activeHint: null,
        hintMessage: null,
        lastWrongCell: success ? null : { row, col },
        isGameOver,
      });

      if (state.isComplete) {
        get().unlockNextLevel();
      }

      return success;
    },

    markCell: (row: number, col: number) => {
      const { engine, isComplete, isGameOver } = get();
      if (!engine || isComplete || isGameOver) return false;

      const success = engine.markCell(row, col);
      if (!success) return false;
      const state = engine.getState();
      set({
        board: state.board,
        moves: state.moves,
        history: state.history,
        activeHint: null,
        hintMessage: null,
      });

      return success;
    },

    undo: () => {
      const { engine, isComplete, isGameOver } = get();
      if (!engine || isComplete || isGameOver) return false;

      const success = engine.undo();
      if (!success) return false;
      const state = engine.getState();
      set({
        board: state.board,
        moves: state.moves,
        history: state.history,
        isComplete: state.isComplete,
        lastWrongCell: null,
        activeHint: null,
        hintMessage: null,
      });

      return success;
    },

    requestHint: () => {
      const { engine, isComplete, isGameOver, mechanics, activeHint, hintsUsed } = get();
      if (!engine || isComplete || isGameOver) return false;
      const board = engine.getState().board;
      if (activeHint && board.cells[activeHint.cell.row][activeHint.cell.col].value === 'empty') {
        if (activeHint.tier === 1) {
          set({ activeHint: { ...activeHint, tier: 2 } });
          return true;
        }
        const { row, col } = activeHint.cell;
        return activeHint.value === 'puppy' ? get().placePuppy(row, col) : get().markCell(row, col);
      }
      const solver = new PuzzleSolver(board, { puppiesPerUnit: mechanics.puppiesPerUnit });
      let deduction: Deduction | undefined = solver.findOrderedDeductions()[0];
      if (!deduction) {
        // Deduction stalled. If the board can still be completed, hand over a
        // pup from a valid completion instead of wrongly blaming earlier moves.
        const completion = solver.findAnySolution();
        const spot = completion?.[0];
        if (!spot) {
          set({ activeHint: null, hintMessage: RECOVERY_MESSAGE });
          return false;
        }
        deduction = {
          technique: 'search_placement',
          affectedCell: spot,
          explanation: '',
          eliminatedCells: [],
          difficultyValue: 99,
        };
      }
      const placement = deduction.technique === 'single_cell_colour' ||
        deduction.technique === 'search_placement' ||
        (deduction.technique === 'deduction_chain' && deduction.eliminatedCells.length === 0);
      const cell = placement ? deduction.affectedCell : deduction.eliminatedCells[0];
      set({
        activeHint: {
          deduction,
          cell,
          value: placement ? 'puppy' : 'marked',
          tier: 1,
          explanation: explainHint(deduction, mechanics.puppiesPerUnit),
        },
        hintMessage: null,
        hintsUsed: hintsUsed + 1,
      });
      return true;
    },

    restart: () => {
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
        mistakes: 0,
        lastMistakeForgiven: false,
        activeHint: null,
        hintMessage: null,
        lastWrongCell: null,
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
      const { currentLevel, unlockedLevels, isDailyChallenge } = get();
      // Daily gardens are seeded from levels 200-900; clearing one must never
      // leap the campaign forward.
      if (isDailyChallenge) return;
      if (currentLevel >= unlockedLevels && currentLevel < 1000) {
        const newUnlockedLevels = currentLevel + 1;
        set({ unlockedLevels: newUnlockedLevels });
        saveProgress({ unlockedLevels: newUnlockedLevels, currentLevel });
      }
    },

    setLastWrongCell: (cell: { row: number; col: number } | null) => {
      set({ lastWrongCell: cell });
    },
  };
});
