import * as S from './LoginPage.styled';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/common/Button/Button';
import ErrorNotFound from '@/assets/images/error_not_found.svg';

export default function NeedToLoginPage() {
  const navigate = useNavigate();

  const navigateToMainPage = () => {
    navigate(ROUTES.main);
  };

  return (
    <S.Container>
      <ErrorNotFound />
      <S.Wrapper>
        <S.Header>로그인이 필요한 페이지예요!</S.Header>
        <S.Body>로그인 후 이용해 주세요.</S.Body>
        <Button onClick={navigateToMainPage}>홈으로 돌아가기</Button>
      </S.Wrapper>
    </S.Container>
  );
}
