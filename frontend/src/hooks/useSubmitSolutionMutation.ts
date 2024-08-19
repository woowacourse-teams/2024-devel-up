import { postSolutionSubmit } from '@/apis/solutions';
import { queryClient } from '@/index';
import { missionKeys, solutionKeys } from './queries/keys';
import useSingleRequestMutation from './useSingleRequestMutation';

interface UseSubmissionMutationParams {
  onSuccessCallback: () => void;
  missionId: number;
}

const SINGLE_REQUEST_ID = 'submit_solution';

const useSubmitSolutionMutation = ({
  onSuccessCallback,
  missionId,
}: UseSubmissionMutationParams) => {
  const { mutate: submitSolutionMutation, isPending } = useSingleRequestMutation({
    queryFn: postSolutionSubmit,
    onSuccess: () => {
      onSuccessCallback();
      queryClient.invalidateQueries({ queryKey: missionKeys.detail(missionId) });
      queryClient.invalidateQueries({ queryKey: solutionKeys.summaries });
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
    requestId: SINGLE_REQUEST_ID,
  });

  return { submitSolutionMutation, isPending };
};

export default useSubmitSolutionMutation;
