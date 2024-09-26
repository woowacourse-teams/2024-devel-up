import * as S from './NotFound.styled';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/common/Button/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const navigateToMainPage = () => {
    navigate(ROUTES.main);
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.MainText>페이지를 찾을 수 없어요!</S.MainText>
        <Button onClick={navigateToMainPage}>홈으로 돌아가기</Button>
      </S.Wrapper>
    </S.Container>
  );
}
