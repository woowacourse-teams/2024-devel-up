import { patchSolution } from '@/apis/solutions';
import { useMutation } from '@tanstack/react-query';

interface SolutionPatchMutationProps {
  solutionId: number;
  title: string;
  description: string;
  url: string;
}

export const useUpdateSolution = () => {
  const { mutate: patchMutation } = useMutation({
    mutationFn: patchSolution,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  const solutionPatchMutation = ({
    solutionId,
    title,
    description,
    url,
  }: SolutionPatchMutationProps) => {
    patchMutation({
      solutionId,
      title,
      description,
      url,
    });
  };

  return { solutionPatchMutation };
};
