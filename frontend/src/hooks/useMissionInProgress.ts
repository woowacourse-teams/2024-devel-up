import { getMissionInProgress } from '@/apis/missionAPI';
import type { MissionSubmission } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { missionKeys } from './queries/keys';

const useMissionInProgress = () => {
  return useSuspenseQuery<MissionSubmission>({
    queryKey: missionKeys.inProgress,
    queryFn: getMissionInProgress,
  });
};

export default useMissionInProgress;
