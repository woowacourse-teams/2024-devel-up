import { useQuery } from '@tanstack/react-query';
import type { Mission } from '@/types';
import { getAllMissions } from '@/apis/missionAPI';

const MISSIONS_QUERY_KEYS = {
  all: ['all'],
};

const useMissions = () => {
  const { data, isLoading, isError, isSuccess } = useQuery<Mission[]>({
    queryKey: MISSIONS_QUERY_KEYS.all,
    queryFn: getAllMissions,
  });

  return { allMissions: data ?? [], isLoading, isError, isSuccess };
};

export default useMissions;
