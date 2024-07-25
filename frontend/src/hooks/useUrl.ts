import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { validateRegex } from '@/utils/validate';
import { REGEX } from '@/constants/regex';

const useUrl = () => {
  const [url, setUrl] = useState('');
  const [isUrlError, setIsUrlError] = useState(false);
  const isValidUrl = validateRegex({ regex: REGEX.url, value: url });

  const handleUrl = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    setIsUrlError(false);
  };

  return { url, handleUrl, isValidUrl, isUrlError, setIsUrlError };
};

export default useUrl;
