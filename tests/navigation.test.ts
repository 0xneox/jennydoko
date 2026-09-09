import { useGameStore } from '../src/store/gameStore';
import { CHAPTERS, getChapterForLevel, getChapterIndexForLevel } from '../src/data/chapterData';

describe('Sprint 2: Navigation Architecture & World Journey Map', () => {
  beforeEach(() => {
    // Reset store state
    useGameStore.setState({
      activeScreen: 'home',
      currentLevel: 1,
      unlockedLevels: 100,
    });
  });

  describe('Navigation State Management', () => {
    it('defaults activeScreen to home', () => {
      const state = useGameStore.getState();
      expect(state.activeScreen).toBe('home');
    });

    it('navigates from home to map', () => {
      const { setActiveScreen } = useGameStore.getState();
      setActiveScreen('map');
      expect(useGameStore.getState().activeScreen).toBe('map');
    });

    it('navigates from map back to home', () => {
      const { setActiveScreen } = useGameStore.getState();
      setActiveScreen('map');
      expect(useGameStore.getState().activeScreen).toBe('map');

      setActiveScreen('home');
      expect(useGameStore.getState().activeScreen).toBe('home');
    });

    it('navigates to game screen when startLevel is called', () => {
      const { startLevel } = useGameStore.getState();
      startLevel(5);

      const state = useGameStore.getState();
      expect(state.activeScreen).toBe('game');
      expect(state.currentLevel).toBe(5);
      expect(state.engine).not.toBeNull();
      expect(state.board.cells.length).toBeGreaterThan(0);
    });

    it('handles startLevel for boundary levels (1 and 100)', () => {
      const { startLevel } = useGameStore.getState();

      startLevel(1);
      expect(useGameStore.getState().currentLevel).toBe(1);
      expect(useGameStore.getState().activeScreen).toBe('game');

      startLevel(100);
      expect(useGameStore.getState().currentLevel).toBe(100);
      expect(useGameStore.getState().activeScreen).toBe('game');
    });

    it('clamps invalid startLevel numbers safely', () => {
      const { startLevel } = useGameStore.getState();

      startLevel(0);
      expect(useGameStore.getState().currentLevel).toBe(1);
      expect(useGameStore.getState().activeScreen).toBe('game');

      startLevel(1500);
      expect(useGameStore.getState().currentLevel).toBe(1000);
      expect(useGameStore.getState().activeScreen).toBe('game');
    });

    it('allows navigating from game back to map', () => {
      const { startLevel, setActiveScreen } = useGameStore.getState();
      startLevel(10);
      expect(useGameStore.getState().activeScreen).toBe('game');

      setActiveScreen('map');
      expect(useGameStore.getState().activeScreen).toBe('map');
    });
  });

  describe('Thematic Chapters Configuration', () => {
    it('defines 50 chapters spanning all 1000 levels sequentially', () => {
      expect(CHAPTERS).toHaveLength(50);

      expect(CHAPTERS[0].id).toBe(1);
      expect(CHAPTERS[0].title).toMatch(/Sunny Backyard/);
      expect(CHAPTERS[0].start).toBe(1);
      expect(CHAPTERS[0].end).toBe(20);

      expect(CHAPTERS[1].id).toBe(2);
      expect(CHAPTERS[1].title).toBe('Neighborhood Park');
      expect(CHAPTERS[1].start).toBe(21);
      expect(CHAPTERS[1].end).toBe(40);

      expect(CHAPTERS[2].id).toBe(3);
      expect(CHAPTERS[2].title).toBe('Clover Meadow');
      expect(CHAPTERS[2].start).toBe(41);
      expect(CHAPTERS[2].end).toBe(60);

      expect(CHAPTERS[49].id).toBe(50);
      expect(CHAPTERS[49].title).toBe('Jenny’s Sanctuary');
      expect(CHAPTERS[49].start).toBe(981);
      expect(CHAPTERS[49].end).toBe(1000);
    });

    it('correctly resolves getChapterForLevel for each range', () => {
      expect(getChapterForLevel(1).id).toBe(1);
      expect(getChapterForLevel(20).id).toBe(1);
      expect(getChapterForLevel(21).id).toBe(2);
      expect(getChapterForLevel(40).id).toBe(2);
      expect(getChapterForLevel(41).id).toBe(3);
      expect(getChapterForLevel(60).id).toBe(3);
      expect(getChapterForLevel(500).id).toBe(25);
      expect(getChapterForLevel(1000).id).toBe(50);
    });

    it('correctly resolves getChapterIndexForLevel', () => {
      expect(getChapterIndexForLevel(1)).toBe(0);
      expect(getChapterIndexForLevel(30)).toBe(1);
      expect(getChapterIndexForLevel(55)).toBe(2);
      expect(getChapterIndexForLevel(500)).toBe(24);
      expect(getChapterIndexForLevel(1000)).toBe(49);
    });
  });
});
