import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { validateMaxLength } from '@/utils/validate';

const MAX_COMMENT_LENGTH = 100;

const useDescription = () => {
  const [description, setDescription] = useState<string | null>(null);
  const [isDescriptionError, setIsDescriptionError] = useState(false);

  //TODO 코멘트 길이에 관한 최대 글자수가 정해져야할거 같아서 임시로 100자로 지정해둡니다. @버건디
  const isValidDescription = validateMaxLength({
    value: description ?? '',
    maxLength: MAX_COMMENT_LENGTH,
  });

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
    setIsDescriptionError(false);
  };

  return {
    description,
    handleDescription,
    isValidDescription,
    setIsDescriptionError,
    isDescriptionError,
  };
};

export default useDescription;
