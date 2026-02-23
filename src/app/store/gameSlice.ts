import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// 1. Define the specific Phases to match your new routing folders
export type GamePhase = 
  | 'TITLE' 
  | 'CHARACTER_SELECT' 
  | 'STAGING' 
  | 'CARD_DRAFT'
  | 'LEVEL_PLAY' 
  | 'DOOR_CHOICE'
  | 'DUDAEL_DROP'
  | 'GAME_OVER';

export interface GameState {
  phase: GamePhase;
  vessel: string | null; // e.g., 'The Rebel'
  currentLight: number;
  currentDark: number;
  currentLevel: number;
  selectedDoor: "light" | "dark" | "secret" | null;
}

const initialState: GameState = {
  phase: 'TITLE',
  vessel: null,
  currentLight: 0,
  currentDark: 0,
  currentLevel: 1,
  selectedDoor: null,
};

const gameSlice = createSlice({
  name: "gameEngine",
  initialState,
  reducers: {
    // --- STATE MACHINE TRANSITIONS --- //

    initiateSequence: (state) => {
      state.phase = 'CHARACTER_SELECT';
    },

    setLevel: (state, action: PayloadAction<number>) => {
      state.currentLevel = action.payload;
    },

    selectVessel: (state, action: PayloadAction<{ vesselId: string; light: number; dark: number }>) => {
      state.vessel = action.payload.vesselId;
      state.currentLight = action.payload.light;
      state.currentDark = action.payload.dark;
      state.phase = 'STAGING';
    },

    // Used to move between phases manually if needed
    setPhase: (state, action: PayloadAction<GamePhase>) => {
      state.phase = action.payload;
    },

    // --- GAMEPLAY MATH & LOGIC --- //

    playCard: (state, action: PayloadAction<{ lightDelta: number; darkDelta: number }>) => {
      state.currentLight += action.payload.lightDelta;
      state.currentDark += action.payload.darkDelta;
    },

    // The Engine handles the door math so the UI doesn't have to
    attemptDoor: (state, action: PayloadAction<{ doorType: "light" | "dark" | "secret"; cost: number }>) => {
      const { doorType, cost } = action.payload;
      state.selectedDoor = doorType;
      
      // Basic math check logic (You can expand the secret door logic later)
      if (doorType === "light" && state.currentLight >= cost) {
        state.currentLight -= cost;
        state.currentLevel += 1;
        state.phase = 'STAGING'; // Loop successfully continues
      } 
      else if (doorType === "dark" && state.currentDark >= cost) {
        state.currentDark -= cost;
        state.currentLevel += 1;
        state.phase = 'STAGING';
      }
      else {
        // Failed the math check: drop them into the penalty pit
        state.phase = 'DUDAEL_DROP';
      }
    },

    // --- UTILITY --- //

    syncProgress: (
      state,
      action: PayloadAction<{ currentLight: number; currentDark: number; currentLevel: number }>
    ) => {
      state.currentLight = action.payload.currentLight;
      state.currentDark = action.payload.currentDark;
      state.currentLevel = action.payload.currentLevel;
    },

    terminateRun: (state) => {
      state.phase = 'GAME_OVER';
    },

    resetGame: () => initialState,
  },
});

export const { 
  initiateSequence, 
  setLevel,
  selectVessel, 
  setPhase,
  playCard, 
  attemptDoor, 
  syncProgress, 
  terminateRun, 
  resetGame 
} = gameSlice.actions;

export default gameSlice.reducer;