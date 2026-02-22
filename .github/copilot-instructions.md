# Copilot Instructions for proto-index-lite-game

## Big picture
- Vite + React 19 prototype: Supabase-backed "lite game" flow + admin token dashboard.
- **`src/app/`** owns app wiring: `main.tsx`, `router.tsx`, `config/`, `store/`, `hooks/`.
- **`src/web/`** owns feature UI grouped by domain: `web/lite-game/`, `web/admin/`, `web/index/`.
- State ownership: React Query for remote/server data, Redux Toolkit for client gameplay/UI state (`src/app/store/gameSlice.ts`).

## Architecture and data flow
- Entry point (`src/main.tsx`) creates one `QueryClient` and passes it into `createAppRouter(queryClient)`.
- Routes are composed in `src/app/router.tsx` from sub-route modules in `src/app/router/` (`system-node-index.tsx`, `admin.tsx`, `lite-game.tsx`). Each exports a `RouteObject[]` array (or factory).
- Lite game runtime flow:
  1. Character creation writes player + stats + progress rows in Supabase (`web/lite-game/pages/CharacterSelectPage.tsx`).
  2. Player id persisted in `localStorage` key `lite_game_player_id`.
  3. Level page reads level/progress, draws cards, updates progress, logs events (`web/lite-game/level/LevelPage.tsx`).
  4. Door choice advances level and logs completion (`web/lite-game/pages/DoorChoicePage.tsx`).
  5. Game over reads final stats and resets local state (`web/lite-game/pages/GameOverPage.tsx`).

## Supabase conventions (important)
- Use table constants from `src/app/config/supabase.ts` via `LITE_GAME_TABLES` — never hardcode table names.
- Canonical table names are prefixed (`lite_game___*`), matching `db/sql/create_lite_game_tables.sql`.
- Env vars required and validated at startup (`assertConfig()` in `src/app/config/config.ts`):
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- Keep `.env.example` in sync when adding/changing env vars.

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
- Reuse existing Shadcn UI primitives (`src/components/ui/button.tsx`) before adding ad-hoc elements.
- Feature boundaries: game logic under `src/web/lite-game/`; shared utilities under `src/lib` or `src/shared`.
- Route modules: each domain exports a `RouteObject[]` from `src/app/router/{domain}.tsx` — composed in `src/app/router.tsx`.
- Game types live in `src/web/lite-game/types/` (feature-local); shared types go in `src/shared/`.

## Known prototype inconsistencies
- `useGameState.ts` queries bare `'players'` table and admin hooks query `'colors'`/`'typography'` (non-prefixed). New work should use `LITE_GAME_TABLES` constants.
- `CharacterSelectPage` and `LevelPage` receive `queryClient` prop but don't use it yet — keep this signature for future data-loader integration.
