// gameSlice.ts
const gameSlice = createSlice({
  name: 'game',
  initialState: {
    currentLight: 0,
    currentDark: 0,
    currentLevel: 1,
    selectedDoor: null,
    drawnCards: [],
    diceRoll: null,
  },
  reducers: {
    addLight: (state, action) => {
      state.currentLight += action.payload;
    },
    addDark: (state, action) => {
      state.currentDark += action.payload;
    },
    selectDoor: (state, action) => {
      state.selectedDoor = action.payload; // 'light', 'dark', 'secret'
    },
    drawCard: (state, action) => {
      state.drawnCards.push(action.payload);
    },
    rollDice: (state) => {
      state.diceRoll = Math.floor(Math.random() * 6) + 1;
    },
  },
});
