import { getMissionInProgress } from '@/apis/missionAPI';
import type { MissionInProgress } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';

const useMissionInProgress = () => {
  const { data, isLoading, isError, isSuccess } = useSuspenseQuery<MissionInProgress>({
    queryKey: ['inProgress'],
    queryFn: () => getMissionInProgress(),
  });

  return { missionInProgress: data ?? [], isLoading, isError, isSuccess };
};

export default useMissionInProgress;
