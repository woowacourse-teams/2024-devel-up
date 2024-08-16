import { Outlet } from 'react-router-dom';
import DashboardPageLayout from './DashBoardPageLayout';

export default function DashboardPage() {
  return (
    <DashboardPageLayout>
      <Outlet />
    </DashboardPageLayout>
  );
}
