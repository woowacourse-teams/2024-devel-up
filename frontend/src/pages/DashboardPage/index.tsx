import { Outlet, useLocation, Navigate } from 'react-router-dom';
import DashboardPageLayout from './DashBoardPageLayout';
import { ROUTES } from '@/constants/routes';

export default function DashboardPage() {
  const location = useLocation();

  if (location.pathname === '/dashboard') {
    return <Navigate to={ROUTES.dashboardMissionInProgress} />;
  }

  return (
    <DashboardPageLayout>
      <Outlet />
    </DashboardPageLayout>
  );
}
