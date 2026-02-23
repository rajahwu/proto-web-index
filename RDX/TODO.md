# TODO — Proto Index Lite Game

**Last updated:** 2026-02-22  
**Source:** Copilot Agent audit (Refactor Phase 2)

---

## CRITICAL — Runtime Bugs

- [ ] **Fix LevelPage `addLight`/`addDark` dispatches** — these action types don't exist in `gameSlice.ts`. Replace with `playCard({ lightDelta, darkDelta })`. *(S-02)*
- [ ] **Fix LevelPage `syncProgress` missing field** — dispatches with 2 fields, needs 3 (`currentLevel`). Currently sets `currentLevel` to `undefined`. *(S-02)*

## HIGH — State Machine Wiring

- [ ] **Wire CharacterSelectPage to `selectVessel`** — dispatch Redux action, remove localStorage write, defer Supabase inserts to run boundary. *(S-01)*
- [ ] **Wire DoorChoicePage to `attemptDoor`** — replace `setLevel` import, remove per-action Supabase writes, add phase-watching navigation. *(S-03)*
- [ ] **Wire GameOverPage to read Redux state** — use `state.gameEngine` for final stats, batch Supabase write on mount, remove localStorage reads. *(S-04)*
- [ ] **Add `playerId` to `GameState`** — eliminate all `localStorage.getItem('lite_game_player_id')` calls across 4 files. *(S-09)*
- [ ] **Remove `setLevel` action** — it's legacy; `attemptDoor` handles level increments. Remove export and all imports after DoorChoicePage is wired.

## MEDIUM — Data & Routing Consistency

- [ ] **Sync vessel definitions** — `characters.ts` has 3 vessels, `LorePage` has 5. Create shared `VESSEL_LORE` constant or expand `characters.ts`. *(S-06)*
- [ ] **Add phase-based route guards** — prevent direct navigation to game-over/door-choice without correct phase. *(S-07)*
- [ ] **Fix HomePage link** — links to `/lite-game/title-start` but route is `/lite-game`. *(S-08)*
- [ ] **Add STAGING and CARD_DRAFT phase pages** — currently `level/` serves triple duty. Create dedicated phase directories when gameplay loop is refined.
- [ ] **Consolidate Door.tsx + DoorChoicePage.tsx** — Door.tsx is the correct pattern; DoorChoicePage should delegate to it or be replaced by it.

## LOW — Code Quality

- [ ] **Migrate `useGameState.ts` to typed hooks** — replace raw `useSelector`/`useDispatch` with `useAppSelector`/`useAppDispatch`. *(S-05)*
- [ ] **Fix stale comment in codex.tsx** — line 1 says `"Inside src/app/router/lite-game.tsx"`, should say `codex.tsx`. *(S-10)*
- [ ] **Resolve `queryClient;` lint errors** — in CharacterSelectPage and LevelPage, replace bare expression with `void queryClient;` or rename param to `_queryClient`. *(S-10)*
- [ ] **Replace `any` types** — `Skill.effect_data` and `GameEvent.event_data` in `lite-game.ts`. Define specific interfaces. *(S-11)*
- [ ] **Audit BrandSpecimen.tsx** — determine if it's redundant with `BrandOpsDashboard.tsx` or serves a different purpose. *(S-10)*
- [ ] **Fix DoorChoicePage useEffect deps** — ESLint warns about missing dependency (`fetchLevel`). *(lint)*
- [ ] **Populate empty scaffolding dirs** — `web/lite-game/components/`, `shared/ui/`, `game-lore/codex/assets/` are ready for phase-specific shared components.

## DONE (this session)

- [x] ~~Fix `store.ts` duplicate reducer mount (`gameSlice: gameReducer`)~~
- [x] ~~Remove unused `React` import in `BrandOpsDashboard.tsx`~~
- [x] ~~Update `.github/copilot-instructions.md` for state machine + codex + data flow rules~~
