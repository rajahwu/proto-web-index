# Web Migration Play: tmp/*.html → React (TSX)

This migration play describes a pragmatic, low-risk path to convert remaining `tmp/*.html` prototype pages to React + TypeScript pages (TSX), plus suggestions, checklists, and commands.

## Goals
- Replace `tmp/*.html` prototypes with React pages/components under `src/web/*`.
- Convert inline SVG strings to JSX components and stop using `innerHTML`.
- Move UI logic from imperative DOM manipulation to React hooks and typed Redux/utility hooks where applicable.
- Preserve visual fidelity and reuse shared CSS/assets.

## High-level Play (ordered)
1. Audit: list all `tmp/*.html` files and note unique assets, inline scripts, and CSS. (small, safe PR)
2. Extract: pull shared styles and assets into `src/web/<domain>/` styles or a shared CSS module.
3. Scaffold: create a TSX page file per HTML prototype (e.g. `src/web/lite-game/pages/.../PlayablePrototype.tsx`) that imports the shared CSS.
4. Convert markup: move HTML markup into JSX. Replace `class=` with `className`, attributes to camelCase, and self-close tags where needed.
5. Convert SVGs: create `SvgTemplates.tsx` (or per-domain file) exporting React components for each sigil/icon.
6. Convert logic: port inline scripts into React logic (hooks, state, effects). Replace `onclick`/`addEventListener` with `onClick` handlers.
7. Types: add a `VesselData` (or domain) interface and type props for components. Use `useAppSelector`/`useAppDispatch` if integrating with Redux, or typed handlers otherwise.
8. Routes: register new route(s) in `src/app/router.tsx` (or the domain router module) and keep the same URL paths where useful.
9. Remove legacy: after tests and visual QA, delete the `tmp/*.html` prototypes.
10. QA & CI: run type-check, build, lint, and visual spot-checks in browser.

## Per-file conversion checklist
- Create: `src/web/<domain>/pages/<PageName>/index.tsx` exporting the page component. Keep file names consistent with router imports.
- CSS: import existing `styles.css` initially; plan to move repeated rules to shared CSS later.
- Assets: reference images/SVGs from `public/assets/...` where available; prefer inline JSX-only SVGs for dynamic coloring.
- Behavior: port JS functions into React hooks, e.g. `useSigilDisplay()` or local `useState` with `useEffect` for transitions.
- Accessibility: keep semantic tags (`button`, `nav`, `main`) and add `aria-*` where needed.

## Example migration recipe (one page)
1. Add `src/web/<domain>/pages/MyPage/index.tsx`:

```tsx
import React, { useState } from 'react';
import './styles.css';
import { SvgComponents } from '../SvgTemplates';

export default function MyPage() {
  const [activeId, setActiveId] = useState('seraph');
  const Cmp = SvgComponents[activeId];
  return (
    <div className="page-root">
      <div className="sigil-viewport">{Cmp && <Cmp />}</div>
      <div className="grid">{/* map items, onClick={() => setActiveId(id)} */}</div>
    </div>
  );
}
```

2. Convert any inline `<script>` logic into `useEffect` hooks and event handlers.

## SVG conversion suggestions
- Create a small file `SvgTemplates.tsx` that exports one functional component per SVG and a `Record` map keyed by id.
- Move repetitive `<defs>` ids to unique names (or keep them inside each component). Use React props to parametrize `primaryHue` when needed.

## Routing & integration
- Keep route registration modular. For `lite-game` pages, add route entries in `src/app/router/lite-game/` and compose in `src/app/router.tsx`.
- Preserve any expected `queryClient` or props signatures used by other pages.

## Types & patterns
- Add `src/web/<domain>/types.ts` with interfaces (e.g., `VesselData`).
- Use typed hooks from `src/app/hooks` (`useAppSelector`, `useAppDispatch`).
- Prefer small, focused components (Grid, Header, SigilDisplay, Footer).

