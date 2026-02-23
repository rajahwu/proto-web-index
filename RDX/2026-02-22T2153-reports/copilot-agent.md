# Audit Report — Copilot Agent

**Date:** 2026-02-22  
**Scope:** Full codebase audit after Refactor Phase 2 (State Machine + Codex + Admin Dashboard)  
**Agent:** GitHub Copilot (Claude Opus 4.6)

---

## 1. Executive Summary

The codebase has undergone a significant second refactor that introduces:
- A **Redux state machine** (`gameSlice.ts`) with 8 `GamePhase` transitions replacing the old flat reducer.
- A **game-lore codex** domain (`src/web/game-lore/`) with vessel lore pages.
- A **brand-ops admin dashboard** (`src/web/admin/pages/BrandOpsDashboard.tsx`) with sprint tracking.
- Router decomposition into `phase.tsx` and `codex.tsx` sub-modules under `src/app/router/lite-game/`.

**Build health:** `tsc` passes clean after 2 fixes applied this session. `pnpm lint` has 6 pre-existing issues (non-blocking).

**Critical finding fixed this session:** `store.ts` mounted `gameReducer` under both `gameEngine` and `gameSlice` keys — duplicate state. Removed the `gameSlice` key.

**Largest remaining gap:** 4 of 5 phase pages still use **legacy patterns** (`localStorage`, per-action Supabase writes, non-existent dispatch types) instead of the new state machine actions.

---

## 2. Directory Structure (post-refactor)

```
src/
  app/
    config/       — config.ts, supabase.ts (env validation + table constants)
    store/        — store.ts, gameSlice.ts (state machine)
    hooks/        — index.ts (useAppDispatch, useAppSelector)
    router/
      system-node-index.tsx   — / route
      admin.tsx               — /admin/* routes
      lite-game/
        phase.tsx             — /lite-game/* game phase routes
        codex.tsx             — /codex/* lore routes
    router.tsx    — root composition (createAppRouter)
    main.tsx      — entry point
  web/
    lite-game/
      hooks/      — useGameState.ts
      types/      — lite-game.ts, characters.ts
      components/ — (empty — scaffolding)
      pages/
        HomePage/   — V-00 hub page
        phases/
          title-start/        — LiteGameHome.tsx
          character-select/   — CharacterSelectPage.tsx + sub-components
          level/              — LevelPage.tsx, LevelHeader.tsx, CardDisplay.tsx
          door-choice/        — DoorChoicePage.tsx, Door.tsx, DoorCard.tsx
          game-over/          — GameOverPage.tsx
    game-lore/
      pages/codex/
        HomePage/   — Codex home
        IndexPage/  — Codex index
        LorePage/   — Vessel lore (5 vessels)
      codex/
        assets/     — (empty)
        blobs/      — (empty)
    admin/
      pages/        — BrandOpsDashboard.tsx
      BrandSpecimen.tsx — legacy brand token display
    index/
      IndexPage.tsx, index.loader.ts
  components/ui/    — button.tsx (Shadcn)
  lib/              — utils.ts
  shared/ui/        — (empty)
```

---

## 3. State Machine Audit (`gameSlice.ts`)

### 3.1 Phase Map

| GamePhase          | Triggering Action    | Target Phase     |
|--------------------|----------------------|------------------|
| TITLE              | `initiateSequence`   | CHARACTER_SELECT |
| CHARACTER_SELECT   | `selectVessel`       | STAGING          |
| STAGING            | `setPhase`           | CARD_DRAFT / LEVEL_PLAY |
| CARD_DRAFT         | `playCard`           | (stays)          |
| LEVEL_PLAY         | `playCard`           | (stays)          |
| DOOR_CHOICE        | `attemptDoor` (pass) | STAGING          |
| DOOR_CHOICE        | `attemptDoor` (fail) | DUDAEL_DROP      |
| any                | `terminateRun`       | GAME_OVER        |
| any                | `resetGame`          | TITLE (initial)  |

### 3.2 Actions Inventory

| Action            | Payload                                     | Side Effects        |
|-------------------|---------------------------------------------|---------------------|
| `initiateSequence`| none                                        | phase → CHARACTER_SELECT |
| `selectVessel`    | `{ vesselId, light, dark }`                 | sets vessel + stats, phase → STAGING |
| `setPhase`        | `GamePhase`                                 | manual phase override |
| `setLevel`        | `number`                                    | sets currentLevel (legacy, still exported) |
| `playCard`        | `{ lightDelta, darkDelta }`                 | light/dark arithmetic |
| `attemptDoor`     | `{ doorType, cost }`                        | door math, level++, phase change |
| `syncProgress`    | `{ currentLight, currentDark, currentLevel }` | hydrate 3 fields |
| `terminateRun`    | none                                        | phase → GAME_OVER |
| `resetGame`       | none                                        | → initialState |

### 3.3 Observations
- `setLevel` is still exported but is a **legacy action** — `attemptDoor` now handles level increments internally. Only `DoorChoicePage` still imports it.
- `syncProgress` requires 3 fields but `LevelPage` dispatches it with only 2 (missing `currentLevel`). This is a **runtime bug** — the reducer will set `currentLevel` to `undefined`.
- No guard logic in `setPhase` — any component can force any phase. Consider adding phase-transition validation in a future iteration.

---

## 4. Page Wiring Audit

### 4.1 Reference Implementation ✅ — `Door.tsx`

