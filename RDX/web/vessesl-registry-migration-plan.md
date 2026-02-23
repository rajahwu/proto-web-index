**VesselRegistry Migration Playbook**

Overview
- Purpose: convert remaining prototype HTML pages (tmp/*.html) to React + TypeScript (TSX), finish cleanup of legacy SVG string assets, and ensure the Registry is fully integrated and type-checked.

Assumptions
- Project uses React + TypeScript. Dev commands: `pnpm dev`, `pnpm build`, `pnpm lint`.
- `SvgTemplates.tsx` and `SigilDisplayArea` JSX rendering exist and are the canonical SVG source.

Goals
- Replace all `tmp/*.html` prototype pages with componentized TSX pages under `src/web/*`.
- Remove duplicate string-based SVGs (`data.ts`, `data.tsx`) and rely on `SvgTemplates.tsx` or `public/assets` SVG files.
- Add types, wire router, type-check and run visual QA.

Play Steps (ordered)
1. Audit
   - Locate remaining static HTML pages: `src/web/admin/pages/**/tmp/*.html` (or any `*.html` under feature folders). Record each file and note assets/styles/scripts used inline.

2. Prepare shared assets
   - Ensure `SvgTemplates.tsx` (in `src/web/admin/pages/VesselRegistry/`) contains canonical JSX sigils.
   - Move large reusable SVGs to `public/assets/vessel/sigal/` if they are used independently; import them as `<img src="/assets/...svg"/>` when appropriate.

3. Create TSX pages
   - For each `tmp/page.html`: create `src/web/<domain>/pages/<page>/index.tsx` exporting a React component default.
   - Preserve CSS: prefer importing existing `styles.css` into the page directory (e.g., `import './styles.css'`) and move inline style blocks into that CSS file if needed.
   - Convert inline scripts to React logic/hooks. Example mapping:
     - onclick/select handlers -> props/state with `useState` and callbacks
     - DOM injection (innerHTML) -> JSX render or component mapping (we already switched sigils to `SvgTemplates`)

4. Reuse and type data
   - Replace inline JS data objects with typed exports under `src/web/<domain>/data.ts` or a shared `src/web/admin/pages/VesselRegistry/types.ts`.
   - Create a `VesselData` interface and apply it to `vesselData` exported from `Grid/Cell.tsx`.

5. Router wiring
   - Add route entries for each new page in `src/app/router` sub-route modules. Follow existing patterns (each sub-route exports `RouteObject[]`).
   - Keep `queryClient` signatures when present for future data-loader integration.

6. Cleanup
   - Remove `src/web/admin/pages/VesselRegistry/data.ts` and `data.tsx` once no imports remain.
   - Remove any other `dangerouslySetInnerHTML` uses and string-SVG usages.

7. Build & verify
   - Run type-check and build, fix any TS/ESLint errors.
   - Start dev server and perform visual QA.

Commands
```bash
pnpm install
pnpm build      # type-check + build
pnpm dev        # run locally and visually verify
pnpm lint       # optional lint pass
```

PR / QA Checklist
- All legacy `*.html` moved or removed and replaced by `index.tsx` components.
- No remaining string-SVG injections; `SvgTemplates.tsx` is canonical for the registry.
- Types added for exported data structures (`VesselData`, `VesselCellData`).
- Router updated and manual navigation to pages works in dev server.
- Run `pnpm build` with zero critical errors; fix warnings as needed.

Migration tips & suggestions
- Keep visual parity: import existing `styles.css` into new TSX pages first, then refactor CSS incrementally.
- For complex inline JS (timers, animations), extract to small hooks under `src/web/admin/pages/VesselRegistry/hooks/`.
- If an SVG is performance-critical or reused across pages, prefer file-based SVGs in `public/assets` and import as `<img>` or inline via an `Svg` React wrapper that loads via fetch only when needed.
- Use typed Redux hooks if the page interacts with game state; otherwise keep local `useState`/`useEffect` until integration.

Rollback plan
- If migration causes regressions, restore the original `.html` from Git history and open a focused PR that migrates one page at a time.

Estimated effort
- Audit: 0.5–1h
- Each page conversion: 0.5–2h depending on complexity (styles/scripts)
- Router + types + cleanup + QA: 1–3h

Where I can help next
- I can remove the legacy `data.ts`/`data.tsx` safely and add `VesselData` types. Run `pnpm build` and fix any TypeScript errors. Convert a first `tmp/*.html` as an example.

---
Generated: 2026-02-23
