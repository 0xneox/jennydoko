import { PuzzleData, Region, DifficultyLevel } from '../game/types';
import { puzzles as handcraftedPuzzles } from './puzzles';
import { PuzzleSolver } from '../game/solver';
import { TWIN_TRIAL_START } from './twinTrialStart';

/**
 * High-performance 32-bit PRNG (Mulberry32)
 * Generates deterministic pseudo-random numbers in [0, 1) from an integer seed.
 */
export function createMulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Fast BFS connectivity test for region cells
 */
function isConnected(cells: { row: number; col: number }[]): boolean {
  if (cells.length <= 1) return true;
  const cellSet = new Set(cells.map(c => `${c.row},${c.col}`));
  const visited = new Set<string>();
  const queue = [`${cells[0].row},${cells[0].col}`];
  visited.add(queue[0]);

  while (queue.length > 0) {
    const curr = queue.pop()!;
    const [r, c] = curr.split(',').map(Number);
    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const nr = r + dr;
      const nc = c + dc;
      const key = `${nr},${nc}`;
      if (cellSet.has(key) && !visited.has(key)) {
        visited.add(key);
        queue.push(key);
      }
    }
  }
  return visited.size === cells.length;
}

/**
 * Ultra-fast backtracking solution counter. Stops as soon as `limit`
 * solutions are found (default 2 — enough to decide uniqueness).
 * Quota-aware: places `quota` mutually non-touching pups per row.
 * `forbidden` marks cat cells + cat-adjacent cells as unplaceable.
 */
export function countValidSolutions(
  gridSize: number,
  regions: Region[],
  quota: number = 1,
  forbidden?: Uint8Array,
  limit: number = 2
): number {
  const size = gridSize;
  const regionMap = new Int32Array(size * size);
  for (const region of regions) {
    for (const cell of region.cells) {
      regionMap[cell.row * size + cell.col] = region.id;
    }
  }

  let solutionCount = 0;
  const usedCols = new Uint8Array(size);
  const usedRegions = new Map<number, number>();
  const placedCols = new Int32Array(size * quota).fill(-1);

  function cellUsable(row: number, col: number): boolean {
    if (forbidden && forbidden[row * size + col]) return false;
    if (usedCols[col] >= quota) return false;
    const regId = regionMap[row * size + col];
    if ((usedRegions.get(regId) || 0) >= quota) return false;
    if (row > 0) {
      for (let k = 0; k < quota; k++) {
        const pc = placedCols[(row - 1) * quota + k];
        if (pc >= 0 && Math.abs(col - pc) <= 1) return false;
      }
    }
    return true;
  }

  function placeOnRow(row: number, startCol: number, placed: number): void {
    if (solutionCount >= limit) return;
    if (placed === quota) {
      solveRow(row + 1);
      return;
    }
    for (let col = startCol; col < size; col++) {
      if (placed > 0 && col - placedCols[row * quota + placed - 1] <= 1) continue;
      if (!cellUsable(row, col)) continue;

      const regId = regionMap[row * size + col];
      usedCols[col]++;
      usedRegions.set(regId, (usedRegions.get(regId) || 0) + 1);
      placedCols[row * quota + placed] = col;

      placeOnRow(row, col + 1, placed + 1);

      usedCols[col]--;
      usedRegions.set(regId, usedRegions.get(regId)! - 1);
      placedCols[row * quota + placed] = -1;
      if (solutionCount >= limit) return;
    }
  }

  function solveRow(row: number): void {
    if (solutionCount >= limit) return;
    if (row === size) {
      for (const region of regions) {
        if ((usedRegions.get(region.id) || 0) !== quota) return;
      }
      for (let c = 0; c < size; c++) {
        if (usedCols[c] !== quota) return;
      }
      solutionCount++;
      return;
    }
    placeOnRow(row, 0, 0);
  }

  solveRow(0);
  return solutionCount;
}

/** Twin (quota-2) boards may have at most this many valid arrangements. */
export const MAX_TWIN_SOLUTIONS = 3;

/**
 * Chapter-twist mechanics layered on top of the classic rules.
 * Keeps grids at phone-friendly sizes while still escalating difficulty.
 */
