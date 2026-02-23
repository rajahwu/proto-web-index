import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "@/app/store/gameSlice";


export const store = configureStore({
  reducer: {
    gameEngine: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
