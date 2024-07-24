import type { Mission } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { missionKeys } from './queries/keys';
import { getMissionById } from '@/apis/missionAPI';

const useMission = (id: number) => {
  return useSuspenseQuery<Mission>({
    queryKey: missionKeys.detail(id),
    queryFn: () => getMissionById(id),
  });
};

export default useMission;
