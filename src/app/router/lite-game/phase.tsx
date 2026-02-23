import type { RouteObject } from 'react-router';
import type { QueryClient } from '@tanstack/react-query';
import LiteGameHome from '@/web/lite-game/pages/phases/title-start/LiteGameHome';
import CharacterSelectPage from '@/web/lite-game/pages/phases/character-select/CharacterSelectPage';
import LevelPage from '@/web/lite-game/pages/phases/level/LevelPage';
import DoorChoicePage from '@/web/lite-game/pages/phases/door-choice/DoorChoicePage';
import GameOverPage from '@/web/lite-game/pages/phases/game-over/GameOverPage';

export const liteGamePhaseRoutes = (queryClient: QueryClient): RouteObject[] => [
  {
    path: '/lite-game',
    element: <LiteGameHome />,
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
    element: <DoorChoicePage />,
  },
  {
    path: '/lite-game/game-over',
    element: <GameOverPage />,
  },
];