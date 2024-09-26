import { HTTP_ERROR_MESSAGE } from '@/constants/api';
import { isHTTPErrorStatus } from '@/utils/isHTTPErrorStatus';
import Button from '../Button/Button';
import * as S from './ErrorFallback.styled';

export interface ErrorFallbackProps {
  statusCode: number;
  resetError?: () => void;
}

const ErrorFallback = ({ statusCode, resetError }: ErrorFallbackProps) => {
  const currentStatusCode = statusCode;

  return (
    <S.Container>
      <S.Wrapper>
        {isHTTPErrorStatus(currentStatusCode)
          ? HTTP_ERROR_MESSAGE[currentStatusCode].HEADING
          : 'Unknown Error'}
      </S.Wrapper>
      <S.Wrapper>
        {isHTTPErrorStatus(currentStatusCode)
          ? HTTP_ERROR_MESSAGE[currentStatusCode].BODY
          : '알 수 없는 오류가 발생했습니다.'}
      </S.Wrapper>
      <S.Wrapper>
        <Button onClick={resetError}>
          {isHTTPErrorStatus(currentStatusCode)
            ? HTTP_ERROR_MESSAGE[currentStatusCode].BUTTON
            : '홈으로 돌아가기'}
        </Button>
      </S.Wrapper>
    </S.Container>
  );
};

export default ErrorFallback;
