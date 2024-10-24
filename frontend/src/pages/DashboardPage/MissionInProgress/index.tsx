import DashBoardMissionList from '@/components/DashBoard/DashBoardMissionList';
import SpinnerSuspense from '@/components/common/SpinnerSuspense';

export default function DashBoardMissionInProgressPage() {
  return (
    <SpinnerSuspense>
      <DashBoardMissionList />
    </SpinnerSuspense>
  );
}
