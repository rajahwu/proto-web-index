import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  currentLight: number;
  currentDark: number;
  currentLevel: number;
  selectedDoor: "light" | "dark" | "secret" | null;
}

const initialState: GameState = {
  currentLight: 0,
  currentDark: 0,
  currentLevel: 1,
  selectedDoor: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addLight: (state, action: PayloadAction<number>) => {
      state.currentLight += action.payload;
    },
    addDark: (state, action: PayloadAction<number>) => {
      state.currentDark += action.payload;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.currentLevel = action.payload;
    },
    selectDoor: (state, action: PayloadAction<"light" | "dark" | "secret">) => {
      state.selectedDoor = action.payload;
    },
    syncProgress: (
      state,
      action: PayloadAction<{ currentLight: number; currentDark: number }>,
    ) => {
      state.currentLight = action.payload.currentLight;
      state.currentDark = action.payload.currentDark;
    },
    resetGame: () => initialState,
  },
});

export const { addLight, addDark, setLevel, selectDoor, syncProgress, resetGame } =
  gameSlice.actions;
export default gameSlice.reducer;
