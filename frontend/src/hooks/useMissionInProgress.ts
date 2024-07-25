import { getMissionInProgress } from '@/apis/missionAPI';
import type { MissionInProgress } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { missionKeys } from './queries/keys';

const useMissionInProgress = () => {
  return useSuspenseQuery<MissionInProgress>({
    queryKey: missionKeys.inProgress,
    queryFn: getMissionInProgress,
  });
};

export default useMissionInProgress;