Uses the **correct new pattern**:
- `useGameState()` hook for state access
- `useAppDispatch` + `useAppSelector` from typed hooks
- Dispatches `attemptDoor({ doorType, cost })` directly
- No `localStorage`, no per-action Supabase writes

### 4.2 `CharacterSelectPage.tsx` — ❌ NOT WIRED

| Issue | Detail |
|-------|--------|
| localStorage | Writes `lite_game_player_id` to localStorage (line 53) |
| Supabase writes | Inserts into PLAYERS, PLAYER_STATS, PLAYER_PROGRESS immediately on creation |
| Missing dispatch | Does not dispatch `selectVessel()` to update Redux |
| Navigation | Navigates directly to `/lite-game/level/1` bypassing STAGING phase |

### 4.3 `LevelPage.tsx` — ❌ NOT WIRED

| Issue | Detail |
|-------|--------|
| localStorage | Reads `lite_game_player_id` from localStorage (line 18) |
| Non-existent actions | Dispatches `'gameEngine/addLight'` and `'gameEngine/addDark'` — these action types do not exist in the slice |
| syncProgress | Dispatches with only `{ currentLight, currentDark }` — missing `currentLevel` (3rd required field) |
| Supabase per-action | Updates PLAYER_PROGRESS on every card claim, logs events per card draw |

### 4.4 `DoorChoicePage.tsx` — ❌ PARTIALLY WIRED

| Issue | Detail |
|-------|--------|
| localStorage | Reads `lite_game_player_id` (line 16) |
| Old action | Imports and uses `setLevel` instead of `attemptDoor` |
| Supabase per-action | Writes event log, progress update, and completion tracking per door choice |
| Typed hooks | ✅ Uses `useAppSelector`/`useAppDispatch` correctly |

### 4.5 `GameOverPage.tsx` — ❌ PARTIALLY WIRED

| Issue | Detail |
|-------|--------|
| localStorage | Reads `lite_game_player_id` (line 10), removes it on reset (line 56) |
| Supabase reads | Fetches final stats from PLAYER_PROGRESS + PLAYERS at mount |
| resetGame | ✅ Correctly dispatches `resetGame()` |
| Missing Redux read | Should read final stats from `state.gameEngine` instead of Supabase |

---

## 5. Build & Lint Health

### 5.1 TypeScript (`npx tsc -b --noEmit`)

| Status | Detail |
|--------|--------|
| **PASS** | 0 errors (after fixing unused `React` import in BrandOpsDashboard.tsx this session) |

### 5.2 ESLint (`pnpm lint`)

6 pre-existing issues (5 errors, 1 warning):

| File | Rule | Issue |
|------|------|-------|
| `components/ui/button.tsx` | `react-refresh/only-export-components` | Constant export alongside component |
| `CharacterSelectPage.tsx` | `@typescript-eslint/no-unused-expressions` | `queryClient;` bare expression |
| `LevelPage.tsx` | `@typescript-eslint/no-unused-expressions` | `queryClient;` bare expression |
| `DoorChoicePage.tsx` | `react-hooks/exhaustive-deps` | Missing dependency in useEffect |
| `lite-game.ts` | `@typescript-eslint/no-explicit-any` | `Record<string, any>` in `Skill.effect_data` |
| `lite-game.ts` | `@typescript-eslint/no-explicit-any` | `Record<string, any>` in `GameEvent.event_data` |

### 5.3 Store Bug (FIXED)

`store.ts` had `gameReducer` mounted under both `gameEngine` and `gameSlice` keys. This caused the same reducer to run twice per dispatch. The `gameSlice` key was removed — only `gameEngine` remains.

---

## 6. Data Consistency Issues

### 6.1 Vessel Count Mismatch

- `characters.ts` defines **3 vessels**: The Seraph, The Shadow, The Exile
- `LorePage/index.tsx` renders **5 vessels**: adds The Penitent, The Rebel
- These must be kept in sync. Either add 2 vessels to `characters.ts` or remove them from LorePage.

### 6.2 Route / Link Mismatches

- `HomePage/index.tsx` links to `/lite-game/title-start` — but `phase.tsx` routes `/lite-game` (not `/lite-game/title-start`) to `LiteGameHome`.
- `codex.tsx` has a stale top comment: `"Inside src/app/router/lite-game.tsx"` — should say `codex.tsx`.

### 6.3 Empty Directories (Intentional Scaffolding)

These are placeholders for future phase-specific components — do not delete:
- `src/web/lite-game/components/`
- `src/web/game-lore/codex/assets/`
- `src/web/game-lore/codex/blobs/`
- `src/shared/ui/`

---

## 7. Import Health

All `@/` alias imports resolve correctly. No circular dependencies detected. Key import patterns:

| Pattern | Status |
|---------|--------|
| `@/app/store/gameSlice` | ✅ All consumers resolve |
| `@/app/hooks` | ✅ Typed hooks available |
| `@/app/config/supabase` | ✅ LITE_GAME_TABLES used consistently |
| `@/web/lite-game/types/*` | ✅ Feature-local types |
| Raw `useSelector`/`useDispatch` | ⚠️ Only in `useGameState.ts` — should use typed hooks |

---

## 8. Summary of Fixes Applied This Session

1. **`store.ts`**: Removed duplicate `gameSlice: gameReducer` mount — only `gameEngine` key remains.
2. **`BrandOpsDashboard.tsx`**: Removed unused `React` import (was the only `tsc` error).
3. **`.github/copilot-instructions.md`**: Full rewrite reflecting state machine, codex domain, data flow rules, known wiring gaps.
