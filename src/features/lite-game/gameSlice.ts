import { createSlice } from "@reduxjs/toolkit";


// gameSlice.ts
const gameSlice = createSlice({
  name: "game",
  initialState: {
    currentLight: 0,
    currentDark: 0,
    currentLevel: 1,
    selectedDoor: null,
    drawnCards: [],
    diceRoll: null,
  },
  reducers: {
    name: "game",
    initialState: {
      currentLight: 0,
      currentDark: 0,
      currentLevel: 1,
      selectedDoor: null,
      drawnCards: [],
      diceRoll: null,
    },
    reducers: {
      addLight: (state: any, action: any) => {
        state.currentLight += action.payload;
      },
      addDark: (state: any, action: any) => {
        state.currentDark += action.payload;
      },
      selectDoor: (state: any, action: any) => {
        state.selectedDoor = action.payload; // 'light', 'dark', 'secret'
      },
      drawCard: (state: any, action: any) => {
        state.drawnCards.push(action.payload);
      },
      rollDice: (state: any ) => {
        state.diceRoll = Math.floor(Math.random() * 6) + 1;
      },
    },
  },
});

export const { addLight, addDark, selectDoor, drawCard, rollDice } =
  gameSlice.actions;

export default gameSlice.reducer;
