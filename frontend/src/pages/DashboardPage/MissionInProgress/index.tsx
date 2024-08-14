import useMissionInProgress from '@/hooks/useMissionInProgress';
import DashBoardMissionList from '@/components/DashBoardMissionList';

export default function DashBoardMissionInProgressPage() {
  const { data: missionListInProgress } = useMissionInProgress();

  return <DashBoardMissionList missionList={missionListInProgress} />;
}
