import { Outlet, useLocation, Navigate } from 'react-router-dom';
import DashboardPageLayout, { DashboardLayoutContextProvider } from './DashBoardPageLayout';
import { ROUTES } from '@/constants/routes';
import PrivateRoute from '@/components/common/PrivateRoute';
import SpinnerSuspense from '@/components/common/SpinnerSuspense';

export default function DashboardPage() {
  const location = useLocation();

  if (location.pathname === '/dashboard') {
    return <Navigate to={ROUTES.dashboardMissionInProgress} />;
  }

  return (
    <DashboardLayoutContextProvider>
      {/* <PrivateRoute redirectTo={ROUTES.login}> */}
      <DashboardPageLayout>
        <SpinnerSuspense>
          <Outlet />
        </SpinnerSuspense>
      </DashboardPageLayout>
      {/* </PrivateRoute> */}
    </DashboardLayoutContextProvider>
  );
}
