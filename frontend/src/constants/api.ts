import ErrorImg from '@/assets/images/error.svg';
import ErrorNotFound from '@/assets/images/error_not_found.svg';

export const HTTP_ERROR_MESSAGE: Record<
  number | 'unknown',
  {
    heading: string;
    body: string;
    button: string;
    imgComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }
> = {
  404: {
    heading: '페이지를 찾을 수 없어요!',
    body: '페이지 주소를 다시 확인해 주세요.',
    button: '홈으로 돌아가기',
    imgComponent: ErrorNotFound,
  },
  400: {
    heading: '잘못된 요청입니다.',
    body: '확인 후 다시 시도해 주세요.',
    button: '홈으로 돌아가기',
    imgComponent: ErrorNotFound,
  },
  500: {
    heading: '서버에 오류가 발생했어요!',
    body: '잠시 후 다시 시도해 주세요.',
    button: '새로고침',
    imgComponent: ErrorImg,
  },
  unknown: {
    heading: '오류가 발생했어요!',
    body: '잠시 후 다시 시도해 주세요.',
    button: '홈으로 돌아가기',
    imgComponent: ErrorImg,
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
