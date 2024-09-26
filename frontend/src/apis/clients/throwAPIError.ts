import HTTPError from '../error/HTTPError';
import { HTTP_ERROR_MESSAGE } from '@/constants/api';

const throwAPIError = (responseStatus: number) => {
  const errorMessage = HTTP_ERROR_MESSAGE[responseStatus] || HTTP_ERROR_MESSAGE.unknown;

  throw new HTTPError(responseStatus, {
    message: errorMessage.heading,
    payload: errorMessage,
  });
};

export default throwAPIError;
