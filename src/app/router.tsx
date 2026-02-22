import { createBrowserRouter } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
import CharacterSelectPage from '../features/lite-game/character-select/CharacterSelectPage';
import LevelPage from '../features/lite-game/level/LevelPage';

export const createAppRouter = (queryClient: QueryClient) => createBrowserRouter([
  {
    path: '/',
    element: <div>Home (placeholder)</div>,
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
    element: <div>Door Choice (next step)</div>,
  },
]);