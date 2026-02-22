import type { RouteObject } from 'react-router';
import IndexPage from '@/web/index/IndexPage';

export const systemNodeIndexRoutes: RouteObject[] = [
  {
    path: '/',
    element: <IndexPage />,
  },
];
