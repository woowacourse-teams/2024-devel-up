import { useMutation } from '@tanstack/react-query';
import { postMissionStart } from '@/apis/mission';

interface UserStartMissionMutationParams {
  onSuccessCallback: () => void;
}

const useMissionStartMutation = ({ onSuccessCallback }: UserStartMissionMutationParams) => {
  const { mutate: startMissionMutation } = useMutation({
    mutationFn: postMissionStart,
    onSuccess: onSuccessCallback,
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  return { startMissionMutation };
};

export default useMissionStartMutation;
