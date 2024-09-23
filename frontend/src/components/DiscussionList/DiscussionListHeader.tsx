import { useNavigate } from 'react-router-dom';
import Button from '../common/Button/Button';
import * as S from './DiscussionList.styled';
import { ROUTES } from '@/constants/routes';

export default function DiscussionListHeader() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(ROUTES.submitDiscussion);
  };

  return (
    <S.HeaderTitleWrapper>
      <S.HeaderTitle>💬 Discussion</S.HeaderTitle>
      <Button variant="primary" onClick={handleNavigate}>
        작성하기
      </Button>
    </S.HeaderTitleWrapper>
  );
}
