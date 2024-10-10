import * as S from './NoContent.styled';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/common/Button/Button';

interface NoContentProps {
  type: 'submitted' | 'inProgress' | 'comments' | 'dashboardDiscussion';
}

const NO_CONTENT_INFO = {
  inProgress: {
    route: ROUTES.missionList,
    mainText: '진행 중인 미션이 없어요',
    subText: '새로운 미션을 찾으러 가볼까요?',
    buttonText: '미션 둘러보기',
  },
  submitted: {
    route: ROUTES.solutions,
    mainText: '제출한 풀이가 없어요',
    subText: '참여할 수 있는 미션을 찾아보러 가볼까요?',
    buttonText: '미션 둘러보기',
  },
  comments: {
    route: ROUTES.solutions,
    mainText: '작성한 댓글이 없어요',
    subText: '댓글을 달아볼까요?',
    buttonText: '풀이 둘러보기',
  },
  dashboardDiscussion: {
    route: ROUTES.discussions,
    mainText: '제출한 디스커션이 없어요',
    subText: '다른 사람들이 작성한 디스커션을 보러 가볼까요?',
    buttonText: '디스커션 둘러보기',
  },
};

export default function NoContent({ type }: NoContentProps) {
  const navigate = useNavigate();
  const { route, mainText, subText, buttonText } = NO_CONTENT_INFO[type];

  const handleNavigate = () => {
    navigate(route);
  };

  return (
    <S.Container>
      <S.NoContent />
      <S.MainText>{mainText}</S.MainText>
      <S.SubText>{subText}</S.SubText>
      <Button onClick={handleNavigate}>{buttonText}</Button>
      {/* <S.Button onClick={handleNavigateToMissionList}>{buttonText}</S.Button> */}
    </S.Container>
  );
}
