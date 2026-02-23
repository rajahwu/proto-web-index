import { Link, type RouteObject } from 'react-router';
import BrandDashboardPage from '@/web/admin/pages/BrandOpsDashboard';
import VesselRegistry from '@/web/admin/pages/VesselRegistry';

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg text-slate-600">Welcome to the admin dashboard. Use the links below to navigate.</p>
      <div className="mt-6 flex flex-col gap-4">
        <Link to="/admin/brand-dashboard" className="text-blue-500 hover:underline">Brand Dashboard</Link>
        <Link to="/admin/vessel-registry" className="text-blue-500 hover:underline">Vessel Registry</Link>
      </div>
    </div>
  },
  { path: '/admin/brand-dashboard', element: <BrandDashboardPage /> },
  { path: '/admin/vessel-registry', element: <VesselRegistry /> }

];
