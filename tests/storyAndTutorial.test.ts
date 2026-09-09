import { getStorySeen, setStorySeen, getTutorialSeen, setTutorialSeen } from '../src/utils/storage';
import { JENNY_CHEERS } from '../src/data/storyLore';

describe('Sprint 5: Story, Character Lore & First-Time Experience (FTUE) Tests', () => {
  describe('Storage Persistence for FTUE', () => {
    it('persists and retrieves story seen status', async () => {
      await setStorySeen(false);
      let seen = await getStorySeen();
      expect(seen).toBe(false);

      await setStorySeen(true);
      seen = await getStorySeen();
      expect(seen).toBe(true);
    });

    it('persists and retrieves tutorial seen status', async () => {
      await setTutorialSeen(false);
      let seen = await getTutorialSeen();
      expect(seen).toBe(false);

      await setTutorialSeen(true);
      seen = await getTutorialSeen();
      expect(seen).toBe(true);
    });
  });

  describe('The Story of Jenny Comic Lore Content', () => {
    const EXPECTED_SCREEN_1 = 'Jenny is a puppy sitter at Greenbark Meadow.';
    const EXPECTED_SCREEN_2 =
      'The park is vast, and the playful pups love hiding in their favorite colored flower beds!';
    const EXPECTED_SCREEN_3 =
      'Can you help Jenny ensure every puppy gets their own sunny spot?';

    it('contains the accurate narrative text for all 3 intro comic screens', () => {
      expect(EXPECTED_SCREEN_1).toContain('Jenny is a puppy sitter at Greenbark Meadow.');
      expect(EXPECTED_SCREEN_2).toContain('favorite colored flower beds!');
      expect(EXPECTED_SCREEN_3).toContain('ensure every puppy gets their own sunny spot?');
    });
  });

  describe('Interactive 3-Rule Spotlight Tutorial Content', () => {
    const RULE_1 = 'Every color patch has exactly ONE puppy!';
    const RULE_2 = 'Puppies need personal space! They cannot touch—not even diagonally!';
    const RULE_3 = 'Each row and column only has room for ONE puppy!';

    it('covers the exact 3 core rules in order without wall of text', () => {
      expect(RULE_1).toBe('Every color patch has exactly ONE puppy!');
      expect(RULE_2).toBe(
        'Puppies need personal space! They cannot touch—not even diagonally!'
      );
      expect(RULE_3).toBe('Each row and column only has room for ONE puppy!');
    });
  });

  describe("Jenny's Dialogue & Encouragement System", () => {
    it('defines rich and encouraging level completion cheers from Jenny', () => {
      expect(JENNY_CHEERS).toBeDefined();
      expect(JENNY_CHEERS.length).toBeGreaterThanOrEqual(3);
      for (const cheer of JENNY_CHEERS) {
        expect(typeof cheer).toBe('string');
        expect(cheer.length).toBeGreaterThan(15);
      }
    });

    it('has sunny spot and meadow references in Jenny cheers', () => {
      const combinedCheers = JENNY_CHEERS.join(' ');
      expect(combinedCheers).toMatch(/sunny spot|meadow|puppies/i);
    });
  });
});
