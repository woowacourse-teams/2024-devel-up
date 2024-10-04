import { HTTP_ERROR_MESSAGE } from '@/constants/api';
import * as S from './ErrorFallback.styled';
import { ROUTES } from '@/constants/routes';
import { GlobalLayout } from '@/styles/GlobalLayout';
import ErrorLogo from './ErrorLogo';

export interface ErrorFallbackProps {
  statusCode: number;
}

const generateHTTPErrorMessage = (statusCode: number) => {
  const errorMessage = HTTP_ERROR_MESSAGE[statusCode];

  return errorMessage ?? HTTP_ERROR_MESSAGE.unknown;
};

const ErrorFallback = ({ statusCode }: ErrorFallbackProps) => {
  const { heading, body, button } = generateHTTPErrorMessage(statusCode);

  return (
    <GlobalLayout>
      <ErrorLogo />
      <S.Container>
        <S.Wrapper>{heading}</S.Wrapper>
        <S.Wrapper>{body}</S.Wrapper>
        <S.Wrapper>
          <a href={ROUTES.main}>{button}</a>
        </S.Wrapper>
      </S.Container>
    </GlobalLayout>
  );
};

export default ErrorFallback;
