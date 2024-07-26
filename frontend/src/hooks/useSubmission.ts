import useUrl from './useUrl';
import useComment from './useComment';
import useSubmissionMutation from './useSubmissionMutation';
import useModal from './useModal';
import type { FormEvent } from 'react';

interface UseSubmissionParams {
  missionId: number;
}

const useSubmission = ({ missionId }: UseSubmissionParams) => {
  const { url, handleUrl, isValidUrl, isUrlError, setIsUrlError } = useUrl();
  const { comment, handleComment, isValidComment, isCommentError, setIsCommentError } =
    useComment();
  const { handleModalOpen, isModalOpen } = useModal();
  const { submissionMutation, isPending } = useSubmissionMutation({
    onSuccessCallback: handleModalOpen,
  });

  const handleSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidUrl) {
      setIsUrlError(true);
      return;
    }
    if (!isValidComment) {
      setIsCommentError(true);
      return;
    }
    submissionMutation({ missionId, url, comment });
  };

  return {
    url,
    comment,
    handleComment,
    handleUrl,
    handleSubmission,
    isPending,
    isModalOpen,
    isUrlError,
    isCommentError,
  };
};

export default useSubmission;
