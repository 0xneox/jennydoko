const STORAGE_KEY = '@jenny_game_progress';
const TUTORIAL_KEY = '@jenny_tutorial_seen';

export interface GameProgress {
  unlockedLevels: number;
  currentLevel: number;
}

const isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
let asyncStorageAvailable: boolean = false;
let memoryStorage: Record<string, string> = {};

// Check if AsyncStorage is available
const checkAsyncStorage = async () => {
  if (isWeb) {
    asyncStorageAvailable = false;
    return;
  }
  try {
    const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
    const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
    await AsyncStorage.setItem('__test__', 'test');
    await AsyncStorage.removeItem('__test__');
    asyncStorageAvailable = true;
  } catch (error) {
    console.log('AsyncStorage not available, using in-memory storage');
    asyncStorageAvailable = false;
  }
};

// Initialize storage check
checkAsyncStorage();

export const saveProgress = async (progress: GameProgress): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(progress);
    if (isWeb) {
      localStorage.setItem(STORAGE_KEY, jsonValue);
    } else if (asyncStorageAvailable) {
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } else {
      memoryStorage[STORAGE_KEY] = jsonValue;
    }
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const loadProgress = async (): Promise<GameProgress | null> => {
  try {
    let jsonValue: string | null;
    if (isWeb) {
      jsonValue = localStorage.getItem(STORAGE_KEY);
    } else if (asyncStorageAvailable) {
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    } else {
      jsonValue = memoryStorage[STORAGE_KEY] || null;
    }
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading progress:', error);
    return null;
  }
};

export const clearProgress = async (): Promise<void> => {
  try {
    if (isWeb) {
      localStorage.removeItem(STORAGE_KEY);
    } else if (asyncStorageAvailable) {
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      await AsyncStorage.removeItem(STORAGE_KEY);
    } else {
      delete memoryStorage[STORAGE_KEY];
    }
  } catch (error) {
    console.error('Error clearing progress:', error);
  }
};

export const setTutorialSeen = async (seen: boolean): Promise<void> => {
  try {
    const value = seen ? 'true' : 'false';
    if (isWeb) {
      localStorage.setItem(TUTORIAL_KEY, value);
    } else if (asyncStorageAvailable) {
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      await AsyncStorage.setItem(TUTORIAL_KEY, value);
    } else {
      memoryStorage[TUTORIAL_KEY] = value;
    }
  } catch (error) {
    console.error('Error setting tutorial seen:', error);
  }
};

export const getTutorialSeen = async (): Promise<boolean> => {
  try {
    let value: string | null;
    if (isWeb) {
      value = localStorage.getItem(TUTORIAL_KEY);
    } else if (asyncStorageAvailable) {
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      value = await AsyncStorage.getItem(TUTORIAL_KEY);
    } else {
      value = memoryStorage[TUTORIAL_KEY] || null;
    }
    return value === 'true';
  } catch (error) {
    console.error('Error getting tutorial seen:', error);
    return false;
  }
};

const STORY_KEY = '@jenny_story_seen';

export const setStorySeen = async (seen: boolean): Promise<void> => {
  try {
    const value = seen ? 'true' : 'false';
    if (isWeb) {
      localStorage.setItem(STORY_KEY, value);
    } else if (asyncStorageAvailable) {
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      await AsyncStorage.setItem(STORY_KEY, value);
    } else {
      memoryStorage[STORY_KEY] = value;
    }
  } catch (error) {
    console.error('Error setting story seen:', error);
  }
};

export const getStorySeen = async (): Promise<boolean> => {
  try {
    let value: string | null;
    if (isWeb) {
      value = localStorage.getItem(STORY_KEY);
    } else if (asyncStorageAvailable) {
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      value = await AsyncStorage.getItem(STORY_KEY);
    } else {
      value = memoryStorage[STORY_KEY] || null;
    }
    return value === 'true';
  } catch (error) {
    console.error('Error getting story seen:', error);
    return false;
  }
};

const DAILY_CHALLENGE_KEY = '@jenny_daily_challenge';

