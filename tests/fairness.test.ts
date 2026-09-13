jest.mock('../src/utils/storage', () => ({
  loadProgress: jest.fn(async () => null),
  saveProgress: jest.fn(async () => {}),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(async () => null),
    setItem: jest.fn(async () => {}),
    removeItem: jest.fn(async () => {}),
  },
}));
jest.mock('../src/data/proceduralPuzzles', () => ({
  getPuzzle: () => require('../src/data/puzzles').level1,
  getDailyPuzzle: () => require('../src/data/puzzles').level1,
}));

import { GameEngine } from '../src/game/engine';
import { PuzzleSolver } from '../src/game/solver';
import { level1 } from '../src/data/puzzles';
import { useGameStore } from '../src/store/gameStore';
import { calculatePawfectStars, recordLevelCompletion, saveStats } from '../src/utils/statistics';

const store = () => useGameStore.getState();

beforeEach(() => {
  store().startLevel(2);
  store().setGameMode('normal');
});

describe('Oops protection', () => {
  it('forgives three normal mistakes, then loses hearts', () => {
    store().placePuppy(0, 0);
    for (let i = 0; i < 3; i++) {
      expect(store().placePuppy(0, 1)).toBe(false);
      expect(store().hearts).toBe(3);
      expect(store().engine!.getState().hearts).toBe(3);
      expect(store().lastMistakeForgiven).toBe(true);
    }
    store().placePuppy(0, 1);
    expect(store().hearts).toBe(2);
    expect(store().mistakes).toBe(4);
    expect(store().lastMistakeForgiven).toBe(false);
  });

  it.each(['zen', 'challenge'] as const)('keeps %s rules', mode => {
    store().setGameMode(mode);
    store().placePuppy(0, 0);
    for (let i = 0; i < 3; i++) store().placePuppy(0, 1);
    expect(store().hearts).toBe(mode === 'zen' ? 3 : 0);
    expect(store().isGameOver).toBe(mode === 'challenge');
    expect(store().engine!.getState().hearts).toBe(store().hearts);
  });

  it('does not count taps after game over or outside the board', () => {
    store().setGameMode('challenge');
    store().placePuppy(0, 0);
    for (let i = 0; i < 3; i++) store().placePuppy(0, 1);
    expect(store().placePuppy(2, 3)).toBe(false);
    expect(store().markCell(2, 3)).toBe(false);
    expect(store().requestHint()).toBe(false);
    expect(store().mistakes).toBe(3);
    store().restart();
    store().placePuppy(-1, 0);
    expect(store().mistakes).toBe(0);
  });

  it('undo does not refund mistake allowance or hearts', () => {
    store().setGameMode('challenge');
    store().placePuppy(0, 0);
    store().placePuppy(0, 1);
    store().undo();
    expect(store().mistakes).toBe(1);
    expect(store().hearts).toBe(2);
  });

  it('changing mode restarts the same puzzle without erasing hint costs', () => {
    store().requestHint();
    store().markCell(0, 0);
    store().setGameMode('challenge');
    expect(store().moves).toBe(0);
    expect(store().mistakes).toBe(0);
    expect(store().hintsUsed).toBe(1);
  });
});

describe('Live hints', () => {
  it('orders easy deductions first without changing the board', () => {
    const engine = new GameEngine(level1);
    const board = engine.getState().board;
    const before = JSON.stringify(board);
    const hints = new PuzzleSolver(board).findOrderedDeductions();
    expect(hints.length).toBeGreaterThan(0);
    expect(hints.map(h => h.difficultyValue)).toEqual(
      hints.map(h => h.difficultyValue).sort((a, b) => a - b)
    );
    expect(JSON.stringify(board)).toBe(before);
  });

  it('explains, reveals, and applies one cell, charging once', () => {
    expect(store().requestHint()).toBe(true);
    expect(store().activeHint!.tier).toBe(1);
    expect(store().hintsUsed).toBe(1);
    expect(store().moves).toBe(0);
    const hint = store().activeHint!;
    store().requestHint();
    expect(store().activeHint!.tier).toBe(2);
    expect(store().moves).toBe(0);
    store().requestHint();
    expect(store().activeHint).toBeNull();
    expect(store().hintsUsed).toBe(1);
    expect(store().board.cells[hint.cell.row][hint.cell.col].value).toBe(hint.value);
    expect(store().moves).toBe(1);
    store().undo();
    expect(store().board.cells[hint.cell.row][hint.cell.col].value).toBe('empty');
    expect(store().hintsUsed).toBe(1);
  });

  it('clears stale hints on a board change', () => {
    store().requestHint();
    store().markCell(0, 0);
    expect(store().activeHint).toBeNull();
  });

  it('offers recovery instead of an unsafe hint on a contradictory board', () => {
    for (let c = 0; c < store().board.gridSize; c++) store().markCell(0, c);
    expect(store().requestHint()).toBe(false);
    expect(store().activeHint).toBeNull();
    expect(store().hintMessage).toMatch(/undo/i);
    expect(store().hintsUsed).toBe(0);
  });

  it('can finish a puzzle using only tiered hints', () => {
    for (let i = 0; i < 150 && !store().isComplete; i++) {
      expect(store().requestHint()).toBe(true);
    }
    expect(store().isComplete).toBe(true);
    expect(store().mistakes).toBe(0);
  });
});

