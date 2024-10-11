import { postSolutionSubmit } from '@/apis/solutions';
import { queryClient } from '@/index';
import { missionKeys, solutionKeys } from './queries/keys';
import useSingleRequestMutation from './useSingleRequestMutation';
import { ROUTES } from '../constants/routes';
import { useNavigate } from 'react-router-dom';

interface UseSubmissionMutationParams {
  onSuccessCallback: () => void;
  missionId: number;
}

const SINGLE_REQUEST_ID = 'submit_solution';

const useSubmitSolutionMutation = ({
  onSuccessCallback,
  missionId,
}: UseSubmissionMutationParams) => {
  const navigate = useNavigate();

  const { mutate: submitSolutionMutation, isPending } = useSingleRequestMutation({
    mutationFn: postSolutionSubmit,
    onSuccess: ({ id }) => {
      onSuccessCallback();
      queryClient.invalidateQueries({ queryKey: missionKeys.detail(missionId) });
      queryClient.invalidateQueries({ queryKey: solutionKeys.summaries });
      navigate(ROUTES.solutions + `/${id}`);
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
    requestId: SINGLE_REQUEST_ID,
  });

  return { submitSolutionMutation, isPending, isSubmitSolutionError };
};

export default useSubmitSolutionMutation;
