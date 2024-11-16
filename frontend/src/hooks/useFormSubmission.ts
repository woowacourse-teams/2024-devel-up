import { useCallback } from 'react';
import type { SolutionPatchMutationProps } from './useUpdateSolution';

interface FormSubmissionParams {
  isEditMode: boolean;
  id: number;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  patchMutation: (props: SolutionPatchMutationProps) => void;
  solutionTitle: string;
  description: string;
  url: string;
}

export const useFormSubmission = ({
  isEditMode,
  id,
  handleSubmit,
  patchMutation,
  solutionTitle,
  description,
  url,
}: FormSubmissionParams) => {
  const handleEditSubmit = useCallback(() => {
    patchMutation({
      solutionId: id,
      title: solutionTitle,
      description,
      url,
    });
  }, [id, patchMutation, solutionTitle, description, url]);

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isEditMode && id) {
        handleEditSubmit();
      } else {
        handleSubmit(e);
      }
    },
    [isEditMode, id, handleEditSubmit, handleSubmit],
  );

  return handleFormSubmit;
};
