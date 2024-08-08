import { useMutation } from '@tanstack/react-query';
import { postSubmission } from '@/apis/missionAPI';

interface UseSubmissionMutationParams {
  onSuccessCallback: () => void;
}

const useSubmissionMutation = ({ onSuccessCallback }: UseSubmissionMutationParams) => {
  const { mutate: submissionMutation, isPending } = useMutation({
    mutationFn: postSubmission,
    onSuccess: onSuccessCallback,
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  return { submissionMutation, isPending };
};

export default useSubmissionMutation;
