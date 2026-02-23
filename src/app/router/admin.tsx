import { Link, type RouteObject } from 'react-router';
import BrandDashboardPage from '@/web/admin/pages/BrandOpsDashboard';

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg text-slate-600">Welcome to the admin dashboard. Use the links below to navigate.</p>
      <div className="mt-6 flex flex-col gap-4">
        <Link to="/admin/brand-dashboard" className="text-blue-500 hover:underline">Brand Dashboard</Link>
        {/* Add more admin links here */}
      </div>
    </div>
  },
  { path: '/admin/brand-dashboard', element: <BrandDashboardPage /> },
];
