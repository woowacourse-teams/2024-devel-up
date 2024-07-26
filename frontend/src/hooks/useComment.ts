import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { validateMaxLength } from '@/utils/validate';

const MAX_COMMENT_LENGTH = 100;

const useComment = () => {
  const [comment, setComment] = useState<string | null>(null);
  const [isCommentError, setIsCommentError] = useState(false);

  //TODO 코멘트 길이에 관한 최대 글자수가 정해져야할거 같아서 임시로 100자로 지정해둡니다. @버건디
  const isValidComment = validateMaxLength({ value: comment ?? '', maxLength: MAX_COMMENT_LENGTH });

  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);
    setIsCommentError(false);
  };

  return { comment, handleComment, isValidComment, setIsCommentError, isCommentError };
};

export default useComment;
