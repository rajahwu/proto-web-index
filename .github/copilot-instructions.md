# Copilot Instructions for proto-index-lite-game

## Big picture
- Vite 7 + React 19 prototype: Supabase-backed "lite game" (Fallen Angels theme) + admin brand-ops dashboard + game-lore codex.
- **`src/app/`** owns app wiring: `main.tsx`, `router.tsx`, `config/`, `store/`, `hooks/`.
- **`src/web/`** owns feature UI grouped by domain: `web/lite-game/`, `web/admin/`, `web/index/`, `web/game-lore/`.
- State ownership:
  - **Redux Toolkit** (`src/app/store/gameSlice.ts`) — owns **all ephemeral run state** (phase, vessel, light/dark, level, door). This is the game engine.
  - **React Query** — for remote/server data (brand tokens, admin dashboard reads).
  - **Supabase** — persistent storage. Only pinged at **end-of-run** (game over) to persist final stats + events.
  - **localStorage** — **legacy pattern being removed**. New code must NOT use `localStorage` for player id or run state. Redux is the single source of truth during a run.

## Game engine — State Machine (`gameSlice.ts`)
- Slice name: `"gameEngine"` → mounted at `state.gameEngine` in the Redux store.
- Defines `GamePhase` type with 8 phases that map 1:1 to routing folders under `web/lite-game/pages/phases/`:
  ```
  TITLE → CHARACTER_SELECT → STAGING → CARD_DRAFT → LEVEL_PLAY → DOOR_CHOICE → DUDAEL_DROP → GAME_OVER
  ```
- Key actions and their transitions:
  - `initiateSequence` — TITLE → CHARACTER_SELECT
  - `selectVessel({ vesselId, light, dark })` — CHARACTER_SELECT → STAGING
  - `setPhase(phase)` — manual override for routing guards
  - `playCard({ lightDelta, darkDelta })` — light/dark math during CARD_DRAFT / LEVEL_PLAY
  - `attemptDoor({ doorType, cost })` — door math; success → STAGING (next level), failure → DUDAEL_DROP
  - `syncProgress({ currentLight, currentDark, currentLevel })` — hydrate from external source (3 fields required)
  - `terminateRun` — → GAME_OVER
  - `resetGame` — → initialState (TITLE)
- **Reference implementation** for wired components: `Door.tsx` (uses `useGameState` + `attemptDoor`).

## Architecture and data flow
- Entry point (`src/main.tsx`) creates one `QueryClient` and passes it into `createAppRouter(queryClient)`.
- Routes are composed in `src/app/router.tsx` from sub-route modules:
  - `src/app/router/system-node-index.tsx` — `/` index page
  - `src/app/router/admin.tsx` — `/admin/*` brand-ops dashboard
  - `src/app/router/lite-game/phase.tsx` — `/lite-game/*` game phase routes (factory taking `queryClient`)
  - `src/app/router/lite-game/codex.tsx` — `/codex/*` lore pages
- Phase page directories under `src/web/lite-game/pages/phases/` map to `GamePhase`:
  - `title-start/` → TITLE
  - `character-select/` → CHARACTER_SELECT
  - `level/` → LEVEL_PLAY (also serves STAGING / CARD_DRAFT in current prototype)
  - `door-choice/` → DOOR_CHOICE
  - `game-over/` → GAME_OVER
- **Empty phase dirs** (e.g., `title-start/`, `game-over/` sub-components) are intentional scaffolding — wire them to Redux phases, do NOT delete.
- Game lore domain: `src/web/game-lore/` — codex pages (HomePage, IndexPage, LorePage) with vessel lore.

## `useGameState` hook
- Located at `src/web/lite-game/hooks/useGameState.ts`.
- Wraps Redux selectors + dispatch helpers: `tryDoor()`, `draftCard()`.
- **Known issue**: currently uses raw `useSelector`/`useDispatch` — should be migrated to typed `useAppSelector`/`useAppDispatch` from `src/app/hooks/`.

## Supabase conventions (important)
- Use table constants from `src/app/config/supabase.ts` via `LITE_GAME_TABLES` — never hardcode table names.
- Canonical table names are prefixed (`lite_game___*`), matching `db/sql/create_lite_game_tables.sql`.
- Env vars required and validated at startup (`assertConfig()` in `src/app/config/config.ts`):
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- Keep `.env.example` in sync when adding/changing env vars.
- **Data flow rule**: during an active run, all game state lives in Redux. Supabase writes should be batched at run boundaries (character creation start, game over end), not per-action.

## Commands and workflows
- Install: `pnpm install`
- Dev server: `pnpm dev`
- Type-check + build: `pnpm build`
- Lint: `pnpm lint`
- Storybook: `pnpm storybook` (dev), `pnpm build-storybook` (static)
- Storybook/Vitest: `pnpm vitest --project storybook` (configured in `vite.config.ts` + `.storybook/vitest.setup.ts`).

## Code patterns to follow
- Prefer `@/` path alias imports (configured in `tsconfig.app.json` and `vite.config.ts`).
- Use typed Redux hooks from `src/app/hooks/` (`useAppDispatch`, `useAppSelector`) — never raw `useDispatch`/`useSelector`.
- Interact with game state via `useGameState` hook or direct dispatch of `gameSlice` actions — never mutate `state.gameEngine` outside reducers.
- Reuse existing Shadcn UI primitives (`src/components/ui/button.tsx`) before adding ad-hoc elements.
- Feature boundaries: game logic under `src/web/lite-game/`; lore under `src/web/game-lore/`; shared utilities under `src/lib` or `src/shared`.
- Route modules: each domain exports a `RouteObject[]` from `src/app/router/{domain}.tsx` — composed in `src/app/router.tsx`.
- Game types live in `src/web/lite-game/types/` (feature-local); shared types go in `src/shared/`.

## Known prototype inconsistencies (wiring gaps)
- **CharacterSelectPage** — still writes to `localStorage` and hits Supabase immediately. Should dispatch `selectVessel` and defer persistence.
- **LevelPage** — dispatches non-existent `gameEngine/addLight` and `gameEngine/addDark`. Should use `playCard`. Also calls `syncProgress` with only 2 fields (missing `currentLevel`).
- **DoorChoicePage** — uses old `setLevel` action and writes to Supabase per-action. Should use `attemptDoor` (see `Door.tsx` reference).
- **GameOverPage** — reads from `localStorage` + Supabase for final stats. Should read from Redux `state.gameEngine` and batch Supabase write.
- **useGameState.ts** — uses raw `useSelector`/`useDispatch` instead of typed hooks.
- **characters.ts** — defines 3 vessels (Seraph, Shadow, Exile). LorePage references 5 (adds The Penitent, The Rebel). Keep in sync.
- `CharacterSelectPage` and `LevelPage` receive `queryClient` prop but don't use it yet — keep this signature for future data-loader integration.
