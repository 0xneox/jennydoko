# JennyDoko — project notes

Expo SDK 57 / React Native 0.86 / TypeScript. Star Battle-style puzzle game, 1000 levels.

## Commands

- `npm test` — Jest, ~1 min. `tests/` only, `*.test.ts`. Node env (no RN renderer).
- `npx tsc --noEmit -p tsconfig.json` — typecheck (must be clean).
- `npm start` / `npm run web` — Expo dev server.
- `npx ts-node --compiler-options '{"module":"commonjs"}' scripts/<script>.ts` — run scripts.

## Architecture

- `src/game/engine.ts` (mutable board + rules) → `src/store/gameStore.ts` (Zustand) → `src/screens/*`.
- `src/game/solver.ts` — deduction engine used for hints and generator gating. `findAnySolution()` is the hint fallback on twin boards.
- `src/data/puzzles.ts` — handcrafted levels 1-100. `src/data/proceduralPuzzles.ts` — deterministic (Mulberry32) generation for 101-1000.
- `src/utils/storage.ts` / `statistics.ts` — all reads/writes await `storageReady` / `statsStorageReady`; never read the backend flag directly.

## Level rules that tests enforce

- Levels 101-600 (quota 1): exactly one solution, solvable by pure deduction.
- Levels 601-1000 (twin, quota 2): 1..`MAX_TWIN_SOLUTIONS` (3) solutions. Generation starts from `src/data/twinTrialStart.ts`.
  **If you change generator rules, `getLevelMechanics`, `getLevelConfig`, or the cap, regenerate the table:**
  `npx ts-node --compiler-options '{"module":"commonjs"}' scripts/buildTwinTrialTable.ts` (~40s), then run `tests/twinBoards.test.ts`.
- `DEV_UNLOCK_ALL_LEVELS` in `gameStore.ts` must be `false` (asserted by `tests/fairness.test.ts`).

## Audio

- Web uses synthesized Web Audio buffers (`src/utils/audioSynthesis.ts`); native uses files in `assets/sounds/`.
- Every `SoundType` needs an entry in BOTH `SOUND_MAP` (native file) and `WEB_BUFFER_MAP` (web buffer) in `soundManager.ts`.
- Regenerate the synth-derived WAVs: `npx ts-node --compiler-options '{"module":"commonjs"}' scripts/generateExtraSounds.ts`.
- BGM ships as `bgm_acoustic.m4a` (AAC). Rebuild from the WAV with `ffmpeg -i bgm_acoustic.wav -c:a aac -b:a 128k bgm_acoustic.m4a`.

## Gotchas

- Wall-clock test thresholds are budgets (300ms cold / 20ms cached), not targets — don't tighten them to local numbers.
- App boots via `index.ts` → `App.tsx` (no router). `expo-router` was removed because its peer-dep tree broke `npm ci` on EAS — don't re-add it unless the app actually adopts file-based routing.
- Metro only bundles `require()`d assets, so stray files in `assets/` don't ship, but they do bloat the repo.
