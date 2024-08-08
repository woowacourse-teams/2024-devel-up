import { useMutation } from '@tanstack/react-query';
import { postSolutionSubmit } from '@/apis/solutions';
import { queryClient } from '@/index';
import { missionKeys } from './queries/keys';

interface UseSubmissionMutationParams {
  onSuccessCallback: () => void;
  missionId: number;
}

const useSubmitSolutionMutation = ({
  onSuccessCallback,
  missionId,
}: UseSubmissionMutationParams) => {
  const { mutate: submitSolutionMutation, isPending } = useMutation({
    mutationFn: postSolutionSubmit,
    onSuccess: () => {
      onSuccessCallback();
      queryClient.invalidateQueries({ queryKey: missionKeys.detail(missionId) });
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  return { submitSolutionMutation, isPending };
};

export default useSubmitSolutionMutation;
