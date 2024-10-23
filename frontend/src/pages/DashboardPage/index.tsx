import { Outlet, useLocation, Navigate } from 'react-router-dom';
import DashboardPageLayout from './DashBoardPageLayout';
import { ROUTES } from '@/constants/routes';
import PrivateRoute from '@/components/common/PrivateRoute';
import SpinnerSuspense from '@/components/common/SpinnerSuspense';

export default function DashboardPage() {
  const location = useLocation();

  if (location.pathname === '/dashboard') {
    return <Navigate to={ROUTES.dashboardMissionInProgress} />;
  }

  return (
    <PrivateRoute redirectTo={ROUTES.login}>
      <DashboardPageLayout>
        <SpinnerSuspense>
          <Outlet />
        </SpinnerSuspense>
      </DashboardPageLayout>
    </PrivateRoute>
  );
}
