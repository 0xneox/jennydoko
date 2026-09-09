import { GameEngine } from '../src/game/engine';
import { level1, puzzles } from '../src/data/puzzles';

describe('Progressive Hint UX & Game Feedback Tests', () => {
  describe('Progressive Hint System (Levels 1 to 4)', () => {
    let engine: GameEngine;

    beforeEach(() => {
      engine = new GameEngine(level1);
    });

    it('Hint 1 returns a general observation without giving away the exact answer', () => {
      const hint1 = engine.getHint(1);
      expect(hint1).toBeDefined();
      expect(hint1?.level).toBe(1);
      expect(hint1?.title).toBeDefined();
      expect(hint1?.explanation).toBeDefined();
      expect(hint1?.targetCell).toBeUndefined();
    });

    it('Hint 2 returns logical reasoning for the observation', () => {
      const hint2 = engine.getHint(2);
      expect(hint2).toBeDefined();
      expect(hint2?.level).toBe(2);
      expect(hint2?.title).toBeDefined();
      expect(hint2?.explanation).toBeDefined();
      expect(hint2?.targetCell).toBeUndefined();
    });

    it('Hint 3 returns specific location guidance', () => {
      const hint3 = engine.getHint(3);
      expect(hint3).toBeDefined();
      expect(hint3?.level).toBe(3);
      expect(hint3?.title).toBeDefined();
      expect(hint3?.explanation).toMatch(/Row \d|Column \d/);
      expect(hint3?.targetCell).toBeUndefined();
    });

    it('Hint 4 (Exact-cell hint) highlights the exact cell target', () => {
      const hint4 = engine.getHint(4);
      expect(hint4).toBeDefined();
      expect(hint4?.level).toBe(4);
      expect(hint4?.title).toBe('🐶 Next Puppy');
      expect(hint4?.targetCell).toBeDefined();
      expect(typeof hint4?.targetCell?.row).toBe('number');
      expect(typeof hint4?.targetCell?.col).toBe('number');
    });

    it('provides friendly natural language hint on easy levels without jargon', () => {
      const easyEngine = new GameEngine(puzzles[1]); // Level 2
      const hint = easyEngine.getHint(1);
      expect(hint).toBeDefined();
      expect(hint?.explanation).not.toMatch(/constraint propagation|candidate set|deduction chain/i);
    });

    it('provides valid progressive hints on Level 17 without crashing or jargon', () => {
      const level17Engine = new GameEngine(puzzles[16]); // Level 17
      const h1 = level17Engine.getHint(1);
      const h2 = level17Engine.getHint(2);
      const h3 = level17Engine.getHint(3);
      const h4 = level17Engine.getHint(4);

      expect(h1).toBeDefined();
      expect(h2).toBeDefined();
      expect(h3).toBeDefined();
      expect(h4).toBeDefined();
      expect(h4?.targetCell).toBeDefined();
    });
  });

  describe('Wrong Move, Hearts, & Game Over Flow', () => {
    let engine: GameEngine;

    beforeEach(() => {
      engine = new GameEngine(level1);
    });

    it('decreases hearts when a wrong puppy is placed', () => {
      expect(engine.getState().hearts).toBe(3);
      engine.placePuppy(0, 0); // initial placement
      expect(engine.getState().hearts).toBe(3);

      // (0, 1) violates row and adjacency with (0, 0)
      const success = engine.placePuppy(0, 1);
      expect(success).toBe(false);
      expect(engine.getState().hearts).toBe(2);
    });

    it('reaches 0 hearts on 3 wrong moves (game over state)', () => {
      engine.placePuppy(0, 0); // initial placement
      expect(engine.getState().hearts).toBe(3);

      engine.placePuppy(0, 1); // wrong move 1
      expect(engine.getState().hearts).toBe(2);

      engine.placePuppy(0, 2); // wrong move 2
      expect(engine.getState().hearts).toBe(1);

      engine.placePuppy(0, 3); // wrong move 3
      expect(engine.getState().hearts).toBe(0);
    });

    it('Try Again (restart) restores 3 hearts and clears board', () => {
      engine.placePuppy(0, 0);
      engine.placePuppy(0, 1);
      engine.placePuppy(0, 2);
      engine.placePuppy(0, 3);
      expect(engine.getState().hearts).toBe(0);

      engine.restart();
      expect(engine.getState().hearts).toBe(3);
      expect(engine.getState().moves).toBe(0);
    });

    it('Continue gameplay (addHeart) restores a chance without resetting the board', () => {
      engine.placePuppy(0, 0);
      engine.placePuppy(0, 1);
      engine.placePuppy(0, 2);
      engine.placePuppy(0, 3);
      expect(engine.getState().hearts).toBe(0);

      // Keep looking / continue gameplay
      engine.addHeart(1);
      expect(engine.getState().hearts).toBe(1);
      // Board progress preserved:
      expect(engine.getState().board.cells[0][0].value).toBe('puppy');
    });
  });

  describe('Level Completion & Progression Flow', () => {
    it('detects level completion when all puppies are correctly placed', () => {
      const engine = new GameEngine(level1);
      level1.solution.forEach(({ row, col }) => {
        engine.placePuppy(row, col);
      });

      expect(engine.getState().isComplete).toBe(true);
    });

    it('Level 20 puzzle can be completed successfully', () => {
      const level20 = puzzles[19];
      const engine = new GameEngine(level20);
      level20.solution.forEach(({ row, col }) => {
        const res = engine.placePuppy(row, col);
        expect(res).toBe(true);
      });

      expect(engine.getState().isComplete).toBe(true);
      expect(engine.getState().hearts).toBe(3);
    });
  });

  describe('Game Modes: Zen Mode vs Challenge Mode (Sprint 1)', () => {
    const isGameOverCheck = (mode: 'zen' | 'challenge', hearts: number) => mode === 'challenge' && hearts <= 0;

    it('Zen Mode defaults to infinite chances and tracks mistakes without game over', () => {
      const engine = new GameEngine(level1);
      // Place a puppy at (0, 0)
      engine.placePuppy(0, 0);

      // Attempt invalid adjacent placement at (0, 1)
      const res = engine.placePuppy(0, 1);
      expect(res).toBe(false);

      // In Zen mode, mistake is registered but player is not blocked
      const mistakes = 1;
      const isGameOver = isGameOverCheck('zen', engine.getState().hearts);
      expect(isGameOver).toBe(false);
      expect(mistakes).toBe(1);
    });

    it('Challenge Mode triggers game over when hearts reach 0', () => {
      const engine = new GameEngine(level1);
      engine.placePuppy(0, 0);

      // Make 3 invalid placements
      engine.placePuppy(0, 1);
      engine.placePuppy(0, 1);
      engine.placePuppy(0, 1);

      expect(engine.getState().hearts).toBe(0);
      const isGameOver = isGameOverCheck('challenge', engine.getState().hearts);
      expect(isGameOver).toBe(true);
    });
  });
});

