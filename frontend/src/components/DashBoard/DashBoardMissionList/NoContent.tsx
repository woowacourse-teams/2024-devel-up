import * as S from './NoContent.styled';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function NoContent() {
  const navigate = useNavigate();

  const handleNavigateToMissionList = () => {
    navigate(ROUTES.missionList);
  };

  return (
    <S.Container>
      <S.NoContent />
      <S.MainText>진행 중인 미션이 없어요</S.MainText>
      <S.SubText>새로운 미션을 찾으러 가볼까요?</S.SubText>
      <S.Button onClick={handleNavigateToMissionList}>미션 둘러보기</S.Button>
    </S.Container>
  );
}