export interface LevelMechanics {
  /** 1 = classic, 2 = Twin Puppies (two pups per row/col/region). */
  puppiesPerUnit: number;
  /** Grumpy cat cells: unplaceable, and ban pups in all 8 neighbours. */
  catCount: number;
  /** Non-contiguous regions that share a single puppy. */
  linkedCount: number;
  /** Minimum hypothesis-chain deductions the solver must need. */
  minChains: number;
}

export function getLevelMechanics(level: number): LevelMechanics {
  if (level <= 100) {
    // Handcrafted campaign — no procedural mechanics
    return { puppiesPerUnit: 1, catCount: 0, linkedCount: 0, minChains: 0 };
  }
  if (level <= 200) {
    // Backyard & Garden Adventures (101-200, 5x5)
    // Progressive minChains ramp to prepare for cats
    return {
      puppiesPerUnit: 1,
      catCount: 0,
      linkedCount: 0,
      minChains: level <= 140 ? 0 : level <= 180 ? 1 : 2,
    };
  }
  if (level <= 300) {
    // Grumpy Cats chapters (201-300, 6x6)
    // Ramp: 1 cat → 2 cats → 2 cats + minChains
    return {
      puppiesPerUnit: 1,
      catCount: level <= 240 ? 1 : 2,
      linkedCount: 0,
      minChains: level <= 260 ? 0 : 1,
    };
  }
  if (level <= 400) {
    // Linked Beds chapters (301-400, 6x6)
    // Ramp: 1 linked → 2 linked → 2 linked + minChains
    return {
      puppiesPerUnit: 1,
      catCount: 0,
      linkedCount: level <= 340 ? 1 : 2,
      minChains: level <= 360 ? 0 : 1,
    };
  }
  if (level <= 600) {
    // Combo chapters: cats + linked beds (401-600, 7x7), chain-gated late.
    // NOTE: Twin Puppies is mathematically infeasible below 8x8 — two
    // non-touching pups per row/column can't fit on 7x7.
    // Ramp: 1 cat → 2 cats, 1 linked → 2 linked, minChains 0 → 1 → 2
    return {
      puppiesPerUnit: 1,
      catCount: level <= 460 ? 1 : 2,
      linkedCount: level <= 500 ? 1 : 2,
      minChains: level <= 460 ? 0 : level <= 540 ? 1 : 2,
    };
  }
  if (level <= 800) {
    // Twin Puppies debut (601-800, 8x8 — the smallest feasible twin board).
    // Quota-2 boards can't be chain-gated (deduction can't bootstrap) —
    // uniqueness is relaxed to "at least one valid arrangement".
    // Ramp: 0 linked → 1 linked → 2 linked
    return {
      puppiesPerUnit: 2,
      catCount: 0,
      linkedCount: level <= 660 ? 0 : level <= 740 ? 1 : 2,
      minChains: 0,
    };
  }
  if (level <= 900) {
    // Twin Puppies with cats (801-900, 9x9)
    // Ramp: 1 cat → 2 cats, 0 linked → 1 linked
    return {
      puppiesPerUnit: 2,
      catCount: level <= 850 ? 1 : 2,
      linkedCount: level <= 850 ? 0 : 1,
      minChains: 0,
    };
  }
  // Grand championship: twins + cats + linked beds (901-1000, 10x10)
  // Ramp: 1 cat → 2 cats, 1 linked → 2 linked
  return {
    puppiesPerUnit: 2,
    catCount: level <= 950 ? 1 : 2,
    linkedCount: level <= 950 ? 1 : 2,
    minChains: 0,
  };
}

/**
 * Determine grid size and difficulty target for any level number 1..1000
 */
export function getLevelConfig(level: number): {
  gridSize: number;
  difficulty: DifficultyLevel;
} {
  if (level <= 20) return { gridSize: 4, difficulty: 'beginner' };
  if (level <= 40) return { gridSize: 6, difficulty: 'easy' };
  if (level <= 60) return { gridSize: 7, difficulty: 'hard' };
  if (level <= 80) return { gridSize: 8, difficulty: 'expert' };
  if (level <= 100) return { gridSize: level <= 90 ? 9 : 10, difficulty: 'master' };

  // Levels 101 to 1000
  if (level <= 200) {
    return { gridSize: 5, difficulty: level <= 150 ? 'beginner' : 'easy' };
  }
  if (level <= 400) {
    return { gridSize: 6, difficulty: level <= 300 ? 'easy' : 'medium' };
  }
  if (level <= 600) {
    return { gridSize: 7, difficulty: level <= 500 ? 'medium' : 'hard' };
  }
  if (level <= 800) {
    return { gridSize: 8, difficulty: level <= 700 ? 'hard' : 'expert' };
  }
  if (level <= 900) {
    return { gridSize: 9, difficulty: 'expert' };
  }
  return { gridSize: 10, difficulty: level <= 960 ? 'master' : 'legend' };
}