describe('Restart and stars', () => {
  it('repeated engine restarts keep the initial snapshot pristine', () => {
    const engine = new GameEngine(level1);
    engine.restart();
    engine.markCell(0, 0);
    engine.restart();
    expect(engine.getState().board.cells[0][0].value).toBe('empty');
  });

  it('restarts the same daily puzzle, resets mistakes, and retains hint costs', () => {
    store().startDailyChallenge();
    const regions = store().board.regions;
    store().requestHint();
    store().placePuppy(0, 0);
    store().placePuppy(0, 1);
    store().restart();
    expect(store().board.regions).toBe(regions);
    expect(store().isDailyChallenge).toBe(true);
    expect(store().mistakes).toBe(0);
    expect(store().hintsUsed).toBe(1);
    expect(store().activeHint).toBeNull();
  });

  it('subtracts half a star per hint with a half-star completion floor', () => {
    expect(calculatePawfectStars(3, 0).stars).toBe(3);
    expect(calculatePawfectStars(3, 1).stars).toBe(2.5);
    expect(calculatePawfectStars(2, 1).stars).toBe(2);
    expect(calculatePawfectStars(1, 20).stars).toBe(0.5);
  });

  it('counts forgiven mistakes against stars in normal/challenge, never in zen', () => {
    // Hearts are full (forgiven) but three wrong moves were made
    expect(calculatePawfectStars(3, 0, 3).stars).toBe(1.5);
    expect(calculatePawfectStars(3, 1, 2).stars).toBe(1.5);
    expect(calculatePawfectStars(3, 0, 3, true).stars).toBe(3);
    expect(calculatePawfectStars(3, 1, 3, true).stars).toBe(2.5);
    expect(calculatePawfectStars(3, 0, 0).label).toMatch(/Paw-fect/);
  });

  it('records fractional ratings and hints on completion', async () => {
    await saveStats({ totalPuzzlesSolved: 0, totalPlayTime: 0, levelStats: {} });
    const result = await recordLevelCompletion(999, 10, 20, 3, 1);
    expect(result.stars).toBe(2.5);
    const zen = await recordLevelCompletion(998, 10, 20, 3, 0, { mistakes: 5, zen: true });
    expect(zen.stars).toBe(3);
  });
});

describe('Progression integrity', () => {
  it('starts with only level 1 unlocked', () => {
    // Store was created with progress mocked to null; the dev unlock flag must be off.
    expect(useGameStore.getInitialState().unlockedLevels).toBe(1);
  });

  it('completing a daily challenge never advances campaign unlocks', () => {
    useGameStore.setState({ unlockedLevels: 1 });
    store().startDailyChallenge();
    for (const cell of level1.solution) store().placePuppy(cell.row, cell.col);
    expect(store().isComplete).toBe(true);
    expect(store().unlockedLevels).toBe(1);
  });

  it('completing a campaign level unlocks exactly the next one', () => {
    store().startLevel(2);
    useGameStore.setState({ unlockedLevels: 2 });
    for (const cell of level1.solution) store().placePuppy(cell.row, cell.col);
    expect(store().isComplete).toBe(true);
    expect(store().unlockedLevels).toBe(3);
  });

  it('placing a puppy on a Paw Mark overwrites it without touching other moves', () => {
    const [a, b] = level1.solution;
    store().markCell(b.row, b.col);
    store().markCell(a.row, a.col);
    expect(store().placePuppy(a.row, a.col)).toBe(true);
    expect(store().board.cells[a.row][a.col].value).toBe('puppy');
    expect(store().board.cells[b.row][b.col].value).toBe('marked');
  });
});
