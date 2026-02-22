import { createBrowserRouter } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
import { systemNodeIndexRoutes } from '@/app/router/system-node-index';
import { adminRoutes } from '@/app/router/admin';
import { liteGameRoutes } from '@/app/router/lite-game';

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    ...systemNodeIndexRoutes,
    ...adminRoutes,
    ...liteGameRoutes(queryClient),
  ]);