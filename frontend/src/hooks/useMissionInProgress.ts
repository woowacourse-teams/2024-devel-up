import { getMissionInProgress } from '@/apis/missionAPI';
import { useSuspenseQuery } from '@tanstack/react-query';
import { missionKeys } from './queries/keys';

const useMissionInProgress = () => {
  return useSuspenseQuery({
    queryKey: missionKeys.inProgress,
    queryFn: getMissionInProgress,
  });
};

export default useMissionInProgress;
