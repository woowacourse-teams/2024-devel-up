import { useMutation } from '@tanstack/react-query';
import { missionKeys } from './queries/keys';
import { postCompleteReview } from '@/apis/missionAPI';
import { queryClient } from '..';

const useCompleteReview = () => {
  return useMutation({
    mutationFn: postCompleteReview,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: missionKeys.inProgress });
    },
  });
};

export default useCompleteReview;