## Commands to run locally
```bash
# install
pnpm install

# dev server
pnpm dev

# type-check / build
pnpm build

# lint
pnpm lint
```

## Rollout strategy
- Convert one `tmp` page at a time; open a PR per page to allow visual review.
- Start with least-complex page to validate patterns (SVG conversion, CSS import, routing). Then apply the pattern to remaining pages.

## Risks and mitigations
- Risk: CSS selectors relying on global DOM ordering may break. Mitigation: import styles early and verify layout; consider scoping styles to component once stable.
- Risk: duplicated SVG defs/IDs causing collisions. Mitigation: keep defs contained inside each SVG component or namespace IDs.

## Suggested immediate next actions
1. Run an audit script or a quick grep to list `tmp/*.html` files (e.g. `rg "src/web/.*/tmp/.*\\.html"`).
2. ~~Convert `src/web/lite-game/tmp/SIN_PlayablePrototype_v01.html` next (it's open in editor).~~ **DONE** — see completed migration notes below.
3. Create `SvgTemplates.tsx` per domain and replace `innerHTML` usages.

## Follow-ups
- After initial migrations, schedule a refactor to centralize shared styles and to add Storybook stories for converted components.

---

## Completed: SIN_PlayablePrototype_v01.html → pages/Loop (2026-02-23)

### What was migrated
The full 7-screen playable prototype (`SIN_PlayablePrototype_v01.html`) — Title, Select, Staging, Draft, Level (tap mini-game), Door, Drop — was converted to React + TypeScript components under `src/web/lite-game/pages/Loop/`.

### Files created / rewritten

| File | Role |
|------|------|
| `Loop/types.ts` | `LoopState`, `LoopAction`, `LoopScreen`, `Vessel`, `DraftCard`, `TapCell` types |
| `Loop/data.ts` | Static data: `vessels[]`, `cardPool`, `levelNames`, `levelTypes`, `shuffle()` |
| `Loop/useLoopGame.ts` | `useReducer`-based state machine hook — all game logic lives here |
| `Loop/Layout/index.tsx` | Root layout: mounts `useLoopGame`, renders active phase component |
| `Loop/phases/title.tsx` | Title screen — "Enter" → select |
| `Loop/phases/select.tsx` | Vessel picker with bias bars — "Choose Vessel" → staging |
| `Loop/phases/staging.tsx` | Stats display, Heal / Boost actions — "Descend" → draft |
| `Loop/phases/draft.tsx` | Card draft (2 picks from Surveyor / Smuggler) — "Enter the Depth" → level |
| `Loop/phases/level.tsx` | Tap mini-game with timer, HP bar, depth pips — auto-transitions to door/drop |
| `Loop/phases/door.tsx` | Light / Dark / Secret door selection (gated by parity) — next depth or drop |
| `Loop/phases/drop.tsx` | Run summary, unlocks, "Return to Staging" → reset game |

### Architecture decisions
- **Local `useReducer` hook** (`useLoopGame`) owns all ephemeral run state. This keeps the Loop prototype self-contained and avoids extending the Redux `gameSlice` (which serves the main game engine). The two can be merged later if desired.
- **No `innerHTML`** — all dynamic content is rendered declaratively via props/state.
- **No `useNavigate` / page-level routing** — the Loop uses a single-page screen-swap pattern (driven by `state.screen`), matching the original prototype's `goTo()` behaviour.
- **CSS preserved** — `Loop/style.css` is the migrated CSS from the HTML prototype, imported once in `Layout/index.tsx`.

### What's left for this page
- [ ] Wire `LoopLayout` into the app router (`src/app/router.tsx`) at e.g. `/loop` or `/lite-game/loop`.
- [ ] Delete `src/web/lite-game/tmp/SIN_PlayablePrototype_v01.html` once QA confirms parity.
- [ ] (Optional) Connect end-of-run stats to Supabase via a batched write in the Drop phase.

---
Generated on: 2026-02-23
