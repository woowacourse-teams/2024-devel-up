import { useRef } from 'react';
import { ERROR_MESSAGE } from '@/constants/messages';

const useSingleRequest = () => {
  const apiRequests = useRef<Set<string>>(new Set());

  const startRequest = (requestId: string): boolean => {
    if (apiRequests.current.has(requestId)) {
      console.warn(ERROR_MESSAGE.duplicate_request);
      return false;
    }
    apiRequests.current.add(requestId);
    return true;
  };

  const endRequest = (requestId: string): void => {
    apiRequests.current.delete(requestId);
  };

  return { startRequest, endRequest };
};

export default useSingleRequest;
