// Loop prototype – local types (self-contained, not tied to Redux gameSlice)

export type LoopScreen =
  | 'title'
  | 'select'
  | 'staging'
  | 'draft'
  | 'level'
  | 'door'
  | 'drop';

export interface Vessel {
  id: string;
  name: string;
  desc: string;
  perk: string;
  icon: string;
  color: string;
  lightBias: number;
  darkBias: number;
  startLight: number;
  startDark: number;
  levelBonus: 'light' | 'dark' | 'choice' | 'heal' | 'points';
}

export interface DraftCard {
  name: string;
  effect: string;
  light: number;
  dark: number;
  heal?: number;
  points?: number;
}

export interface LoopState {
  screen: LoopScreen;
  vessel: Vessel | null;
  health: number;
  maxHealth: number;
  light: number;
  dark: number;
  points: number;
  depth: number;
  maxDepth: number;
  hand: DraftCard[];
  currency: number;
  runs: number;
  // Draft sub-state
  draftPool: { light: DraftCard[]; dark: DraftCard[] };
  draftPicked: number;
  draftMax: number;
  // Level sub-state
  levelTimeLeft: number;
  levelActive: boolean;
  tapGrid: TapCell[];
  litCellIndex: number;
  tapsHit: number;
  tapsNeeded: number;
}

export interface TapCell {
  state: 'empty' | 'lit' | 'dark-lit' | 'hit' | 'miss';
  type: 'light' | 'dark' | null;
}

// --- Actions ---

export type LoopAction =
  | { type: 'GO_TO'; screen: LoopScreen }
  | { type: 'PICK_VESSEL'; vessel: Vessel }
  | { type: 'CONFIRM_VESSEL' }
  | { type: 'HEAL_ACTION' }
  | { type: 'BOOST_ACTION' }
  | { type: 'INIT_DRAFT'; lightCards: DraftCard[]; darkCards: DraftCard[] }
  | { type: 'PICK_CARD'; pool: 'light' | 'dark'; index: number }
  | { type: 'START_LEVEL' }
  | { type: 'LIGHT_RANDOM'; cellIndex: number; cellType: 'light' | 'dark' }
  | { type: 'TAP_CELL'; index: number }
  | { type: 'TIMER_TICK' }
  | { type: 'LEVEL_END'; reason: 'complete' | 'timeout' | 'dead' }
  | { type: 'APPLY_VESSEL_BONUS' }
  | { type: 'CHOOSE_DOOR'; doorType: 'light' | 'dark' | 'secret' }
  | { type: 'RESET_GAME' }
  | { type: 'CLEAR_CELL'; index: number };
