import { useCallback } from 'react';

interface FormSubmissionParams<T> {
  isEditMode: boolean;
  id: number;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  patchMutation: (props: T) => void;
  props: T;
}

export const useFormSubmission = <T>({
  isEditMode,
  id,
  handleSubmit,
  patchMutation,
  props,
}: FormSubmissionParams<T>) => {
  const handleEditSubmit = useCallback(() => {
    patchMutation({
      ...props,
      id,
    });
  }, [patchMutation, props, id]);

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
