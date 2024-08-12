import { useSuspenseQuery } from '@tanstack/react-query';
import type { MissionResponse } from '@/types';
import { getAllMissions } from '@/apis/missionAPI';
import { missionKeys } from './queries/keys';

const useMissions = () => {
  return useSuspenseQuery<MissionResponse[]>({
    queryKey: missionKeys.all,
    queryFn: getAllMissions,
  });
};

export default useMissions;
