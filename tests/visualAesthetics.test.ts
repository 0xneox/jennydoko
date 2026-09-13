import {
  RAINBOW_CANDY_PALETTE,
  getRegionTheme,
  getRegionColor,
  getRegionBorderColor,
  COZY_COLORS,
} from '../src/utils/colors';

describe('Sprint 3: Visual Identity & Bespoke Cozy Art System', () => {
  describe('Rainbow Candy Palette', () => {
    it('defines 10 distinct, vibrant rainbow themes', () => {
      expect(RAINBOW_CANDY_PALETTE).toHaveLength(10);

      const names = RAINBOW_CANDY_PALETTE.map(t => t.name);
      expect(names).toContain('Red');
      expect(names).toContain('Pink');
      expect(names).toContain('Orange');
      expect(names).toContain('Yellow');
      expect(names).toContain('Green');
      expect(names).toContain('Cyan');
      expect(names).toContain('Blue');
      expect(names).toContain('Indigo');
      expect(names).toContain('Violet');
      expect(names).toContain('Magenta');
    });

    it('each theme contains valid hex strings for pastel, border, darkContrast, and accent', () => {
      const hexRegex = /^#([A-Fa-f0-9]{6})$/;
      RAINBOW_CANDY_PALETTE.forEach(theme => {
        expect(theme.pastel).toMatch(hexRegex);
        expect(theme.border).toMatch(hexRegex);
        expect(theme.darkContrast).toMatch(hexRegex);
        expect(theme.accent).toMatch(hexRegex);
      });
    });

    it('all 10 pastel colors are unique to prevent ambiguity between regions', () => {
      const pastels = RAINBOW_CANDY_PALETTE.map(t => t.pastel.toLowerCase());
      const uniquePastels = new Set(pastels);
      expect(uniquePastels.size).toBe(10);
    });

    it('border color has lower lightness than pastel color for high-contrast region contours', () => {
      const hexToLuminance = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };

      RAINBOW_CANDY_PALETTE.forEach(theme => {
        const pastelLum = hexToLuminance(theme.pastel);
        const borderLum = hexToLuminance(theme.border);
        const darkLum = hexToLuminance(theme.darkContrast);

        // Border must be distinctly darker than the pastel fill to define clear boundaries
        expect(borderLum).toBeLessThan(pastelLum);
        // Dark contrast text/icon stroke must be darker still
        expect(darkLum).toBeLessThan(borderLum);
      });
    });

    it('getRegionColor maps regionId safely and cyclically', () => {
      expect(getRegionColor(1)).toBe(RAINBOW_CANDY_PALETTE[0].pastel);
      expect(getRegionColor(2)).toBe(RAINBOW_CANDY_PALETTE[5].pastel);
      expect(getRegionColor(11)).toBe(RAINBOW_CANDY_PALETTE[0].pastel); // wraps around
    });

    it('consecutive region ids always map to distinct hues (stride permutation)', () => {
      for (let id = 1; id < 10; id++) {
        expect(getRegionColor(id)).not.toBe(getRegionColor(id + 1));
      }
      const firstFour = new Set([1, 2, 3, 4].map(getRegionColor));
      expect(firstFour.size).toBe(4);
    });

    it('getRegionBorderColor maps correctly', () => {
      expect(getRegionBorderColor(1)).toBe(RAINBOW_CANDY_PALETTE[0].border);
      expect(getRegionBorderColor(5)).toBe(RAINBOW_CANDY_PALETTE[3].border);
    });

    it('returns parchment fallback theme for undefined or 0 regionId', () => {
      const fallback = getRegionTheme(undefined);
      expect(fallback.name).toBe('Parchment');
      expect(fallback.pastel).toBe('#F7F4EB');
    });

    it('defines cozy backdrop and material constants', () => {
      expect(COZY_COLORS.canvasBackground).toBe('#F8F6F0');
      expect(COZY_COLORS.boardBackground).toBe('#FFFDF9');
      expect(COZY_COLORS.chalkMark).toBe('#FFFDF8');
    });
  });

  describe('Region Boundary Edge Calculation', () => {
    // Helper replicating the border computation used by Board component
    const computeCellBorders = (
      row: number,
      col: number,
      gridSize: number,
      gridRegionMap: number[][]
    ) => {
      const regionId = gridRegionMap[row][col];
      const topRegion = row > 0 ? gridRegionMap[row - 1][col] : undefined;
      const bottomRegion = row < gridSize - 1 ? gridRegionMap[row + 1][col] : undefined;
      const leftRegion = col > 0 ? gridRegionMap[row][col - 1] : undefined;
      const rightRegion = col < gridSize - 1 ? gridRegionMap[row][col + 1] : undefined;

      return {
        top: row === 0 || topRegion !== regionId,
        bottom: row === gridSize - 1 || bottomRegion !== regionId,
        left: col === 0 || leftRegion !== regionId,
        right: col === gridSize - 1 || rightRegion !== regionId,
      };
    };

    it('computes outer borders correctly for a single-cell isolated region', () => {
      const grid = [
        [1, 2],
        [3, 4],
      ];
      const borders = computeCellBorders(0, 0, 2, grid);
      expect(borders).toEqual({
        top: true,
        bottom: true,
        left: true,
        right: true,
      });
    });

    it('computes inner seams correctly for connected cells within the same region', () => {
      const grid = [
        [1, 1],
        [2, 2],
      ];
      // Cell (0, 0) and Cell (0, 1) share a horizontal region
      const cell00 = computeCellBorders(0, 0, 2, grid);
      expect(cell00.top).toBe(true); // top grid boundary
      expect(cell00.bottom).toBe(true); // borders region 2
      expect(cell00.left).toBe(true); // left grid boundary
      expect(cell00.right).toBe(false); // inner seam! shares region with (0, 1)

      const cell01 = computeCellBorders(0, 1, 2, grid);
      expect(cell01.left).toBe(false); // inner seam! shares region with (0, 0)
      expect(cell01.right).toBe(true); // right grid boundary
    });
  });
});
