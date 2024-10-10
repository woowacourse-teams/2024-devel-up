import { useQuery } from '@tanstack/react-query';
import { solutionKeys } from './queries/keys';
import type { Solution } from '@/types/solution';
import { getSolutionById } from '@/apis/solutions';

const useSolution = (solutionId?: number) => {
  const { data } = useQuery<Solution>({
    queryKey: solutionKeys.detail(solutionId || 0),
    queryFn: solutionId ? () => getSolutionById(solutionId) : undefined,
    enabled: !!solutionId,
  });

  return {
    data: data ?? {
      title: '',
      id: 0,
      description: '',
      url: '',
      member: { id: 0, email: '', name: '', imageUrl: '' },
      mission: {
        id: 0,
        title: '',
        language: '',
        descriptionUrl: '',
        thumbnail: '',
        url: '',
        summary: '',
        hashTags: [],
      },
    },
  };
};

export default useSolution;