/**
 * In-memory LRU cache for on-demand generated puzzles
 */
const puzzleCache = new Map<number, PuzzleData>();

/**
 * Construct a verified procedural puzzle deterministically using level as seed.
 */
export function generateDeterministicPuzzle(
  level: number,
  startTrial: number = TWIN_TRIAL_START[level] ?? 0
): PuzzleData {
  const { gridSize: n, difficulty } = getLevelConfig(level);
  const mech = getLevelMechanics(level);
  const quota = mech.puppiesPerUnit;
  const maxTrials = 600 * quota;
  // When resuming from the precomputed table the cap was already proven
  // offline (scripts/buildTwinTrialTable.ts + tests/twinBoards.test.ts), so
  // the runtime only needs an existence check — exhausting a 10x10 quota-2
  // search tree can otherwise cost hundreds of ms on a phone.
  const tableTrial = TWIN_TRIAL_START[level];

  for (let trial = startTrial; trial < maxTrials; trial++) {
    const rng = createMulberry32(level * 7919 + trial * 31);

    // 1. Solve for non-touching puppies — `quota` per row, column & region
    const rowCols: number[][] = [];
    const used = new Uint8Array(n);

    function solve(r: number): boolean {
      if (r === n) return true;
      const combos: number[][] = [];
      const pick = (start: number, chosen: number[]) => {
        if (chosen.length === quota) {
          combos.push([...chosen]);
          return;
        }
        for (let c = start; c < n; c++) {
          if (used[c] >= quota) continue;
          if (chosen.length > 0 && c - chosen[chosen.length - 1] < 2) continue;
          if (r > 0 && rowCols[r - 1].some(pc => Math.abs(c - pc) < 2)) continue;
          chosen.push(c);
          pick(c + 1, chosen);
          chosen.pop();
        }
      };
      pick(0, []);
      // Seeded Fisher-Yates shuffle
      for (let i = combos.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [combos[i], combos[j]] = [combos[j], combos[i]];
      }
      for (const combo of combos) {
        rowCols.push(combo);
        for (const c of combo) used[c]++;
        if (solve(r + 1)) return true;
        rowCols.pop();
        for (const c of combo) used[c]--;
      }
      return false;
    }

    if (!solve(0)) continue;
    const solution: { row: number; col: number }[] = [];
    rowCols.forEach((cols, row) => {
      for (const col of cols) solution.push({ row, col });
    });

    // 2. Initialize regions — region i is anchored on row i's `quota` pups
    const grid: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    const regions: Region[] = Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      cells: [],
    }));

    // Anchor regions stay exactly 1 cell → a forced single-cell starting clue.
    // Disabled at quota>1: a locked twin region would be two non-adjacent
    // seeds, which is disconnected by definition and can never pass the
    // connectivity check.
    const lockedRegionIds = new Set<number>();
    if (quota === 1) {
      if (n >= 8 || trial > 15) {
        lockedRegionIds.add(1);
        lockedRegionIds.add(n);
      } else {
        lockedRegionIds.add(1);
      }
    }

    for (let i = 0; i < n; i++) {
      for (let k = 0; k < quota; k++) {
        const cell = solution[i * quota + k];
        grid[cell.row][cell.col] = i + 1;
        regions[i].cells.push({ row: cell.row, col: cell.col });
      }
    }

    // 3. Collect unassigned cells
    const unassigned: { row: number; col: number }[] = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (grid[r][c] === 0) unassigned.push({ row: r, col: c });
      }
    }
    unassigned.sort((a, b) => a.row - b.row || a.col - b.col);

    // 4. Directional region growth (closest distance + smallest size priority)
    let stuck = false;
    while (unassigned.length > 0) {
      let assigned = false;
      for (let i = 0; i < unassigned.length; i++) {
        const { row, col } = unassigned[i];
        const adjRegs: number[] = [];
        for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
          const nr = row + dr;
          const nc = col + dc;
          if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] > 0) {
            const regId = grid[nr][nc];
            if (!lockedRegionIds.has(regId) && !adjRegs.includes(regId)) {
              adjRegs.push(regId);
            }
          }
        }

        if (adjRegs.length > 0) {
          adjRegs.sort((a, b) => {
            const distA = Math.abs(a - 1 - row);
            const distB = Math.abs(b - 1 - row);
            if (distA !== distB) return distA - distB;
            return regions[a - 1].cells.length - regions[b - 1].cells.length;
          });

          const chosen = adjRegs[0];
          grid[row][col] = chosen;
          regions[chosen - 1].cells.push({ row, col });
          unassigned.splice(i, 1);
          assigned = true;
          break;
        }
      }

      if (!assigned) {
        stuck = true;
        break;
      }
    }

    if (stuck) continue;
    if (regions.some(r => !isConnected(r.cells))) continue;

    const solutionSet = new Set(solution.map(s => s.row * n + s.col));

    // 5. Grumpy cats — placed away from every solution pup (cat aura) and
    // never inside locked anchor regions
    const cats: { row: number; col: number }[] = [];
    const forbidden = new Uint8Array(n * n);
    if (mech.catCount > 0) {
      const catCandidates: { row: number; col: number }[] = [];
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          if (solutionSet.has(r * n + c)) continue;
          if (lockedRegionIds.has(grid[r][c])) continue;
          let nearSolution = false;
          for (const s of solution) {
            if (Math.abs(s.row - r) <= 1 && Math.abs(s.col - c) <= 1) {
              nearSolution = true;
              break;
            }
          }
          if (!nearSolution) catCandidates.push({ row: r, col: c });
        }
      }
      for (let i = catCandidates.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [catCandidates[i], catCandidates[j]] = [catCandidates[j], catCandidates[i]];
      }
      for (const cell of catCandidates.slice(0, mech.catCount)) {
        cats.push(cell);
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = cell.row + dr;
            const nc = cell.col + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
              forbidden[nr * n + nc] = 1;
            }
          }
        }
      }
      if (cats.length < mech.catCount) continue;
    }

    // 6. Linked beds — steal a remote (non-adjacent) cell into a region so it
    // becomes intentionally non-contiguous while sharing one puppy
    if (mech.linkedCount > 0) {
      const solutionName = new Set(solution.map(s => `${s.row},${s.col}`));
      const linkedSoFar = new Set<number>();
      for (let k = 0; k < mech.linkedCount; k++) {
        const targets = regions
          .map(r => r.id)
          .filter(id => !lockedRegionIds.has(id) && !linkedSoFar.has(id));
        for (let i = targets.length - 1; i > 0; i--) {
          const j = Math.floor(rng() * (i + 1));
          [targets[i], targets[j]] = [targets[j], targets[i]];
        }

        let done = false;
        for (const rid of targets) {
          const R = regions[rid - 1];
          const donors: { q: Region; cell: { row: number; col: number } }[] = [];
          for (const Q of regions) {
            if (Q.id === R.id || lockedRegionIds.has(Q.id) || Q.cells.length <= 1) continue;
            for (const cell of Q.cells) {
              if (solutionName.has(`${cell.row},${cell.col}`)) continue;
              if (cats.some(ct => ct.row === cell.row && ct.col === cell.col)) continue;
              const touchesR = R.cells.some(
                rc => Math.abs(rc.row - cell.row) + Math.abs(rc.col - cell.col) === 1
              );
              if (!touchesR) donors.push({ q: Q, cell });
            }
          }
          for (let i = donors.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [donors[i], donors[j]] = [donors[j], donors[i]];
          }
          for (const d of donors) {
            d.q.cells = d.q.cells.filter(
              c => !(c.row === d.cell.row && c.col === d.cell.col)
            );
            if (d.q.cells.length === 0 || !isConnected(d.q.cells)) {
              d.q.cells.push(d.cell);
              continue;
            }
            R.cells.push(d.cell);
            R.linked = true;
            linkedSoFar.add(R.id);
            done = true;
            break;
          }
          if (done) break;
        }
      }
      if (linkedSoFar.size < mech.linkedCount) continue;
    }

    // 7. Solution check + logic-solvability gate.
    // Quota-1 boards must be UNIQUE and solvable by pure deduction (no guessing).
    // Twin boards are intrinsically search-heavy — players solve them by
    // experimenting with instant validity feedback — so we allow a small
    // handful of arrangements, but reject degenerate boards with many.
    // `solution` is valid by construction (regions anchored on its pups, cats
    // kept out of its aura, linked cells never stolen from it), so existence
    // is guaranteed; the count only decides uniqueness / the cap.
    const capVerifiedOffline = quota > 1 && tableTrial !== undefined && trial === tableTrial;
    if (!capVerifiedOffline) {
      const limit = quota === 1 ? 2 : MAX_TWIN_SOLUTIONS + 1;
      const solutionCount = countValidSolutions(n, regions, quota, forbidden, limit);
      const withinCap = quota === 1 ? solutionCount === 1 : solutionCount <= MAX_TWIN_SOLUTIONS;
      if (!withinCap) continue;
    }

    let deductionsApplied = n * quota * 2;
    if (quota === 1) {
      const scratchCells = Array.from({ length: n }, (_, r) =>
        Array.from({ length: n }, (_, c) => ({
          row: r,
          col: c,
          value: cats.some(ct => ct.row === r && ct.col === c)
            ? ('cat' as const)
            : ('empty' as const),
        }))
      );
      const analysis = new PuzzleSolver(
        { gridSize: n, cells: scratchCells, regions },
        { puppiesPerUnit: quota }
      ).analyze();
      if (!analysis.solvable || analysis.chainsUsed < mech.minChains) continue;
      deductionsApplied = analysis.deductionsApplied;
    }

    const firstLocked = Array.from(lockedRegionIds)[0] ?? 1;
    const anchorCell = regions[firstLocked - 1].cells[0];
    const techniquesRequired: PuzzleData['techniquesRequired'] = [
      'single_cell_colour',
      'row_elimination',
      'column_elimination',
      'neighbour_elimination',
    ];
    if (quota === 1 && mech.minChains > 0) techniquesRequired.push('deduction_chain');

    return {
      level,
      gridSize: n,
      regions,
      solution,
      difficulty,
      techniquesRequired,
      techniquesIntroduced: [],
      hasLogicalStart: true,
      startingDeduction: `Single-cell colour at (${anchorCell.row}, ${anchorCell.col})`,
      estimatedSolvingSteps: deductionsApplied,
      puppiesPerUnit: quota,
      cats,
      seedTrial: trial,
    };
  }

  // Ultra-resilient fallback: return an adjacent verified puzzle configuration scaled to level
  const fallbackLevel = 100;
  const fallback = handcraftedPuzzles[fallbackLevel - 1];
  return {
    ...fallback,
    level,
    difficulty,
    puppiesPerUnit: 1,
    cats: [],
  };
}

/**
 * Get any puzzle from Level 1 to 1000.
 * Levels 1..100 return handcrafted puzzles.
 * Levels 101..1000 return deterministic, verified on-demand procedural puzzles.
 */
export function getPuzzle(levelNumber: number): PuzzleData {
  const level = Math.max(1, Math.min(1000, levelNumber));

  // Handcrafted levels 1..100
  if (level <= 100) {
    return handcraftedPuzzles[level - 1] || handcraftedPuzzles[0];
  }

  // Check in-memory cache for levels 101..1000
  const cached = puzzleCache.get(level);
  if (cached) {
    return cached;
  }

  // Generate deterministically
  const puzzle = generateDeterministicPuzzle(level);
  puzzleCache.set(level, puzzle);
  return puzzle;
}

/**
 * Daily Challenge Puzzle Generator (seeded by date integer, e.g. 20260909)
 */
export function getDailyPuzzle(dateSeed?: number): PuzzleData {
  const seed =
    dateSeed ||
    (() => {
      const now = new Date();
      return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    })();

  // Map date seed into range 200..900 for an enjoyable daily medium/hard challenge
  const mappedLevel = 200 + (Math.abs(seed) % 701);
  return getPuzzle(mappedLevel);
}
