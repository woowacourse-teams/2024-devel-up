import { useSuspenseQuery } from '@tanstack/react-query';
import type { Mission } from '@/types';
import { getMissions } from '@/apis/missionAPI';
import { missionKeys } from './queries/keys';

const useMissions = (filter: string = '') => {
  // console.log([...missionKeys.all, filter]);
  return useSuspenseQuery<Mission[]>({
    queryKey: [...missionKeys.all, filter],
    queryFn: () => getMissions(filter),
  });
};

export default useMissions;
