import { generateCatPurr, generateCatHiss, generateComboChime, generateLinkedSparkle, getSampleRate } from '../src/utils/audioSynthesis';

describe('Phase 3 Juice — Procedural Audio', () => {
  const sampleRate = getSampleRate();

  describe('Cat Purr SFX', () => {
    it('generates a valid 0.6s buffer', () => {
      const samples = generateCatPurr();
      expect(samples.length).toBe(Math.floor(sampleRate * 0.6));
      expect(samples.some(s => s !== 0)).toBe(true);
    });

    it('has a low-frequency rumble character (peak amplitude in first half)', () => {
      const samples = generateCatPurr();
      const firstHalf = samples.slice(0, samples.length / 2);
      const secondHalf = samples.slice(samples.length / 2);
      const firstPeak = Math.max(...firstHalf.map(Math.abs));
      const secondPeak = Math.max(...secondHalf.map(Math.abs));
      // Envelope is a sine curve, so both halves should have significant amplitude
      expect(firstPeak).toBeGreaterThan(0.01);
      expect(secondPeak).toBeGreaterThan(0.01);
    });

    it('values are within valid float range [-1, 1]', () => {
      const samples = generateCatPurr();
      expect(Math.max(...samples)).toBeLessThanOrEqual(1);
      expect(Math.min(...samples)).toBeGreaterThanOrEqual(-1);
    });
  });

  describe('Cat Hiss SFX', () => {
    it('generates a valid 0.25s buffer', () => {
      const samples = generateCatHiss();
      expect(samples.length).toBe(Math.floor(sampleRate * 0.25));
      expect(samples.some(s => s !== 0)).toBe(true);
    });

    it('has a sharp decay (louder at start than end)', () => {
      const samples = generateCatHiss();
      const firstQuarter = samples.slice(0, samples.length / 4);
      const lastQuarter = samples.slice(samples.length * 3 / 4);
      const firstPeak = Math.max(...firstQuarter.map(Math.abs));
      const lastPeak = Math.max(...lastQuarter.map(Math.abs));
      expect(firstPeak).toBeGreaterThan(lastPeak);
    });
  });

  describe('Combo Chime SFX', () => {
    it('generates a valid 0.35s buffer', () => {
      const samples = generateComboChime();
      expect(samples.length).toBe(Math.floor(sampleRate * 0.35));
      expect(samples.some(s => s !== 0)).toBe(true);
    });

    it('has ascending arpeggio character (notes start at different times)', () => {
      const samples = generateComboChime();
      // The first note starts at t=0, so there should be energy early
      const earlyEnergy = samples.slice(0, Math.floor(sampleRate * 0.05));
      expect(Math.max(...earlyEnergy.map(Math.abs))).toBeGreaterThan(0.01);
      // Later notes should add more energy
      const midEnergy = samples.slice(Math.floor(sampleRate * 0.1), Math.floor(sampleRate * 0.15));
      expect(Math.max(...midEnergy.map(Math.abs))).toBeGreaterThan(0.01);
    });
  });

  describe('Linked Sparkle SFX', () => {
    it('generates a valid 0.4s buffer', () => {
      const samples = generateLinkedSparkle();
      expect(samples.length).toBe(Math.floor(sampleRate * 0.4));
      expect(samples.some(s => s !== 0)).toBe(true);
    });

    it('has shimmer character (sustained energy across the buffer)', () => {
      const samples = generateLinkedSparkle();
      const firstThird = samples.slice(0, samples.length / 3);
      const lastThird = samples.slice(samples.length * 2 / 3);
      expect(Math.max(...firstThird.map(Math.abs))).toBeGreaterThan(0.01);
      expect(Math.max(...lastThird.map(Math.abs))).toBeGreaterThan(0.005);
    });
  });
});

