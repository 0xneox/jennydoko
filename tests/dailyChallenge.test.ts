import {
  getTodayDateString,
  getYesterdayDateString,
  getTodayDateSeed,
  getTimeUntilNextPuzzle,
  getDailyChallengeState,
  recordDailyCompletion,
  STREAK_REWARDS,
} from '../src/utils/dailyChallenge';
import { saveDailyChallengeData } from '../src/utils/storage';
import { useGameStore } from '../src/store/gameStore';

describe('Step 3: Daily Challenge System & Streak Mechanics', () => {
  beforeEach(async () => {
    // Reset daily challenge storage state
    await saveDailyChallengeData({
      currentStreak: 0,
      bestStreak: 0,
      lastPlayedDate: '',
      completedDates: [],
      rewardsClaimed: [],
    });
  });

  describe('Date Helpers & Seed Generation', () => {
    it('generates standard YYYY-MM-DD date strings', () => {
      const fixedDate = new Date(2026, 8, 9); // Sep 9, 2026
      expect(getTodayDateString(fixedDate)).toBe('2026-09-09');
    });

    it('calculates yesterday correctly', () => {
      const fixedDate = new Date(2026, 8, 9);
      expect(getYesterdayDateString(fixedDate)).toBe('2026-09-08');

      // Month rollover
      const firstOfMonth = new Date(2026, 8, 1); // Sep 1, 2026
      expect(getYesterdayDateString(firstOfMonth)).toBe('2026-08-31');
    });

    it('generates integer seed in YYYYMMDD format', () => {
      const fixedDate = new Date(2026, 8, 9);
      expect(getTodayDateSeed(fixedDate)).toBe(20260909);
    });

    it('calculates countdown timer until midnight properly', () => {
      const now = new Date(2026, 8, 9, 14, 30, 0); // 14:30
      const countdown = getTimeUntilNextPuzzle(now);

      expect(countdown.hours).toBe(9);
      expect(countdown.minutes).toBe(30);
      expect(countdown.seconds).toBe(0);
      expect(countdown.formatted).toBe('09h 30m 00s');
    });
  });

  describe('Streak Progression & Milestone Rewards', () => {
    it('initiates streak at 1 on first daily completion', async () => {
      const result = await recordDailyCompletion({ moves: 12, time: 45, hintsUsed: 0 });

      expect(result.streak).toBe(1);
      expect(result.isNewRecord).toBe(true);
      expect(result.alreadyCompleted).toBe(false);

      const state = await getDailyChallengeState();
      expect(state.currentStreak).toBe(1);
      expect(state.isCompletedToday).toBe(true);
      expect(state.completedDates).toContain(getTodayDateString());
    });

    it('prevents double-counting when replaying the daily puzzle on the same day', async () => {
      await recordDailyCompletion();
      const secondPlay = await recordDailyCompletion();

      expect(secondPlay.streak).toBe(1);
      expect(secondPlay.alreadyCompleted).toBe(true);

      const state = await getDailyChallengeState();
      expect(state.currentStreak).toBe(1);
    });

    it('increments streak when played on consecutive days', async () => {
      const yesterday = getYesterdayDateString();

      // Pre-seed storage as having played yesterday
      await saveDailyChallengeData({
        currentStreak: 1,
        bestStreak: 1,
        lastPlayedDate: yesterday,
        completedDates: [yesterday],
        rewardsClaimed: [],
      });

      const result = await recordDailyCompletion();
      expect(result.streak).toBe(2);
      expect(result.isNewRecord).toBe(true);

      const state = await getDailyChallengeState();
      expect(state.currentStreak).toBe(2);
      expect(state.bestStreak).toBe(2);
    });

    it('awards milestone reward upon reaching Day 3 streak', async () => {
      const yesterday = getYesterdayDateString();

      // Pre-seed storage at day 2 streak
      await saveDailyChallengeData({
        currentStreak: 2,
        bestStreak: 2,
        lastPlayedDate: yesterday,
        completedDates: ['2026-09-07', yesterday],
        rewardsClaimed: [],
      });

      const result = await recordDailyCompletion();
      expect(result.streak).toBe(3);
      expect(result.reward).toBe('Sparkle Hint (+1 Hint) 💡');

      const state = await getDailyChallengeState();
      expect(state.rewardsClaimed).toContain(3);
    });

    it('resets streak to 1 if player misses a day', async () => {
      const threeDaysAgo = '2026-09-06';

      await saveDailyChallengeData({
        currentStreak: 5,
        bestStreak: 5,
        lastPlayedDate: threeDaysAgo,
        completedDates: [threeDaysAgo],
        rewardsClaimed: [3],
      });

      const result = await recordDailyCompletion();
      expect(result.streak).toBe(1);
      expect(result.isNewRecord).toBe(false);

      const state = await getDailyChallengeState();
      expect(state.currentStreak).toBe(1);
      expect(state.bestStreak).toBe(5); // Best streak preserved
    });
  });

  describe('GameStore Daily Challenge Mode', () => {
    it('sets isDailyChallenge to true when startDailyChallenge is triggered', () => {
      const store = useGameStore.getState();
      store.startDailyChallenge();

      const state = useGameStore.getState();
      expect(state.isDailyChallenge).toBe(true);
      expect(state.activeScreen).toBe('game');
      expect(state.board.gridSize).toBeGreaterThanOrEqual(4);
    });

    it('resets isDailyChallenge to false when startLevel is triggered', () => {
      const store = useGameStore.getState();
      store.startDailyChallenge();
      expect(useGameStore.getState().isDailyChallenge).toBe(true);

      store.startLevel(5);
      expect(useGameStore.getState().isDailyChallenge).toBe(false);
      expect(useGameStore.getState().currentLevel).toBe(5);
    });
  });
});
