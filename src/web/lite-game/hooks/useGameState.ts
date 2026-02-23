// src/web/lite-game/hooks/useGameState.ts
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '@/app/store/store';
import { attemptDoor, playCard } from '@/app/store/gameSlice';

export function useGameState() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.gameEngine);

  return {
    ...state,
    tryDoor: (type: 'LIGHT' | 'DARK' | 'SECRET', cost: number) => 
      dispatch(attemptDoor({ doorType: type.toLowerCase() as "light" | "dark" | "secret", cost })),
    draftCard: (light: number, dark: number) => 
      dispatch(playCard({ lightDelta: light, darkDelta: dark }))
  };
}