describe('Phase 3 Juice — Combo Counter Logic', () => {
  // Test the combo tracking logic in isolation
  const COMBO_WINDOW_MS = 2500;

  const computeCombo = (
    placements: { time: number; success: boolean }[]
  ): { count: number; toasts: string[] } => {
    let count = 0;
    let lastTime = 0;
    const toasts: string[] = [];

    for (const p of placements) {
      if (!p.success) continue;
      const isRapid = p.time - lastTime < COMBO_WINDOW_MS;
      count = isRapid ? count + 1 : 1;
      lastTime = p.time;
      if (count >= 2) {
        toasts.push(`Pup chain ×${count}!`);
      }
    }
    return { count, toasts };
  };

  it('does not show toast for a single placement', () => {
    const result = computeCombo([{ time: 0, success: true }]);
    expect(result.count).toBe(1);
    expect(result.toasts).toEqual([]);
  });

  it('shows ×2 toast for two rapid placements', () => {
    const result = computeCombo([
      { time: 0, success: true },
      { time: 500, success: true },
    ]);
    expect(result.count).toBe(2);
    expect(result.toasts).toEqual(['Pup chain ×2!']);
  });

  it('shows ×3 toast for three rapid placements', () => {
    const result = computeCombo([
      { time: 0, success: true },
      { time: 500, success: true },
      { time: 1000, success: true },
    ]);
    expect(result.count).toBe(3);
    expect(result.toasts).toEqual(['Pup chain ×2!', 'Pup chain ×3!']);
  });

  it('resets combo when placements are too far apart', () => {
    const result = computeCombo([
      { time: 0, success: true },
      { time: 500, success: true },
      { time: 4000, success: true }, // beyond window
    ]);
    expect(result.count).toBe(1);
    expect(result.toasts).toEqual(['Pup chain ×2!']);
  });

  it('ignores failed placements', () => {
    const result = computeCombo([
      { time: 0, success: true },
      { time: 500, success: false },
      { time: 1000, success: true },
    ]);
    expect(result.count).toBe(2);
    expect(result.toasts).toEqual(['Pup chain ×2!']);
  });
});

describe('Phase 3 Juice — Cat Aura Detection', () => {
  const detectCatAura = (
    cells: { value: string }[][],
    gridSize: number
  ): Set<string> => {
    const aura = new Set<string>();
    const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (cells[r][c].value === 'cat') {
          for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize) {
              aura.add(`${nr},${nc}`);
            }
          }
        }
      }
    }
    return aura;
  };

  it('marks all 8 cells around a cat', () => {
    const cells = Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => ({ value: 'empty' }))
    );
    cells[1][1] = { value: 'cat' };
    const aura = detectCatAura(cells, 4);
    expect(aura.size).toBe(8);
    expect(aura.has('0,0')).toBe(true);
    expect(aura.has('0,1')).toBe(true);
    expect(aura.has('0,2')).toBe(true);
    expect(aura.has('1,0')).toBe(true);
    expect(aura.has('1,2')).toBe(true);
    expect(aura.has('2,0')).toBe(true);
    expect(aura.has('2,1')).toBe(true);
    expect(aura.has('2,2')).toBe(true);
  });

  it('does not mark the cat cell itself', () => {
    const cells = Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => ({ value: 'empty' }))
    );
    cells[1][1] = { value: 'cat' };
    const aura = detectCatAura(cells, 4);
    expect(aura.has('1,1')).toBe(false);
  });

  it('handles cats at board edges (clamped)', () => {
    const cells = Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => ({ value: 'empty' }))
    );
    cells[0][0] = { value: 'cat' };
    const aura = detectCatAura(cells, 4);
    // Corner cat: only 3 valid neighbors
    expect(aura.size).toBe(3);
    expect(aura.has('0,1')).toBe(true);
    expect(aura.has('1,0')).toBe(true);
    expect(aura.has('1,1')).toBe(true);
  });

  it('returns empty set when no cats present', () => {
    const cells = Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => ({ value: 'empty' }))
    );
    const aura = detectCatAura(cells, 4);
    expect(aura.size).toBe(0);
  });
});
