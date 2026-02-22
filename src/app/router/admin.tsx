import type { RouteObject } from 'react-router';
import BrandDashboardPage from '@/web/admin/BrandDashboardPage';

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin/dashboard',
    element: <BrandDashboardPage />,
  },
];