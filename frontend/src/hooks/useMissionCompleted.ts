import { useSuspenseQuery } from '@tanstack/react-query';
import { missionKeys } from './queries/keys';
import { getMissionCompleted } from '@/apis/missionAPI';
import type { MissionSubmission } from '@/types';

const useMissionCompleted = () => {
  return useSuspenseQuery<MissionSubmission[]>({
    queryKey: missionKeys.completed,
    queryFn: getMissionCompleted,
  });
};

export default useMissionCompleted;