export interface DailyChallengeData {
  currentStreak: number;
  bestStreak: number;
  lastPlayedDate: string;
  completedDates: string[];
  rewardsClaimed: number[];
}

export const saveDailyChallengeData = async (data: DailyChallengeData): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    if (isWeb) {
      localStorage.setItem(DAILY_CHALLENGE_KEY, jsonValue);
    } else if (asyncStorageAvailable) {
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      await AsyncStorage.setItem(DAILY_CHALLENGE_KEY, jsonValue);
    } else {
      memoryStorage[DAILY_CHALLENGE_KEY] = jsonValue;
    }
  } catch (error) {
    console.error('Error saving daily challenge data:', error);
  }
};

export const loadDailyChallengeData = async (): Promise<DailyChallengeData | null> => {
  try {
    let jsonValue: string | null;
    if (isWeb) {
      jsonValue = localStorage.getItem(DAILY_CHALLENGE_KEY);
    } else if (asyncStorageAvailable) {
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      jsonValue = await AsyncStorage.getItem(DAILY_CHALLENGE_KEY);
    } else {
      jsonValue = memoryStorage[DAILY_CHALLENGE_KEY] || null;
    }
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading daily challenge data:', error);
    return null;
  }
};

const ADOPTIONS_KEY = '@jenny_claimed_adoptions';

export interface PuppyMilestone {
  chapter: number;
  level: number;
  breedName: string;
  badgeTitle: string;
  icon: string;
  quote: string;
  color: string;
}

export const PUPPY_MILESTONES: PuppyMilestone[] = [
  {
    chapter: 1,
    level: 20,
    breedName: 'Sunny Golden Pup',
    badgeTitle: 'Certified Meadow Scout 🏅',
    icon: '🦮',
    quote: 'Always eager, warm, and ready to sniff out the sunniest spots in the meadow!',
    color: '#F39C12',
  },
  {
    chapter: 5,
    level: 100,
    breedName: 'Daisy Corgi Cadet',
    badgeTitle: 'Master Garden Sitter 🎖️',
    icon: '🐕',
    quote: 'Small paws, big heart. Can herd any wandering pup back to safety with a happy wiggle!',
    color: '#E67E22',
  },
  {
    chapter: 10,
    level: 200,
    breedName: 'Zen Shiba Explorer',
    badgeTitle: 'Woodland Guardian 🌲',
    icon: '🦊',
    quote: 'Calm, patient, and wise. Sees the entire garden in harmony before taking a single step.',
    color: '#D35400',
  },
  {
    chapter: 25,
    level: 500,
    breedName: 'Highland Terrier Scout',
    badgeTitle: 'Trail Master Pioneer ⛰️',
    icon: '🐶',
    quote: 'Fearless and spirited! Conquered 500 gardens without breaking a sweat.',
    color: '#8E44AD',
  },
  {
    chapter: 50,
    level: 1000,
    breedName: 'Grand Legend Jenny',
    badgeTitle: 'Grand Master Sitter 🏆',
    icon: '👑',
    quote: 'The ultimate garden protector. All 1000 meadows are now peaceful and safe under her watch!',
    color: '#27AE60',
  },
];

export const saveClaimedAdoptions = async (claimedLevels: number[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(claimedLevels);
    if (isWeb) {
      localStorage.setItem(ADOPTIONS_KEY, jsonValue);
    } else if (asyncStorageAvailable) {
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      await AsyncStorage.setItem(ADOPTIONS_KEY, jsonValue);
    } else {
      memoryStorage[ADOPTIONS_KEY] = jsonValue;
    }
  } catch (error) {
    console.error('Error saving claimed adoptions:', error);
  }
};

export const loadClaimedAdoptions = async (): Promise<number[]> => {
  try {
    let jsonValue: string | null;
    if (isWeb) {
      jsonValue = localStorage.getItem(ADOPTIONS_KEY);
    } else if (asyncStorageAvailable) {
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      jsonValue = await AsyncStorage.getItem(ADOPTIONS_KEY);
    } else {
      jsonValue = memoryStorage[ADOPTIONS_KEY] || null;
    }
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading claimed adoptions:', error);
    return [];
  }
};

