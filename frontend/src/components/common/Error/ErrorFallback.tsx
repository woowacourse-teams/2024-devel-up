import { HTTP_ERROR_MESSAGE } from '@/constants/api';
import * as S from './ErrorFallback.styled';
import { ROUTES } from '@/constants/routes';
import { GlobalLayout } from '@/styles/GlobalLayout';
import ErrorLogo from './ErrorLogo';
import Button from '../Button/Button';

export interface ErrorFallbackProps {
  statusCode: number;
}

const generateHTTPErrorMessage = (statusCode: number) => {
  const errorMessage = HTTP_ERROR_MESSAGE[statusCode];

  return errorMessage ?? HTTP_ERROR_MESSAGE.unknown;
};

const ErrorFallback = ({ statusCode }: ErrorFallbackProps) => {
  const {
    heading,
    body,
    button,
    imgComponent: ImgComponent,
  } = generateHTTPErrorMessage(statusCode);

  return (
    <GlobalLayout>
      <S.SkipTag href="#main-content" className="visually-hidden">
        본문으로 바로가기
      </S.SkipTag>
      <ErrorLogo />
      <S.Container id="main-content">
        <ImgComponent />
        <S.Wrapper>
          <S.Header>{heading}</S.Header>
          <S.Body>{body}</S.Body>
          <a href={ROUTES.main}>
            <Button>{button}</Button>
          </a>
        </S.Wrapper>
      </S.Container>
    </GlobalLayout>
  );
};

export default ErrorFallback;
