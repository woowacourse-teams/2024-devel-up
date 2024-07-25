import { useMutation, useQueryClient } from '@tanstack/react-query';
import { missionKeys } from './queries/keys';
import { postCompleteReview } from '@/apis/missionAPI';

const useCompleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCompleteReview,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: missionKeys.inProgress });
    },
  });
};

export default useCompleteReview;
