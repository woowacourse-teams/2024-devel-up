import { HTTP_ERROR_MESSAGE } from '@/constants/api';
import Button from '../Button/Button';
import * as S from './ErrorFallback.styled';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export interface ErrorFallbackProps {
  statusCode: number;
}

const generateHTTPErrorMessage = (statusCode: number) => {
  const errorMessage = HTTP_ERROR_MESSAGE[statusCode];

  return errorMessage ?? HTTP_ERROR_MESSAGE.unknown;
};

const ErrorFallback = ({ statusCode }: ErrorFallbackProps) => {
  const { heading, body, button } = generateHTTPErrorMessage(statusCode);

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate(ROUTES.main);
  };

  return (
    <S.Container>
      <S.Wrapper>{heading}</S.Wrapper>
      <S.Wrapper>{body}</S.Wrapper>
      <S.Wrapper>
        <Button onClick={navigateToHome}>{button}</Button>
      </S.Wrapper>
    </S.Container>
  );
};

export default ErrorFallback;
