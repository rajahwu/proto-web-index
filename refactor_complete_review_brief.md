# Refactor Complete — Review Brief

> **Date:** 2026-02-22
> **Scope:** Migrate from flat `src/app/` + `src/features/` structure to layered `src/app/{dir}` + `src/web/{domain}` structure.

---

## What was done

### 1. Directory restructure (app layer)

| Before | After |
|---|---|
| `src/app/config.ts` | `src/app/config/config.ts` |
| `src/app/supabase.ts` | `src/app/config/supabase.ts` |
| `src/app/store.ts` | `src/app/store/store.ts` |
| `src/features/lite-game/gameSlice.ts` | `src/app/store/gameSlice.ts` |
| `src/app/hooks/index.ts` | `src/app/hooks/index.ts` (imports updated) |

### 2. Directory restructure (web/feature layer)

| Before | After |
|---|---|
| `src/features/index/*` | `src/web/index/*` |
| `src/features/admin/*` | `src/web/admin/*` |
| `src/features/lite-game/*` | `src/web/lite-game/*` |
| `src/types/lite-game.ts` | `src/web/lite-game/types/lite-game.ts` |

### 3. Router decomposition

The monolithic `src/app/router.tsx` now composes from sub-route modules:

- `src/app/router/system-node-index.tsx` → exports `systemNodeIndexRoutes: RouteObject[]`
- `src/app/router/admin.tsx` → exports `adminRoutes: RouteObject[]`
- `src/app/router/lite-game.tsx` → exports `liteGameRoutes(queryClient): RouteObject[]`

All spread into `createBrowserRouter()` in `src/app/router.tsx`.

### 4. Import fixes

- All `@/features/` imports → `@/web/` equivalents
- All `@/app/supabase` → `@/app/config/supabase`
- All `@/app/store` → `@/app/store/store` or `@/app/store/gameSlice`
- Relative `../../../app/` paths in `GameOverPage.tsx` → `@/` alias imports
- `DoorChoicePage` DoorCard import → `@/web/lite-game/components/door-choice/DoorCard`
- `@/types/lite-game` → `@/web/lite-game/types/lite-game`

### 5. Stale files removed

- `src/App.tsx` — Vite boilerplate, unused
- `src/App.css` — Vite boilerplate, unused
- `src/types/lite-game.ts` — moved to `src/web/lite-game/types/`
- `src/app/archrive/` — old router draft
- `archrive/` (root) — old router draft

### 6. Bonus fixes (pre-existing TS errors)

- `gameSlice.ts`: `PayloadAction` → `type PayloadAction` (verbatimModuleSyntax)
- `IndexPage.tsx`: removed unused `ThemeProvider` import
- `Button.tsx` / `Header.tsx` (stories): removed unused `React` imports

### 7. Build status

- **`tsc -b --noEmit`: PASS** — zero type errors
- **`pnpm lint`: 5 pre-existing warnings/errors** (not introduced by refactor):
  - `queryClient;` expression in two pages (placeholder for future loader use)
  - `buttonVariants` export in shadcn button (react-refresh warning)
  - `Record<string, any>` in game types (2 instances)
  - `fetchLevel` missing from useEffect deps (pre-existing)

---

## Final directory tree (src/)

```
src/
├── main.tsx                          # Entry point (providers + router)
├── index.css                         # Global styles + Tailwind + Shadcn theme
├── test-db.ts                        # CLI Supabase connection tester
├── app/
│   ├── router.tsx                    # Composes sub-route modules
│   ├── config/
│   │   ├── config.ts                # Env validation
│   │   └── supabase.ts              # Supabase client + LITE_GAME_TABLES
│   ├── store/
│   │   ├── store.ts                 # Redux store (RootState, AppDispatch)
│   │   └── gameSlice.ts             # Game client state (light/dark/level)
│   ├── hooks/
│   │   └── index.ts                 # useAppDispatch, useAppSelector
│   └── router/
│       ├── system-node-index.tsx     # "/" route
│       ├── admin.tsx                 # "/admin/*" routes
│       └── lite-game.tsx            # "/lite-game/*" routes
├── web/
│   ├── index/
│   │   ├── IndexPage.tsx
│   │   └── index.loader.ts
│   ├── admin/
│   │   ├── BrandDashboardPage.tsx
│   │   └── useBrandtokens.ts
│   └── lite-game/
│       ├── pages/                    # Full page components
│       │   ├── LiteGameHome.tsx
│       │   ├── CharacterSelectPage.tsx
│       │   ├── DoorChoicePage.tsx
│       │   └── GameOverPage.tsx
│       ├── level/                    # Level feature (page + components)
│       │   ├── LevelPage.tsx
│       │   ├── LevelHeader.tsx
│       │   └── CardDisplay.tsx
│       ├── components/               # Reusable feature components
│       │   └── door-choice/
│       │       ├── DoorCard.tsx
│       │       └── Door.tsx
│       ├── hooks/
│       │   └── useGameState.ts
│       └── types/
│           ├── characters.ts
│           └── lite-game.ts
├── components/ui/                    # Shadcn primitives
├── lib/                              # Shared utilities (cn, etc.)
├── shared/                           # Shared UI (empty, available)
└── stories/                          # Storybook stories
```

---

## TODOs and suggestions for next steps

### High priority
- [ ] **Fix `useGameState.ts`** — queries bare `'players'` table; should use `LITE_GAME_TABLES.PLAYERS`
- [ ] **Fix `useBrandtokens.ts`** — queries bare `'colors'`/`'typography'` tables; should use proper prefixed constants or a `BRAND_TABLES` equivalent
- [ ] **Wire `queryClient` into route loaders** — `CharacterSelectPage` and `LevelPage` accept `queryClient` but don't use it; implement React Router data loaders for prefetching

### Medium priority
- [ ] **Consolidate `Door.tsx` and `DoorChoicePage.tsx`** — `Door.tsx` in `components/door-choice/` reimplements similar logic to `DoorChoicePage.tsx`; clarify which is the canonical door-choice view
- [ ] **Clean empty directories** — `web/lite-game/home/`, `web/lite-game/title-start/`, `web/lite-game/game-over/`, `web/lite-game/components/character-select/` are empty placeholders
- [ ] **Move level components into `components/`** — `LevelHeader.tsx` and `CardDisplay.tsx` sit alongside `LevelPage.tsx` in `level/`; consider `web/lite-game/components/level/` for consistency with door-choice pattern
- [ ] **Add barrel exports** — `web/lite-game/types/index.ts`, `web/lite-game/hooks/index.ts` for cleaner import paths

### Low priority / housekeeping
- [ ] **Fix pre-existing lint errors** — replace `queryClient;` no-op expressions with `void queryClient` or `_queryClient` parameter name; replace `Record<string, any>` with explicit types
- [ ] **Consider nested routes** — lite-game pages could share a layout wrapper via React Router nested `<Outlet>` instead of each page independently rendering full-page chrome
- [ ] **Add `src/shared/types/`** — for types used across web domains (currently none, but good to have the convention ready)
- [ ] **Story coverage** — existing stories only cover generic Storybook boilerplate; add stories for `DoorCard`, `LevelHeader`, `CardDisplay`
