export const HTTP_ERROR_MESSAGE: Record<
  number | 'unknown',
  { heading: string; body: string; button: string }
> = {
  404: {
    heading: '404',
    body: '요청하신 페이지를 찾을 수 없습니다.',
    button: '홈으로 돌아가기',
  },
  500: {
    heading: '서버 오류가 발생했습니다',
    body: '잠시 후 다시 요청해주세요.',
    button: '새로고침',
  },
  400: {
    heading: '잘못된 요청입니다.',
    body: '확인 후 다시 시도해주세요.',
    button: '홈으로 돌아가기',
  },
  unknown: {
    heading: 'Unknown Error',
    body: '알 수 없는 오류가 발생했습니다.',
    button: '홈으로 돌아가기',
  },
} as const;

export const HTTP_METHOD = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  delete: 'DELETE',
} as const;

export const HTTP_STATUS_CODE = {
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
