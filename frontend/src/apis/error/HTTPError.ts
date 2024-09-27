export interface HTTPErrorInfo {
  message?: string;
  payload: {
    heading: string;
    body: string;
    button: string;
  };
}

class HTTPError extends Error {
  statusCode: number;
  information: HTTPErrorInfo;

  constructor(statusCode: number, errorInfo: HTTPErrorInfo) {
    super(errorInfo.message ?? errorInfo.payload?.heading);

    this.name = 'HTTPError';
    this.statusCode = statusCode;
    this.information = errorInfo;
  }
}

export default HTTPError;
