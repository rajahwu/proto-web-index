# Proto Index Lite Game

A Supabase-backed prototype for the **Fallen Angels** lite game, admin brand-ops dashboard, and game-lore codex — built on a bleeding-edge React stack.

## Tech Stack

- **Framework:** React 19 + Vite 7 + SWC
- **Routing:** React Router 7 (composable sub-route modules)
- **Server State:** React Query v5
- **Client State:** Redux Toolkit — game engine state machine (`gameSlice.ts`)
- **Styling:** Tailwind CSS 4 + Shadcn UI
- **Backend/BaaS:** Supabase (tables prefixed `lite_game___*`)
- **Custom Packages:** `@clearline7` ecosystem
- **Testing & Docs:** Storybook 10, Vitest, Playwright, TypeDoc

## Architecture

```text
src/
├── app/                          # App wiring
│   ├── config/                   #   config.ts, supabase.ts (env validation + table constants)
│   ├── store/                    #   store.ts, gameSlice.ts (Redux state machine)
│   ├── hooks/                    #   useAppDispatch, useAppSelector (typed Redux hooks)
│   ├── router/                   #   Composable sub-route modules
│   │   ├── system-node-index.tsx #     / index route
│   │   ├── admin.tsx             #     /admin/* brand-ops routes
│   │   └── lite-game/
│   │       ├── phase.tsx         #     /lite-game/* game phase routes
│   │       └── codex.tsx         #     /codex/* lore routes
│   ├── router.tsx                #   Root router composition
│   └── main.tsx                  #   Entry point
├── web/                          # Feature UI grouped by domain
│   ├── lite-game/
│   │   ├── hooks/                #   useGameState (Redux convenience wrapper)
│   │   ├── types/                #   lite-game.ts, characters.ts
│   │   ├── components/           #   (scaffolding)
│   │   └── pages/
│   │       ├── HomePage/         #   V-00 hub page
│   │       └── phases/           #   One dir per GamePhase
│   │           ├── title-start/
│   │           ├── character-select/
│   │           ├── level/
│   │           ├── door-choice/
│   │           └── game-over/
│   ├── game-lore/                #   Codex pages (vessel lore)
│   ├── admin/                    #   Brand-ops dashboard + sprint tracker
│   └── index/                    #   System node index page
├── components/ui/                # Shadcn UI primitives
├── lib/                          # Shared utilities
└── shared/                       # Shared UI (scaffolding)
```

## Game Engine — State Machine

The core game loop is driven by a Redux slice (`src/app/store/gameSlice.ts`) mounted at `state.gameEngine`. It defines 8 phases:

```
TITLE → CHARACTER_SELECT → STAGING → CARD_DRAFT → LEVEL_PLAY → DOOR_CHOICE → DUDAEL_DROP → GAME_OVER
```

Key actions: `initiateSequence`, `selectVessel`, `playCard`, `attemptDoor`, `syncProgress`, `terminateRun`, `resetGame`.

**State ownership rules:**
- **Redux** owns all ephemeral run state (phase, vessel, light/dark, level, door).
- **React Query** handles server reads (brand tokens, admin data).
- **Supabase** is only written to at run boundaries (character creation, game over) — not per-action.
- **localStorage** is a legacy pattern being removed. New code must not use it.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server
pnpm build            # Type-check + production build
pnpm lint             # ESLint
pnpm storybook        # Storybook dev server
pnpm build-storybook  # Static Storybook build
```

## Environment Variables

Required in `.env` (see `.env.example`):

```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=<your-anon-key>
```

Validated at startup by `assertConfig()` in `src/app/config/config.ts`.