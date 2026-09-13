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
    setStorySeen: jest.fn(async (seen: boolean) => {
      memoryStore['@jenny_story_seen'] = seen ? 'true' : 'false';
    }),
    getStorySeen: jest.fn(async (): Promise<boolean> => {
      return memoryStore['@jenny_story_seen'] === 'true';
    }),
    setChapterStorySeen: jest.fn(async (chapter: number) => {
      const existing = JSON.parse(memoryStore['@jenny_chapter_stories_seen'] || '[]');
      if (!existing.includes(chapter)) {
        existing.push(chapter);
        memoryStore['@jenny_chapter_stories_seen'] = JSON.stringify(existing);
      }
    }),
    getChapterStoriesSeen: jest.fn(async (): Promise<number[]> => {
      return JSON.parse(memoryStore['@jenny_chapter_stories_seen'] || '[]');
    }),
    hasChapterStoryBeenSeen: jest.fn(async (chapter: number): Promise<boolean> => {
      const seen = JSON.parse(memoryStore['@jenny_chapter_stories_seen'] || '[]');
      return seen.includes(chapter);
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
    loadClaimedAdoptions: jest.fn(async () => []),
    saveClaimedAdoptions: jest.fn(async () => {}),
    // Pass through the real PUPPY_MILESTONES
    PuppyMilestone: { name: 'PuppyMilestone' },
    PUPPY_MILESTONES: jest.requireActual('../src/utils/storage').PUPPY_MILESTONES,
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

import {
  setChapterStorySeen,
  getChapterStoriesSeen,
  hasChapterStoryBeenSeen,
} from '../src/utils/storage';
import {
  CHAPTER_STORIES,
  getChapterStory,
  CHAPTERS_WITH_STORIES,
} from '../src/data/chapterStories';
import { getChapterForLevel } from '../src/data/chapterData';
import { PUPPY_MILESTONES } from '../src/utils/storage';

const resetStore = () => {
  (jest.requireMock('../src/utils/storage') as any).__resetMockStore();
};

describe('Chapter Story Data', () => {
  it('has stories for all 6 mechanic debut chapters', () => {
    expect(CHAPTER_STORIES.length).toBe(6);
  });

  it('chapter 11 story is about grumpy cats', () => {
    const story = getChapterStory(11);
    expect(story).not.toBeNull();
    expect(story!.title).toContain('Grumpy Cats');
    expect(story!.pages.length).toBe(3);
  });

  it('chapter 16 story is about linked beds', () => {
    const story = getChapterStory(16);
    expect(story).not.toBeNull();
    expect(story!.title).toContain('Linked Beds');
  });

  it('chapter 21 story is about cats + linked combo', () => {
    const story = getChapterStory(21);
    expect(story).not.toBeNull();
    expect(story!.title).toContain('Cats + Linked');
  });

  it('chapter 31 story is about twin puppies', () => {
    const story = getChapterStory(31);
    expect(story).not.toBeNull();
    expect(story!.title).toContain('Twin Puppies');
  });

  it('chapter 41 story is about twins + cats', () => {
    const story = getChapterStory(41);
    expect(story).not.toBeNull();
    expect(story!.title).toContain('Twins + Cats');
  });

  it('chapter 46 story is about grand championship', () => {
    const story = getChapterStory(46);
    expect(story).not.toBeNull();
    expect(story!.title).toContain('Grand Championship');
  });

  it('returns null for chapters without stories', () => {
    expect(getChapterStory(1)).toBeNull();
    expect(getChapterStory(5)).toBeNull();
    expect(getChapterStory(15)).toBeNull();
    expect(getChapterStory(50)).toBeNull();
  });

  it('CHAPTERS_WITH_STORIES matches the 6 debut chapters', () => {
    expect(CHAPTERS_WITH_STORIES.size).toBe(6);
    expect(CHAPTERS_WITH_STORIES.has(11)).toBe(true);
    expect(CHAPTERS_WITH_STORIES.has(16)).toBe(true);
    expect(CHAPTERS_WITH_STORIES.has(21)).toBe(true);
    expect(CHAPTERS_WITH_STORIES.has(31)).toBe(true);
    expect(CHAPTERS_WITH_STORIES.has(41)).toBe(true);
    expect(CHAPTERS_WITH_STORIES.has(46)).toBe(true);
  });

  it('each story page has required fields', () => {
    for (const story of CHAPTER_STORIES) {
      for (const page of story.pages) {
        expect(page.chapter).toBeTruthy();
        expect(page.headline).toBeTruthy();
        expect(page.dialogue).toBeTruthy();
        expect(page.highlightColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(page.emoji).toBeTruthy();
      }
    }
  });
});

describe('Chapter Story Storage', () => {
  beforeEach(() => resetStore());

  it('starts with no seen chapter stories', async () => {
    expect(await getChapterStoriesSeen()).toEqual([]);
  });

  it('marks a chapter story as seen', async () => {
    await setChapterStorySeen(11);
    expect(await hasChapterStoryBeenSeen(11)).toBe(true);
  });

  it('does not duplicate entries', async () => {
    await setChapterStorySeen(11);
    await setChapterStorySeen(11);
    const seen = await getChapterStoriesSeen();
    expect(seen.filter(c => c === 11).length).toBe(1);
  });

  it('tracks multiple chapters independently', async () => {
    await setChapterStorySeen(11);
    await setChapterStorySeen(31);
    expect(await hasChapterStoryBeenSeen(11)).toBe(true);
    expect(await hasChapterStoryBeenSeen(31)).toBe(true);
    expect(await hasChapterStoryBeenSeen(16)).toBe(false);
  });
});

describe('Chapter-to-Level Mapping for Stories', () => {
  it('level 201 maps to chapter 11 (cats debut)', () => {
    expect(getChapterForLevel(201).id).toBe(11);
  });

  it('level 301 maps to chapter 16 (linked debut)', () => {
    expect(getChapterForLevel(301).id).toBe(16);
  });

  it('level 401 maps to chapter 21 (combo debut)', () => {
    expect(getChapterForLevel(401).id).toBe(21);
  });

  it('level 601 maps to chapter 31 (twin debut)', () => {
    expect(getChapterForLevel(601).id).toBe(31);
  });

  it('level 801 maps to chapter 41 (twins + cats)', () => {
    expect(getChapterForLevel(801).id).toBe(41);
  });

  it('level 901 maps to chapter 46 (grand championship)', () => {
    expect(getChapterForLevel(901).id).toBe(46);
  });
});

describe('Milestone Celebrations', () => {
  it('has milestones at levels 200, 400, 600, 800, 1000', () => {
    const levels = PUPPY_MILESTONES.map(m => m.level);
    expect(levels).toContain(200);
    expect(levels).toContain(400);
    expect(levels).toContain(600);
    expect(levels).toContain(800);
    expect(levels).toContain(1000);
  });

  it('milestone at level 200 has powerUnlocked for cats', () => {
    const m = PUPPY_MILESTONES.find(m => m.level === 200);
    expect(m).toBeDefined();
    expect(m!.powerUnlocked).toContain('Cat');
  });

  it('milestone at level 400 has powerUnlocked for linked beds', () => {
    const m = PUPPY_MILESTONES.find(m => m.level === 400);
    expect(m).toBeDefined();
    expect(m!.powerUnlocked).toContain('Linked');
  });

  it('milestone at level 600 has powerUnlocked for combo', () => {
    const m = PUPPY_MILESTONES.find(m => m.level === 600);
    expect(m).toBeDefined();
    expect(m!.powerUnlocked).toContain('Combo');
  });

  it('milestone at level 800 has powerUnlocked for twin puppies', () => {
    const m = PUPPY_MILESTONES.find(m => m.level === 800);
    expect(m).toBeDefined();
    expect(m!.powerUnlocked).toContain('Twin');
  });

  it('milestone at level 1000 has powerUnlocked for grand championship', () => {
    const m = PUPPY_MILESTONES.find(m => m.level === 1000);
    expect(m).toBeDefined();
    expect(m!.powerUnlocked).toContain('Grand');
  });

  it('early milestones (20, 100) do not have powerUnlocked', () => {
    const m20 = PUPPY_MILESTONES.find(m => m.level === 20);
    const m100 = PUPPY_MILESTONES.find(m => m.level === 100);
    expect(m20!.powerUnlocked).toBeUndefined();
    expect(m100!.powerUnlocked).toBeUndefined();
  });

  it('all milestones have required fields', () => {
    for (const m of PUPPY_MILESTONES) {
      expect(m.chapter).toBeGreaterThan(0);
      expect(m.level).toBeGreaterThan(0);
      expect(m.breedName).toBeTruthy();
      expect(m.badgeTitle).toBeTruthy();
      expect(m.icon).toBeTruthy();
      expect(m.quote).toBeTruthy();
      expect(m.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});
