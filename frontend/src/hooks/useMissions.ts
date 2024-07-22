import { useSuspenseQuery } from '@tanstack/react-query';
import type { Mission } from '@/types';
import { getAllMissions } from '@/apis/missionAPI';
import { missionKeys } from './queries/keys';

const useMissions = () => {
  return useSuspenseQuery<Mission[]>({
    queryKey: missionKeys.all,
    queryFn: getAllMissions,
  });
};

export default useMissions;
