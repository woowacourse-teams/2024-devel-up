import { useMutation } from '@tanstack/react-query';
import { postSubmission } from '@/apis/missionAPI';
import type { PostSubmissionResponse } from '@/apis/missionAPI';
import type { SubmissionPayload } from '@/types';

interface UseSubmissionMutationParams {
  onSuccessCallback: () => void;
}

const useSubmissionMutation = ({ onSuccessCallback }: UseSubmissionMutationParams) => {
  const { mutate: submissionMutation, isPending } = useMutation<
    PostSubmissionResponse,
    Error,
    SubmissionPayload
  >({
    mutationFn: postSubmission,
    onSuccess: onSuccessCallback,
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  return { submissionMutation, isPending };
};

export default useSubmissionMutation;
