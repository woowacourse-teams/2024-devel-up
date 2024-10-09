import { patchSolution } from '@/apis/solutions';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '..';
import { ROUTES } from '@/constants/routes';
import { solutionKeys } from './queries/keys';

interface SolutionPatchMutationProps {
  solutionId: number;
  title: string;
  description: string;
  url: string;
}

export const useUpdateSolution = (solutionId: number) => {
  const navigate = useNavigate();

  const { mutate: patchMutation } = useMutation({
    mutationFn: patchSolution,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: solutionKeys.detail(solutionId) });
      navigate(`${ROUTES.solutions}/${solutionId}`);
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
