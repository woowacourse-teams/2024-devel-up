import * as S from './NoContent.styled';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

interface NoContentProps {
  type: 'submitted' | 'inProgress';
}

export default function NoContent({ type }: NoContentProps) {
  const navigate = useNavigate();

  const handleNavigateToMissionList = () => {
    navigate(ROUTES.missionList);
  };

  const mainText = type === 'inProgress' ? '진행 중인 미션이 없어요' : '제출한 솔루션이 없어요';
  const subText =
    type === 'inProgress' ? '새로운 미션을 찾으러 가볼까요?' : '새로운 미션을 찾아보러 가볼까요?';

  return (
    <S.Container>
      <S.NoContent />
      <S.MainText>{mainText}</S.MainText>
      <S.SubText>{subText}</S.SubText>
      <S.Button onClick={handleNavigateToMissionList}>미션 둘러보기</S.Button>
    </S.Container>
  );
}
