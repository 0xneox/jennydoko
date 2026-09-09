import {
  saveDailyChallengeData,
  loadDailyChallengeData,
  DailyChallengeData,
} from './storage';

export interface DailyChallengeState {
  currentStreak: number;
  bestStreak: number;
  isCompletedToday: boolean;
  lastPlayedDate: string;
  completedDates: string[];
  rewardsClaimed: number[];
  nextReward: { days: number; title: string } | null;
}

export const STREAK_REWARDS = [
  { days: 3, title: 'Sparkle Hint (+1 Hint) 💡' },
  { days: 7, title: 'Meadow Scout Badge 🏅' },
  { days: 14, title: 'Puppy Whisperer Badge 🐾' },
  { days: 30, title: 'Master Sitter Golden Trophy 🏆' },
];

export function getTodayDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateString(d: Date = new Date()): string {
  const yesterday = new Date(d);
  yesterday.setDate(yesterday.getDate() - 1);
  return getTodayDateString(yesterday);
}

export function getTodayDateSeed(d: Date = new Date()): number {
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

export function getFormattedTodayDisplay(d: Date = new Date()): string {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', weekday: 'short' };
  return d.toLocaleDateString(undefined, options);
}

export function getTimeUntilNextPuzzle(now: Date = new Date()): {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
} {
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const diffMs = Math.max(0, midnight.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formatted = `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;

  return { hours, minutes, seconds, formatted };
}

export async function getDailyChallengeState(): Promise<DailyChallengeState> {
  const data = await loadDailyChallengeData();
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  if (!data) {
    return {
      currentStreak: 0,
      bestStreak: 0,
      isCompletedToday: false,
      lastPlayedDate: '',
      completedDates: [],
      rewardsClaimed: [],
      nextReward: STREAK_REWARDS[0],
    };
  }

  const isCompletedToday = data.completedDates.includes(today);

  // If player hasn't completed today and missed yesterday, active streak displays 0 until solved
  let effectiveStreak = data.currentStreak;
  if (!isCompletedToday && data.lastPlayedDate !== yesterday) {
    effectiveStreak = 0;
  }

  const nextReward =
    STREAK_REWARDS.find(r => r.days > effectiveStreak && !data.rewardsClaimed.includes(r.days)) ||
    null;

  return {
    currentStreak: effectiveStreak,
    bestStreak: data.bestStreak,
    isCompletedToday,
    lastPlayedDate: data.lastPlayedDate,
    completedDates: data.completedDates,
    rewardsClaimed: data.rewardsClaimed || [],
    nextReward,
  };
}

export async function recordDailyCompletion(stats?: {
  moves?: number;
  time?: number;
  hintsUsed?: number;
}): Promise<{
  streak: number;
  isNewRecord: boolean;
  reward: string | null;
  alreadyCompleted: boolean;
}> {
  const existing = (await loadDailyChallengeData()) || {
    currentStreak: 0,
    bestStreak: 0,
    lastPlayedDate: '',
    completedDates: [],
    rewardsClaimed: [],
  };

  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  // Already completed today
  if (existing.completedDates.includes(today)) {
    return {
      streak: existing.currentStreak,
      isNewRecord: false,
      reward: null,
      alreadyCompleted: true,
    };
  }

  // Compute new streak
  let newStreak = 1;
  if (existing.lastPlayedDate === yesterday) {
    newStreak = existing.currentStreak + 1;
  }

  const isNewRecord = newStreak > existing.bestStreak;
  const bestStreak = Math.max(existing.bestStreak, newStreak);

  // Check rewards
  let rewardTitle: string | null = null;
  const rewardsClaimed = [...(existing.rewardsClaimed || [])];
  const milestone = STREAK_REWARDS.find(r => r.days === newStreak);
  if (milestone && !rewardsClaimed.includes(milestone.days)) {
    rewardsClaimed.push(milestone.days);
    rewardTitle = milestone.title;
  }

  const updated: DailyChallengeData = {
    currentStreak: newStreak,
    bestStreak,
    lastPlayedDate: today,
    completedDates: [...existing.completedDates, today],
    rewardsClaimed,
  };

  await saveDailyChallengeData(updated);

  return {
    streak: newStreak,
    isNewRecord,
    reward: rewardTitle,
    alreadyCompleted: false,
  };
}

export function generateDailyShareText(params: {
  streak: number;
  moves: number;
  timeSeconds: number;
  heartsLeft: number;
  hintsUsed?: number;
  gridSize: number;
  dateDisplay?: string;
}): string {
  const { streak, moves, timeSeconds, heartsLeft, gridSize, dateDisplay } = params;
  const dateStr = dateDisplay || getFormattedTodayDisplay();
  const minutes = Math.floor(timeSeconds / 60);
  const seconds = (timeSeconds % 60).toString().padStart(2, '0');
  const timeFormatted = `${minutes}:${seconds}`;

  const heartIcons = Array(Math.max(0, Math.min(3, heartsLeft))).fill('❤️').join(' ');
  const starStatus = heartsLeft === 3 ? '🐾 Paw-fect Clear!' : '🐶 Garden Cleared!';

  return [
    `Jenny's Garden 🐕 ${dateStr}`,
    `Daily Walk: ${gridSize}×${gridSize} Meadow`,
    `🔥 Streak: ${streak} ${streak === 1 ? 'Day' : 'Days'}`,
    `${heartIcons} • 🎯 ${moves} Moves • ⏱️ ${timeFormatted}`,
    `${starStatus}`,
    `\nCan you find all the puppies? 🐾`,
  ].join('\n');
}
