import { createBrowserRouter } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
import { systemNodeIndexRoutes } from '@/app/router/system-node-index';
import { adminRoutes } from '@/app/router/admin';
import { liteGameCodexRoutes } from '@/app/router/lite-game/codex';
import { liteGameLoopRoutes } from '@/app/router/lite-game/loop';

export const createAppRouter = (queryClient: QueryClient) =>
  queryClient;
  createBrowserRouter([
    ...systemNodeIndexRoutes,
    ...adminRoutes,
    ...liteGameCodexRoutes,
    ...liteGameLoopRoutes,
  ]);