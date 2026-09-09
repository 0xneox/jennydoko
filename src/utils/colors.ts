/**
 * Nordic / Cozy Pastel Palette System
 * Harmonious, eye-friendly, low-eye-strain colors with high accessibility,
 * distinct luminance separation, and colorblind-safe contrast.
 */

export interface RegionTheme {
  id: number;
  name: string;
  pastel: string;
  border: string;
  darkContrast: string;
  accent: string;
}

export const NORDIC_PASTEL_PALETTE: RegionTheme[] = [
  {
    id: 1,
    name: 'Sage Green',
    pastel: '#9EB897',
    border: '#6B8A64',
    darkContrast: '#2D4527',
    accent: '#82A37B',
  },
  {
    id: 2,
    name: 'Dusty Blue',
    pastel: '#8EAAC7',
    border: '#5B7C9E',
    darkContrast: '#243B52',
    accent: '#7394B7',
  },
  {
    id: 3,
    name: 'Soft Butter',
    pastel: '#F2D382',
    border: '#C7A246',
    darkContrast: '#5C4612',
    accent: '#E3BE64',
  },
  {
    id: 4,
    name: 'Lavender Mist',
    pastel: '#BBA8CE',
    border: '#8B74A3',
    darkContrast: '#3C2B4E',
    accent: '#A58EBC',
  },
  {
    id: 5,
    name: 'Terracotta Clay',
    pastel: '#D68870',
    border: '#A8573D',
    darkContrast: '#4A2114',
    accent: '#C47259',
  },
  {
    id: 6,
    name: 'Warm Blush',
    pastel: '#E7A598',
    border: '#B86F60',
    darkContrast: '#4E2118',
    accent: '#D38D7E',
  },
  {
    id: 7,
    name: 'Forest Pine',
    pastel: '#79A697',
    border: '#4A7566',
    darkContrast: '#1E382F',
    accent: '#629181',
  },
  {
    id: 8,
    name: 'Oat Cream',
    pastel: '#D5BDA0',
    border: '#A38766',
    darkContrast: '#473623',
    accent: '#C1A484',
  },
  {
    id: 9,
    name: 'Heather Plum',
    pastel: '#C18BAF',
    border: '#935880',
    darkContrast: '#421E36',
    accent: '#AB7298',
  },
  {
    id: 10,
    name: 'Fjord Denim',
    pastel: '#6E94B0',
    border: '#436B8A',
    darkContrast: '#1B374E',
    accent: '#5680A0',
  },
];

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
  const index = (regionId - 1) % NORDIC_PASTEL_PALETTE.length;
  return NORDIC_PASTEL_PALETTE[index];
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
