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
  // Chapters 1-5: Handcrafted campaign ramp (Levels 1-100, 4x4 up to 10x10)
  { title: 'Sunny Backyard', icon: '🏡', color: '#4CAF50', diff: 'Beginner', size: '4×4–6×6', desc: 'Learn the puppy rules with gentle grassy puzzles in the cozy backyard.' },
  { title: 'Neighborhood Park', icon: '🌳', color: '#8BC34A', diff: 'Easy', size: '6×6 & 7×7', desc: 'Stroll along winding walkways and shady trees with playful pups.' },
  { title: 'Clover Meadow', icon: '🍀', color: '#66BB6A', diff: 'Medium', size: '7×7 & 8×8', desc: 'Open green fields where lucky four-leaf clovers bring happy naps.' },
  { title: 'Lavender Lane', icon: '🪻', color: '#AB47BC', diff: 'Hard', size: '8×8 & 9×9', desc: 'Sweet aromatic flower beds where sleepy puppies love to curl up.' },
  { title: 'Daisy Meadow', icon: '🌼', color: '#FDD835', diff: 'Expert', size: '9×9 & 10×10', desc: 'Bright yellow blossoms provide the sunniest spots in the meadow.' },
  // Chapters 6-10: Backyard & Garden Adventures (Levels 101-200, 5x5)
  { title: 'Bluebell Grove', icon: '🪻', color: '#42A5F5', diff: 'Easy', size: '5×5', desc: 'Shaded glens where gentle blue bells chime softly in the breeze.' },
  { title: 'Buttercup Hill', icon: '🌻', color: '#FFA726', diff: 'Easy', size: '5×5', desc: 'Rolling hills sprinkled with golden petals and cheerful puppy barks.' },
  { title: 'Pebble Creek', icon: '🏞️', color: '#26A69A', diff: 'Easy', size: '5×5', desc: 'A gentle babbling brook where curious puppies splash and play.' },
  { title: 'Cozy Gazebo', icon: '🛖', color: '#8D6E63', diff: 'Easy', size: '5×5', desc: 'A sheltered wooden retreat with soft cushions and garden views.' },
  { title: 'Rosewood Garden', icon: '🌹', color: '#EC407A', diff: 'Easy', size: '5×5', desc: 'Fragrant garden paths winding through vibrant rose arbors.' },

  // Chapters 11-15: Grumpy Cats move in (Levels 201-300, 6x6)
  { title: 'Maple Glade', icon: '🍁', color: '#EF5350', diff: 'Easy / Medium', size: '6×6', desc: 'A grumpy cat naps in the leaves! 😾 No pup may touch her — or her 8 neighbours.' },
  { title: 'Birch Hollow', icon: '🌲', color: '#78909C', diff: 'Medium', size: '6×6', desc: 'Tall white birches, and a very sleepy cat who demands personal space.' },
  { title: 'Willow Pond', icon: '🦆', color: '#29B6F6', diff: 'Medium', size: '6×6', desc: 'The pond cat hates wet paws — keep every puppy out of her splash zone.' },
  { title: 'Pinecone Trail', icon: '🌲', color: '#5D4037', diff: 'Medium', size: '6×6', desc: 'Two grumpy cats claim this trail. Pups must route around both auras.' },
  { title: 'Sunlit Ridge', icon: '⛰️', color: '#FF7043', diff: 'Medium', size: '6×6', desc: 'Twin cats bask on the ridge — the meadow just got trickier!' },

  // Chapters 16-20: Linked Beds (Levels 301-400, 6x6)
  { title: 'Goldenrod Way', icon: '🌾', color: '#FBC02D', diff: 'Medium', size: '6×6', desc: 'Magic pollen links two distant beds 🔗 — they share a single pup!' },
  { title: 'Fern Valley', icon: '🌿', color: '#388E3C', diff: 'Medium', size: '6×6', desc: 'Secret linked clearings: far-apart patches count as one colour.' },
  { title: 'Orchard Lane', icon: '🍎', color: '#D32F2F', diff: 'Medium', size: '6×6', desc: 'Linked apple beds on opposite sides of the orchard share one sleepy pup.' },
  { title: 'Breeze Point', icon: '🪁', color: '#00ACC1', diff: 'Medium', size: '6×6', desc: 'Kite strings tangle two beds together — one pup covers both.' },
  { title: 'Mushroom Glade', icon: '🍄', color: '#E64A19', diff: 'Medium', size: '6×6', desc: 'Fairy rings link distant mushroom beds — two linked pairs to untangle.' },

  // Chapters 21-30: Cats + Linked Beds combo (Levels 401-600, 7x7)
  { title: 'Highland Heather', icon: '🪻', color: '#7E57C2', diff: 'Medium / Hard', size: '7×7', desc: 'Grumpy cats doze in the heather while linked beds span the hills.' },
  { title: 'Whispering Brook', icon: '🌊', color: '#1E88E5', diff: 'Hard', size: '7×7', desc: 'Swift streams link distant banks 🔗 — and a cat guards the ford.' },
  { title: 'Oakwood Haven', icon: '🌳', color: '#558B2F', diff: 'Hard', size: '7×7', desc: 'Under grand oaks, linked clearings share pups around cat territory.' },
  { title: 'Sunset Prairie', icon: '🌅', color: '#FF5722', diff: 'Hard', size: '7×7', desc: 'Two cats claim the warmest rocks — route every pup around them.' },
  { title: 'Canyon Path', icon: '🏜️', color: '#C2185B', diff: 'Hard', size: '7×7', desc: 'Linked ledges and lounging cats carve the canyon into a puzzle.' },
  { title: 'Amber Bluff', icon: '🪨', color: '#FFA000', diff: 'Hard', size: '7×7', desc: 'Golden stones hide cat auras that split the linked beds apart.' },
  { title: 'Crystal Springs', icon: '💎', color: '#00BCD4', diff: 'Hard', size: '7×7', desc: 'Pools link across the springs while cats keep pups from the shore.' },
  { title: 'Wildflower Basin', icon: '💐', color: '#8E24AA', diff: 'Hard', size: '7×7', desc: 'A bloom-maze of cats and links demanding expert elimination.' },
  { title: 'Timber Creek', icon: '🪵', color: '#4E342E', diff: 'Hard', size: '7×7', desc: 'Log bridges link the banks; two cats nap mid-trail.' },
  { title: 'Emerald Vista', icon: '🌄', color: '#2E7D32', diff: 'Hard', size: '7×7', desc: 'The combo finale — every cat aura and linked bed at once.' },

  // Chapters 31-40: Twin Puppies debut (Levels 601-800, 8x8)
  { title: 'Alpine Meadow', icon: '🏔️', color: '#3949AB', diff: 'Hard / Expert', size: '8×8', desc: 'Twin pups arrive! 👯 Every row, column and patch now needs TWO puppies.' },
  { title: 'Cedar Pass', icon: '🌲', color: '#00695C', diff: 'Expert', size: '8×8', desc: 'Sixteen pups, eight rows — the twins still refuse to touch.' },
  { title: 'Silver Mist Trail', icon: '🌫️', color: '#546E7A', diff: 'Expert', size: '8×8', desc: 'Mist hides twin pairs — pure chain deduction through the fog.' },
  { title: 'Starlight Glade', icon: '✨', color: '#512DA8', diff: 'Expert', size: '8×8', desc: 'Twin pups sparkle in pairs across the starlit glade.' },
  { title: 'Echo Canyon', icon: '📢', color: '#AD1457', diff: 'Expert', size: '8×8', desc: 'Twin pups echo across the canyon — mirrored placements everywhere.' },
  { title: 'Granite Falls', icon: '💦', color: '#0277BD', diff: 'Expert', size: '8×8', desc: 'Waterfall mists where twin pups double every deduction.' },
  { title: 'Thistlewood', icon: '🌾', color: '#6A1B9A', diff: 'Expert', size: '8×8', desc: 'Thorny twin trails — and now a linked bed crosses the ravine.' },
  { title: 'Golden Summit', icon: '👑', color: '#F57F17', diff: 'Expert', size: '8×8', desc: 'Summit twins plus linked beds below — expert terrain.' },
  { title: 'Autumn Gorge', icon: '🍂', color: '#D84315', diff: 'Expert', size: '8×8', desc: 'Crimson gorges where twin pups and links chain together.' },
  { title: 'Thunder Ridge', icon: '⚡', color: '#4527A0', diff: 'Expert', size: '8×8', desc: 'Storms scatter twin pups across linked beds on the ridge.' },

  // Chapters 41-50: Grand Championship Arenas (Levels 801-1000, 9x9 & 10x10)
  { title: 'Grand Valley', icon: '🏞️', color: '#1565C0', diff: 'Expert', size: '9×9', desc: 'Twin pups patrol 9×9 valleys — 18 puppies per board!' },
  { title: 'Sapphire Basin', icon: '💠', color: '#00838F', diff: 'Expert', size: '9×9', desc: 'Deep-blue basins with twin pups and a grumpy guardian cat.' },
  { title: 'Royal Orchard', icon: '👑', color: '#6A1B9A', diff: 'Master', size: '9×9', desc: 'The palace cat watches over twin pups in royal linked beds.' },
  { title: 'Emerald Haven', icon: '🍀', color: '#1B5E20', diff: 'Master', size: '9×9', desc: 'Sanctuary puzzles demanding chained deductions and twin logic.' },
  { title: 'Sunset Coliseum', icon: '🏟️', color: '#E65100', diff: 'Master', size: '9×9', desc: 'Championship twin-pup arenas under the setting sun.' },
  { title: 'Olympus Park', icon: '🏛️', color: '#283593', diff: 'Master', size: '10×10', desc: 'Epic 10×10 arenas — 20 twin pups, cats, and linked beds!' },
  { title: 'Diamond Glade', icon: '💎', color: '#006064', diff: 'Master', size: '10×10', desc: 'Flawless chains reveal the crown jewel of linked gardens.' },
  { title: 'Celestial Garden', icon: '🌌', color: '#311B92', diff: 'Master / Legend', size: '10×10', desc: 'Constellation cats and linked starlight beds — cosmic twins.' },
  { title: 'Grandmaster Meadow', icon: '🎖️', color: '#B71C1C', diff: 'Legend', size: '10×10', desc: 'Every mechanic at once: twins, cats, links, and deep chains.' },
  { title: 'Jenny’s Sanctuary', icon: '🐾', color: '#C2185B', diff: 'Legend', size: '10×10', desc: 'The legendary 1,000th level! All 20 twin pups safely in their sunny spots!' },
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
  if (ch) return ch;
  // Clamp out-of-range levels to the nearest chapter — returning Chapter 1 for
  // e.g. level 1001 would mask range bugs and jump the player to the start.
  return level < CHAPTERS[0].start ? CHAPTERS[0] : CHAPTERS[CHAPTERS.length - 1];
};

export const getChapterIndexForLevel = (level: number): number => {
  const index = CHAPTERS.findIndex(c => level >= c.start && level <= c.end);
  if (index >= 0) return index;
  return level < CHAPTERS[0].start ? 0 : CHAPTERS.length - 1;
};
