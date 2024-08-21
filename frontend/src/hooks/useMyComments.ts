import { useSuspenseQuery } from '@tanstack/react-query';
import { commentKeys } from './queries/keys';
import { getMyComments } from '@/apis/commentAPI';

const useMyComments = () => {
  return useSuspenseQuery({
    queryKey: commentKeys.mine,
    queryFn: getMyComments,
  });
};

export default useMyComments;
