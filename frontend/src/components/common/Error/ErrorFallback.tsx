import { HTTP_ERROR_MESSAGE } from '@/constants/api';
import Button from '../Button/Button';
import * as S from './ErrorFallback.styled';

export interface ErrorFallbackProps {
  statusCode: number;
  resetError?: () => void;
}

const generateHTTPErrorMessage = (statusCode: number) => {
  const errorMessage = HTTP_ERROR_MESSAGE[statusCode];

  return errorMessage ?? HTTP_ERROR_MESSAGE.unknown;
};

const ErrorFallback = ({ statusCode, resetError }: ErrorFallbackProps) => {
  const { heading, body, button } = generateHTTPErrorMessage(statusCode);

  return (
    <S.Container>
      <S.Wrapper>{heading}</S.Wrapper>
      <S.Wrapper>{body}</S.Wrapper>
      <S.Wrapper>
        <Button onClick={resetError}>{button}</Button>
      </S.Wrapper>
    </S.Container>
  );
};

export default ErrorFallback;
