import { useSuspenseQuery } from '@tanstack/react-query';
import { getMissionInProgress } from '@/apis/missionAPI';
import { missionKeys } from './queries/keys';

const useMissionInProgress = () => {
  return useSuspenseQuery({
    queryKey: missionKeys.inProgress,
    queryFn: getMissionInProgress,
  });
};

export default useMissionInProgress;
