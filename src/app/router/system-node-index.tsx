import type { RouteObject } from 'react-router';
import IndexPage from '@/web/system-node-index/IndexPage';

export const systemNodeIndexRoutes: RouteObject[] = [
  {
    path: '/',
    element: <IndexPage />,
  },
];
