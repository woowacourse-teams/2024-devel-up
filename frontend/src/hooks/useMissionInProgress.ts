import { getMissionInProgress } from '@/apis/missionAPI';
import type { MissionInProgress } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

const useMissionInProgress = () => {
  return useSuspenseQuery<MissionInProgress>({
    queryKey: ['inProgress'],
    queryFn: getMissionInProgress,
  });
};

export default useMissionInProgress;
