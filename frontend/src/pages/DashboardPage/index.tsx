import { Outlet, useLocation, Navigate } from 'react-router-dom';
import DashboardPageLayout from './DashBoardPageLayout';
import { ROUTES } from '@/constants/routes';
import PrivateRoute from '@/components/common/PrivateRoute';

export default function DashboardPage() {
  const location = useLocation();

  if (location.pathname === '/dashboard') {
    return <Navigate to={ROUTES.dashboardMissionInProgress} />;
  }

  return (
    <PrivateRoute redirectTo={ROUTES.login}>
      <DashboardPageLayout>
        <Outlet />
      </DashboardPageLayout>
    </PrivateRoute>
  );
}
