import HTTPError from '../error/HTTPError';
import { HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE } from '@/constants/api';

const handleAPIError = (responseStatus: number, message?: string) => {
  if (responseStatus >= HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
    throw new HTTPError(responseStatus, {
      message: message ?? HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR].HEADING,
      payload: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR],
    });
  }

  if (responseStatus === HTTP_STATUS_CODE.NOT_FOUND) {
    throw new HTTPError(responseStatus, {
      message: message ?? HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.NOT_FOUND].HEADING,
      payload: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.NOT_FOUND],
    });
  }

  if (responseStatus >= HTTP_STATUS_CODE.BAD_REQUEST) {
    throw new HTTPError(responseStatus, {
      message: message ?? HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.BAD_REQUEST].HEADING,
      payload: HTTP_ERROR_MESSAGE[HTTP_STATUS_CODE.BAD_REQUEST],
    });
  }
};

export default handleAPIError;
