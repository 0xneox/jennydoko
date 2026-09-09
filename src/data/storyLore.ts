export interface StoryPageData {
  chapter: string;
  headline: string;
  dialogue: string;
  highlightColor: string;
}

export const STORY_PAGES: StoryPageData[] = [
  {
    chapter: 'Part 1 • Greenbark Meadow',
    headline: 'Jenny is a puppy sitter at Greenbark Meadow.',
    dialogue: 'Welcome! I’m Jenny. I spend my sunniest days caring for the sweetest pups here in Greenbark Meadow.',
    highlightColor: '#27AE60',
  },
  {
    chapter: 'Part 2 • The Flower Beds',
    headline: 'The park is vast, and the playful pups love hiding in their favorite colored flower beds!',
    dialogue: 'Look at them peek! Each pup snuggles into their own color patch—bluebells, purple lavender, golden daisies, and warm poppies.',
    highlightColor: '#8E44AD',
  },
  {
    chapter: 'Part 3 • The Quest',
    headline: 'Can you help Jenny ensure every puppy gets their own sunny spot?',
    dialogue: 'They love their personal space and need room to stretch! Can you help me guide each pup to their perfect sunny spot across 100 gardens?',
    highlightColor: '#E67E22',
  },
];

export interface TutorialRuleData {
  step: 1 | 2 | 3;
  title: string;
  explanation: string;
}

export const TUTORIAL_RULES: TutorialRuleData[] = [
  {
    step: 1,
    title: 'Every color patch has exactly ONE puppy!',
    explanation: 'Notice this small single-cell patch? A puppy must go right here! Tap the spotlight to place our first pup.',
  },
  {
    step: 2,
    title: 'Puppies need personal space! They cannot touch—not even diagonally!',
    explanation: 'See those ✕ marks around the puppy? No other dog can touch this pup, even diagonally. They love their naps undisturbed!',
  },
  {
    step: 3,
    title: 'Each row and column only has room for ONE puppy!',
    explanation: "Every row, column, and color patch will have exactly 1 happy puppy. You're ready to solve Level 1!",
  },
];

export const JENNY_CHEERS = [
  'Splendid! Every puppy found their sunny spot in the meadow! 🐾',
  'Pawsome work! The puppies are all wagging their tails happily! ✨',
  'Look how peaceful the garden is now! Every pup has their spot. 🌸',
  "You're a natural puppy sitter! Ready for the next sunny garden? 🐕",
  "Wonderful logic! The meadow pups couldn't be happier! ☀️",
];
