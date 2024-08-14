import useMissionInProgress from '@/hooks/useMissionInProgress';
import DashBoardMissionList from '@/components/DashBoard/DashBoardMissionList';

export default function DashBoardMissionInProgressPage() {
  const { data: missionListInProgress } = useMissionInProgress();

  return <DashBoardMissionList missionList={missionListInProgress} />;
}
