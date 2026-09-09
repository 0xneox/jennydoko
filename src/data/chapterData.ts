export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  gridSizes: string;
  difficultyBadge: string;
  start: number;
  end: number;
  icon: string;
  accentColor: string;
  description: string;
}

const CHAPTER_THEMES = [
  // Chapters 1-10: Backyard & Garden Adventures (Levels 1-200, 4x4 & 5x5)
  { title: 'Sunny Backyard', icon: '🏡', color: '#4CAF50', diff: 'Beginner', size: '4×4 & 5×5', desc: 'Learn the puppy rules with gentle grassy puzzles in the cozy backyard.' },
  { title: 'Neighborhood Park', icon: '🌳', color: '#8BC34A', diff: 'Beginner', size: '4×4 & 5×5', desc: 'Stroll along winding walkways and shady trees with playful pups.' },
  { title: 'Clover Meadow', icon: '🍀', color: '#66BB6A', diff: 'Beginner', size: '5×5', desc: 'Open green fields where lucky four-leaf clovers bring happy naps.' },
  { title: 'Lavender Lane', icon: '🪻', color: '#AB47BC', diff: 'Beginner', size: '5×5', desc: 'Sweet aromatic flower beds where sleepy puppies love to curl up.' },
  { title: 'Daisy Meadow', icon: '🌼', color: '#FDD835', diff: 'Beginner', size: '5×5', desc: 'Bright yellow blossoms provide the sunniest spots in the meadow.' },
  { title: 'Bluebell Grove', icon: '🪻', color: '#42A5F5', diff: 'Easy', size: '5×5', desc: 'Shaded glens where gentle blue bells chime softly in the breeze.' },
  { title: 'Buttercup Hill', icon: '🌻', color: '#FFA726', diff: 'Easy', size: '5×5', desc: 'Rolling hills sprinkled with golden petals and cheerful puppy barks.' },
  { title: 'Pebble Creek', icon: '🏞️', color: '#26A69A', diff: 'Easy', size: '5×5', desc: 'A gentle babbling brook where curious puppies splash and play.' },
  { title: 'Cozy Gazebo', icon: '🛖', color: '#8D6E63', diff: 'Easy', size: '5×5', desc: 'A sheltered wooden retreat with soft cushions and garden views.' },
  { title: 'Rosewood Garden', icon: '🌹', color: '#EC407A', diff: 'Easy', size: '5×5', desc: 'Fragrant garden paths winding through vibrant rose arbors.' },

  // Chapters 11-20: Park Exploration & Woodland Trails (Levels 201-400, 6x6)
  { title: 'Maple Glade', icon: '🍁', color: '#EF5350', diff: 'Easy / Medium', size: '6×6', desc: 'Crisp autumn leaves make perfect crunchy beds for resting pups.' },
  { title: 'Birch Hollow', icon: '🌲', color: '#78909C', diff: 'Medium', size: '6×6', desc: 'Tall white birch trunks filter gentle morning sunbeams.' },
  { title: 'Willow Pond', icon: '🦆', color: '#29B6F6', diff: 'Medium', size: '6×6', desc: 'Weeping willows drape peacefully over quiet, sparkling ripples.' },
  { title: 'Pinecone Trail', icon: '🌲', color: '#5D4037', diff: 'Medium', size: '6×6', desc: 'Pine-scented trails challenge your logic with clever color regions.' },
  { title: 'Sunlit Ridge', icon: '⛰️', color: '#FF7043', diff: 'Medium', size: '6×6', desc: 'Breathtaking ridge views overlooking the sprawling green valley.' },
  { title: 'Goldenrod Way', icon: '🌾', color: '#FBC02D', diff: 'Medium', size: '6×6', desc: 'Tall golden stalks sway gently around cozy puppy hiding spots.' },
  { title: 'Fern Valley', icon: '🌿', color: '#388E3C', diff: 'Medium', size: '6×6', desc: 'Lush emerald ferns form secret garden paths for adventurous pups.' },
  { title: 'Orchard Lane', icon: '🍎', color: '#D32F2F', diff: 'Medium', size: '6×6', desc: 'Sweet fruit orchards where puppies nap under heavy apple branches.' },
  { title: 'Breeze Point', icon: '🪁', color: '#00ACC1', diff: 'Medium', size: '6×6', desc: 'A breezy hill crowned with kites and joyful tail-wags.' },
  { title: 'Mushroom Glade', icon: '🍄', color: '#E64A19', diff: 'Medium', size: '6×6', desc: 'Fanciful fairy ring mushrooms nestled in soft mossy soil.' },

  // Chapters 21-30: Open Fields & Highland Trails (Levels 401-600, 7x7)
  { title: 'Highland Heather', icon: '🪻', color: '#7E57C2', diff: 'Medium / Hard', size: '7×7', desc: 'Purple heather carpets rolling hills across vast 7×7 fields.' },
  { title: 'Whispering Brook', icon: '🌊', color: '#1E88E5', diff: 'Hard', size: '7×7', desc: 'Swift flowing streams require sharp, observant deduction skills.' },
  { title: 'Oakwood Haven', icon: '🌳', color: '#558B2F', diff: 'Hard', size: '7×7', desc: 'Centuries-old oak trees cast grand leafy canopies overhead.' },
  { title: 'Sunset Prairie', icon: '🌅', color: '#FF5722', diff: 'Hard', size: '7×7', desc: 'Warm orange horizons welcome the evening puppy slumber.' },
  { title: 'Canyon Path', icon: '🏜️', color: '#C2185B', diff: 'Hard', size: '7×7', desc: 'Red rock passes carving intricate multi-region puzzle grids.' },
  { title: 'Amber Bluff', icon: '🪨', color: '#FFA000', diff: 'Hard', size: '7×7', desc: 'Golden hour stones warming sleepy paws along the cliff edge.' },
  { title: 'Crystal Springs', icon: '💎', color: '#00BCD4', diff: 'Hard', size: '7×7', desc: 'Pure freshwater pools reflecting clear, sunny blue skies.' },
  { title: 'Wildflower Basin', icon: '💐', color: '#8E24AA', diff: 'Hard', size: '7×7', desc: 'An explosion of rainbow blooms requiring keen floral deductions.' },
  { title: 'Timber Creek', icon: '🪵', color: '#4E342E', diff: 'Hard', size: '7×7', desc: 'Weathered cedar logs and bridges testing your logic mastery.' },
  { title: 'Emerald Vista', icon: '🌄', color: '#2E7D32', diff: 'Hard', size: '7×7', desc: 'Panoramic peaks where only the most patient puppy sitters thrive.' },

  // Chapters 31-40: Deep Woods & Alpine Ridges (Levels 601-800, 8x8)
  { title: 'Alpine Meadow', icon: '🏔️', color: '#3949AB', diff: 'Hard / Expert', size: '8×8', desc: 'High elevation plateaus where 8×8 gardens demand deep strategy.' },
  { title: 'Cedar Pass', icon: '🌲', color: '#00695C', diff: 'Expert', size: '8×8', desc: 'Ancient evergreen pathways requiring elimination techniques.' },
  { title: 'Silver Mist Trail', icon: '🌫️', color: '#546E7A', diff: 'Expert', size: '8×8', desc: 'Morning mist creates mysterious trails between flower beds.' },
  { title: 'Starlight Glade', icon: '✨', color: '#512DA8', diff: 'Expert', size: '8×8', desc: 'Twinkling fireflies light up complex 8-puppy logic formations.' },
  { title: 'Echo Canyon', icon: '📢', color: '#AD1457', diff: 'Expert', size: '8×8', desc: 'Dramatic canyon walls echoing with triumphant puppy woofs.' },
  { title: 'Granite Falls', icon: '💦', color: '#0277BD', diff: 'Expert', size: '8×8', desc: 'Roaring waterfalls framing majestic, challenging puzzle grids.' },
  { title: 'Thistlewood', icon: '🌾', color: '#6A1B9A', diff: 'Expert', size: '8×8', desc: 'Intricate thorny borders that reward cautious, careful placement.' },
  { title: 'Golden Summit', icon: '👑', color: '#F57F17', diff: 'Expert', size: '8×8', desc: 'Golden sunrise views across expansive mountain peaks.' },
  { title: 'Autumn Gorge', icon: '🍂', color: '#D84315', diff: 'Expert', size: '8×8', desc: 'Deep canyons ablaze with crimson foliage and clever traps.' },
  { title: 'Thunder Ridge', icon: '⚡', color: '#4527A0', diff: 'Expert', size: '8×8', desc: 'Electrifying puzzles testing every rule you have mastered.' },

  // Chapters 41-50: Grand Championship Arenas (Levels 801-1000, 9x9 & 10x10)
  { title: 'Grand Valley', icon: '🏞️', color: '#1565C0', diff: 'Expert', size: '9×9', desc: 'Expansive 9×9 valley gardens where championship sitters compete.' },
  { title: 'Sapphire Basin', icon: '💠', color: '#00838F', diff: 'Expert', size: '9×9', desc: 'Brilliant deep-blue lakes demanding complex cross-line deductions.' },
  { title: 'Royal Orchard', icon: '👑', color: '#6A1B9A', diff: 'Master', size: '9×9', desc: 'Palace gardens pruned to perfection for master puzzle champions.' },
  { title: 'Emerald Haven', icon: '🍀', color: '#1B5E20', diff: 'Master', size: '9×9', desc: 'Secret sanctuary holding the most brilliant 9-puppy arrangements.' },
  { title: 'Sunset Coliseum', icon: '🏟️', color: '#E65100', diff: 'Master', size: '9×9', desc: 'Grand amphitheater glowing warmly under the setting sun.' },
  { title: 'Olympus Park', icon: '🏛️', color: '#283593', diff: 'Master', size: '10×10', desc: 'Epic 10×10 master arenas — 10 sunny spots, 10 happy pups!' },
  { title: 'Diamond Glade', icon: '💎', color: '#006064', diff: 'Master', size: '10×10', desc: 'Flawless logic and patience reveal the crown jewel of gardens.' },
  { title: 'Celestial Garden', icon: '🌌', color: '#311B92', diff: 'Master / Legend', size: '10×10', desc: 'Cosmic night skies mirroring celestial puppy constellations.' },
  { title: 'Grandmaster Meadow', icon: '🎖️', color: '#B71C1C', diff: 'Legend', size: '10×10', desc: 'The penultimate gauntlet for world-class puzzle solvers.' },
  { title: 'Jenny’s Sanctuary', icon: '🐾', color: '#C2185B', diff: 'Legend', size: '10×10', desc: 'The legendary 1,000th level! All puppies safely in their sunny spot!' },
];

export const CHAPTERS: Chapter[] = CHAPTER_THEMES.map((theme, idx) => {
  const id = idx + 1;
  const start = (id - 1) * 20 + 1;
  const end = id * 20;

  return {
    id,
    title: theme.title,
    subtitle: `Levels ${start}–${end}`,
    gridSizes: theme.size,
    difficultyBadge: theme.diff,
    start,
    end,
    icon: theme.icon,
    accentColor: theme.color,
    description: theme.desc,
  };
});

export const getChapterForLevel = (level: number): Chapter => {
  const ch = CHAPTERS.find(c => level >= c.start && level <= c.end);
  return ch || CHAPTERS[0];
};

export const getChapterIndexForLevel = (level: number): number => {
  const index = CHAPTERS.findIndex(c => level >= c.start && level <= c.end);
  return index >= 0 ? index : 0;
};
