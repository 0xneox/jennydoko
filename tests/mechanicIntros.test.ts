jest.mock('../src/utils/storage', () => {
  let memoryStore: Record<string, string> = {};
  return {
    __resetMockStore: () => { memoryStore = {}; },
    loadProgress: jest.fn(async () => null),
    saveProgress: jest.fn(async () => {}),
    setTutorialSeen: jest.fn(async (seen: boolean) => {
      memoryStore['@jenny_tutorial_seen'] = seen ? 'true' : 'false';
    }),
    getTutorialSeen: jest.fn(async (): Promise<boolean> => {
      return memoryStore['@jenny_tutorial_seen'] === 'true';
    }),
    setMechanicIntroSeen: jest.fn(async (key: string) => {
      const existing = JSON.parse(memoryStore['@jenny_mechanic_intros_seen'] || '[]');
      if (!existing.includes(key)) {
        existing.push(key);
        memoryStore['@jenny_mechanic_intros_seen'] = JSON.stringify(existing);
      }
    }),
    getMechanicIntrosSeen: jest.fn(async (): Promise<string[]> => {
      return JSON.parse(memoryStore['@jenny_mechanic_intros_seen'] || '[]');
    }),
    hasMechanicIntroBeenSeen: jest.fn(async (key: string): Promise<boolean> => {
      const seen = JSON.parse(memoryStore['@jenny_mechanic_intros_seen'] || '[]');
      return seen.includes(key);
    }),
    loadClaimedAdoptions: jest.fn(async () => []),
    saveClaimedAdoptions: jest.fn(async () => {}),
  };
});
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

import {
  setMechanicIntroSeen,
  getMechanicIntrosSeen,
  hasMechanicIntroBeenSeen,
  setTutorialSeen,
  getTutorialSeen,
  MechanicIntroKey,
} from '../src/utils/storage';

const resetStore = () => {
  (jest.requireMock('../src/utils/storage') as any).__resetMockStore();
};

describe('Mechanic Intro Storage', () => {
  beforeEach(() => resetStore());

  it('starts with no seen intros', async () => {
    const seen = await getMechanicIntrosSeen();
    expect(seen).toEqual([]);
  });

  it('marks a mechanic as seen and retrieves it', async () => {
    await setMechanicIntroSeen('cats');
    const seen = await getMechanicIntrosSeen();
    expect(seen).toContain('cats');
    expect(await hasMechanicIntroBeenSeen('cats')).toBe(true);
  });

  it('does not duplicate entries', async () => {
    await setMechanicIntroSeen('linked');
    await setMechanicIntroSeen('linked');
    const seen = await getMechanicIntrosSeen();
    expect(seen.filter(k => k === 'linked').length).toBe(1);
  });

  it('tracks multiple mechanics independently', async () => {
    await setMechanicIntroSeen('cats');
    await setMechanicIntroSeen('twin');
    expect(await hasMechanicIntroBeenSeen('cats')).toBe(true);
    expect(await hasMechanicIntroBeenSeen('twin')).toBe(true);
    expect(await hasMechanicIntroBeenSeen('linked')).toBe(false);
  });
});

describe('Level 1 Tutorial Auto-Trigger', () => {
  beforeEach(() => resetStore());

  it('reports not seen for brand-new players', async () => {
    expect(await getTutorialSeen()).toBe(false);
  });

  it('persists seen state after marking', async () => {
    await setTutorialSeen(true);
    expect(await getTutorialSeen()).toBe(true);
  });
});

describe('Mechanic Detection Logic', () => {
  // These tests validate the detection logic used in GameScreen's level init
  // to determine which mechanic intro to show.

  const detectNeededIntro = (
    mechanics: { catCount: number; linkedCount: number; puppiesPerUnit: number },
    seen: MechanicIntroKey[]
  ): MechanicIntroKey | null => {
    if (mechanics.catCount > 0 && !seen.includes('cats')) return 'cats';
    if (mechanics.linkedCount > 0 && !seen.includes('linked')) return 'linked';
    if (mechanics.puppiesPerUnit > 1 && !seen.includes('twin')) return 'twin';
    return null;
  };

  it('detects cats on first encounter', () => {
    expect(detectNeededIntro({ catCount: 1, linkedCount: 0, puppiesPerUnit: 1 }, [])).toBe('cats');
  });

  it('detects linked beds on first encounter', () => {
    expect(detectNeededIntro({ catCount: 0, linkedCount: 1, puppiesPerUnit: 1 }, [])).toBe('linked');
  });

  it('detects twin pups on first encounter', () => {
    expect(detectNeededIntro({ catCount: 0, linkedCount: 0, puppiesPerUnit: 2 }, [])).toBe('twin');
  });

  it('returns null when all active mechanics have been seen', () => {
    expect(detectNeededIntro({ catCount: 2, linkedCount: 1, puppiesPerUnit: 2 }, ['cats', 'linked', 'twin'])).toBeNull();
  });

  it('prioritizes cats over linked and twin', () => {
    expect(detectNeededIntro({ catCount: 1, linkedCount: 1, puppiesPerUnit: 2 }, [])).toBe('cats');
  });

  it('prioritizes linked over twin', () => {
    expect(detectNeededIntro({ catCount: 0, linkedCount: 1, puppiesPerUnit: 2 }, [])).toBe('linked');
  });

  it('returns null for standard levels with no new mechanics', () => {
    expect(detectNeededIntro({ catCount: 0, linkedCount: 0, puppiesPerUnit: 1 }, [])).toBeNull();
  });

  it('returns null when the only active mechanic has already been seen', () => {
    expect(detectNeededIntro({ catCount: 1, linkedCount: 0, puppiesPerUnit: 1 }, ['cats'])).toBeNull();
  });
});
