import { deleteSolution } from '@/apis/solutions';
import { useMutation } from '@tanstack/react-query';

export const useSolutionDelete = () => {
  const { mutate: deleteMutation } = useMutation({
    mutationFn: (solutionId: number) => deleteSolution(solutionId),
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  const solutionDeleteMutation = (solutionId: number) => {
    deleteMutation(solutionId);
  };

  return { solutionDeleteMutation };
};
