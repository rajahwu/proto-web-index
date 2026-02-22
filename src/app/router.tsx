import { createBrowserRouter } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
import CharacterSelectPage from '../features/lite-game/character-select/CharacterSelectPage';
import LevelPage from '../features/lite-game/level/LevelPage';
import DoorChoicePage from '../features/lite-game/door-choice/DoorChoicePage';
import GameOverPage from '../features/lite-game/game-over/GameOverPage';

export const createAppRouter = (queryClient: QueryClient) => createBrowserRouter([
  {
    path: '/',
    element: <div>Home (placeholder)</div>,
  },
  {
    path: '/lite-game',
    element: <div>Lite Game Home (placeholder)</div>,
  },
  {
    path: '/lite-game/character-select',
    element: <CharacterSelectPage queryClient={queryClient} />,
  },
  {
    path: '/lite-game/level/:levelId',
    element: <LevelPage queryClient={queryClient} />,
  },
  {
    path: '/lite-game/door-choice',
    element: <DoorChoicePage queryClient={queryClient} />,
  },
  {
    path: '/lite-game/game-over',
    element: <GameOverPage />,
  },
]);