import { useSuspenseQuery } from '@tanstack/react-query';
import type { Mission } from '@/types';
import { getMissions } from '@/apis/missionAPI';
import { missionKeys } from './queries/keys';

const useMissions = (filter: string = '') => {
  return useSuspenseQuery<Mission[]>({
    queryKey: missionKeys.all,
    queryFn: () => getMissions(filter),
  });
};

export default useMissions;
