import { HTTP_ERROR_MESSAGE } from '../constants/api';

export const isHTTPErrorStatus = (
  statusCode: number,
): statusCode is keyof typeof HTTP_ERROR_MESSAGE => {
  return statusCode in HTTP_ERROR_MESSAGE;
};
