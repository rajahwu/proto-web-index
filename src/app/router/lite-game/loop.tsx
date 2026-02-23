import type { RouteObject } from 'react-router';
import LoopLayout from '@/web/lite-game/pages/game-loop/Layout';

export const liteGameLoopRoutes: RouteObject[] = [
  {
    path: '/lite-game/run-loop',
    Component: LoopLayout,
  },
];
