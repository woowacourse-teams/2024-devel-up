import { useState } from 'react';
import type { ChangeEvent } from 'react';

const MAX_DISCUSSION_TITLE_LENGTH = 50;

const useDiscussionTitle = () => {
  const [discussionTitle, setDiscussionTitle] = useState('');
  const [isDiscussionTitleError, setIsDiscussionTitleError] = useState(false);
  const isValidDiscussionTitle =
    discussionTitle.length && discussionTitle.length < MAX_DISCUSSION_TITLE_LENGTH;

  const handleDiscussionTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDiscussionTitle(value);

    if (value.trim().length === 0) {
      setIsDiscussionTitleError(true);
      return;
    }
    setIsDiscussionTitleError(false);
  };

  return {
    discussionTitle,
    handleDiscussionTitle,
    isValidDiscussionTitle,
    isDiscussionTitleError,
    setIsDiscussionTitleError,
  };
};

export default useDiscussionTitle;
