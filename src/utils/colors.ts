/**
 * Rainbow Candy Palette System
 * Glossy, vibrant, candy-crush-style colors flowing from warm (top-left)
 * to cool (bottom-right). Each color includes a darker border shade and a
 * lighter accent for glossy 3D tile effects.
 */

export interface RegionTheme {
  id: number;
  name: string;
  pastel: string;
  border: string;
  darkContrast: string;
  accent: string;
}

export const RAINBOW_CANDY_PALETTE: RegionTheme[] = [
  {
    id: 1,
    name: 'Red',
    pastel: '#e63946',
    border: '#c62837',
    darkContrast: '#8b1a23',
    accent: '#ff6b7a',
  },
  {
    id: 2,
    name: 'Pink',
    pastel: '#f472b6',
    border: '#db2777',
    darkContrast: '#9d174d',
    accent: '#f9a8d4',
  },
  {
    id: 3,
    name: 'Orange',
    pastel: '#f59e0b',
    border: '#d97706',
    darkContrast: '#92400e',
    accent: '#fbbf24',
  },
  {
    id: 4,
    name: 'Yellow',
    pastel: '#fbbf24',
    border: '#d97706',
    darkContrast: '#78350f',
    accent: '#fde047',
  },
  {
    id: 5,
    name: 'Green',
    pastel: '#84cc16',
    border: '#65a30d',
    darkContrast: '#3f6212',
    accent: '#a3e635',
  },
  {
    id: 6,
    name: 'Cyan',
    pastel: '#38bdf8',
    border: '#0284c7',
    darkContrast: '#075985',
    accent: '#7dd3fc',
  },
  {
    id: 7,
    name: 'Blue',
    pastel: '#3b82f6',
    border: '#2563eb',
    darkContrast: '#1e3a8a',
    accent: '#60a5fa',
  },
  {
    id: 8,
    name: 'Indigo',
    pastel: '#6366f1',
    border: '#4f46e5',
    darkContrast: '#312e81',
    accent: '#818cf8',
  },
  {
    id: 9,
    name: 'Violet',
    pastel: '#a78bfa',
    border: '#8b5cf6',
    darkContrast: '#5b21b6',
    accent: '#c4b5fd',
  },
  {
    id: 10,
    name: 'Magenta',
    pastel: '#c084fc',
    border: '#a855f7',
    darkContrast: '#6b21a8',
    accent: '#d8b4fe',
  },
];

/**
 * Consecutive region ids must land on *distant* hues. Puzzles number regions
 * 1..n sequentially, so a plain palette walk would paint a 4-region board
 * entirely red/pink/orange/yellow — reads as three warm blobs. This stride
 * hops across the hue wheel (4 regions → red/cyan/orange/indigo) so every
 * neighbouring region pops.
 */
const REGION_HUE_ORDER = [0, 5, 2, 7, 3, 9, 1, 6, 4, 8];

export const getRegionTheme = (regionId?: number): RegionTheme => {
  if (!regionId || regionId <= 0) {
    return {
      id: 0,
      name: 'Parchment',
      pastel: '#F7F4EB',
      border: '#DFD8C8',
      darkContrast: '#4A463B',
      accent: '#EDE8DA',
    };
  }
  const index = REGION_HUE_ORDER[(regionId - 1) % REGION_HUE_ORDER.length];
  return RAINBOW_CANDY_PALETTE[index];
};

export const getRegionColor = (regionId?: number): string => {
  return getRegionTheme(regionId).pastel;
};

export const getRegionBorderColor = (regionId?: number): string => {
  return getRegionTheme(regionId).border;
};

export const COZY_COLORS = {
  canvasBackground: '#F8F6F0',
  boardBackground: '#FFFDF9',
  boardFrame: '#EADFCF',
  boardShadow: 'rgba(74, 58, 41, 0.12)',
  linenTextureLine: 'rgba(120, 100, 80, 0.05)',
  regionOuterStroke: 'rgba(44, 38, 30, 0.28)',
  regionInnerSeam: 'rgba(255, 255, 255, 0.35)',
  chalkMark: '#FFFDF8',
  chalkShadow: 'rgba(60, 48, 36, 0.3)',
  woodDark: '#4A3B2C',
  goldHighlight: '#F5B041',
  softError: '#D9534F',
};
