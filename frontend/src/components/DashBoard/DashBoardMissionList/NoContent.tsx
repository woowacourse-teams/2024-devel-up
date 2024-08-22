import * as S from './NoContent.styled';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/common/Button/Button';

interface NoContentProps {
  type: 'submitted' | 'inProgress' | 'comments';
}

export default function NoContent({ type }: NoContentProps) {
  const navigate = useNavigate();
  const route =
    type === 'inProgress'
      ? ROUTES.missionList
      : type === 'submitted'
        ? ROUTES.solutions
        : ROUTES.solutions;

  const handleNavigateToMissionList = () => {
    navigate(route);
  };

  const mainText =
    type === 'inProgress'
      ? '진행 중인 미션이 없어요'
      : type === 'submitted'
        ? '제출한 솔루션이 없어요'
        : '제출한 댓글이 없어요';
  const subText =
    type === 'inProgress'
      ? '새로운 미션을 찾으러 가볼까요?'
      : type === 'submitted'
        ? '참여할 수 있는 미션을 찾아보러 가볼까요?'
        : '댓글을 달아볼까요?';
  const buttonText = type === 'comments' ? '솔루션 둘러보기' : '미션 둘러보기';

  return (
    <S.Container>
      <S.NoContent />
      <S.MainText>{mainText}</S.MainText>
      <S.SubText>{subText}</S.SubText>
      <Button onClick={handleNavigateToMissionList}>{buttonText}</Button>
      {/* <S.Button onClick={handleNavigateToMissionList}>{buttonText}</S.Button> */}
    </S.Container>
  );
}
