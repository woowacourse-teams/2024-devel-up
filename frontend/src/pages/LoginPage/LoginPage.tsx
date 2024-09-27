import * as S from './LoginPage.styled';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/common/Button/Button';

export default function NeedToLoginPage() {
  const navigate = useNavigate();

  const navigateToMainPage = () => {
    navigate(ROUTES.main);
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.MainText>
          로그인이 필요한 페이지에요! <br /> 로그인 후에 이용해주세요
        </S.MainText>
        <Button onClick={navigateToMainPage}>홈으로 돌아가기</Button>
      </S.Wrapper>
    </S.Container>
  );
}
