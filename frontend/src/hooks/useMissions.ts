import { useSuspenseQuery } from '@tanstack/react-query';
import type { Mission } from '@/types';
import { getMissions } from '@/apis/missionAPI';
import { missionKeys } from './queries/keys';
import { HASHTAGS } from '@/constants/hashTags';

const useMissions = (filter: string = HASHTAGS.all) => {
  return useSuspenseQuery<Mission[]>({
    queryKey: [...missionKeys.all, filter],
    queryFn: () => getMissions(filter),
  });
};

export default useMissions;
