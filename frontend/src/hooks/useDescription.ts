import { useState } from 'react';
import type { ChangeEvent } from 'react';

const useDescription = () => {
  const [description, setDescription] = useState<string>('');
  const [isDescriptionError, setIsDescriptionError] = useState(false);

  const isValidDescription = !!description;

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);

    if (value.trim().length === 0) {
      setIsDescriptionError(true);
      return;
    }

    setIsDescriptionError(false);
  };

  const handleMarkDownDescription = (v: string = '') => {
    setDescription(v);

    if (v.trim().length === 0) {
      setIsDescriptionError(true);
      return;
    }

    setIsDescriptionError(false);
  };

  return {
    description,
    handleDescription,
    handleMarkDownDescription,
    isValidDescription,
    setIsDescriptionError,
    isDescriptionError,
  };
};

export default useDescription;
