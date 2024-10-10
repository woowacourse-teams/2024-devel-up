import { useMutation } from '@tanstack/react-query';
import { postSolutionStart } from '@/apis/solutions';

interface UserStartMissionMutationParams {
  onSuccessCallback: () => void;
}

const useMissionStartMutation = ({ onSuccessCallback }: UserStartMissionMutationParams) => {
  const { mutate: startMissionMutation, isPending: isPendingStartMission } = useMutation({
    mutationFn: postSolutionStart,
    onSuccess: onSuccessCallback,
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  return { startMissionMutation, isPendingStartMission };
};

export default useMissionStartMutation;
