import { deleteSolution } from '@/apis/solutions';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '..';
import { solutionKeys } from './queries/keys';

export const useSolutionDelete = () => {
  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: (solutionId: number) => deleteSolution(solutionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: solutionKeys.all });
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  const solutionDeleteMutation = async (solutionId: number, onSuccessCallback?: () => void) => {
    await deleteMutation(solutionId);
    if (onSuccessCallback) onSuccessCallback();
  };

  return { solutionDeleteMutation };
};
