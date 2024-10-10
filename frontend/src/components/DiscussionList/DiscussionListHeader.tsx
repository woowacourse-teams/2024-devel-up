import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../common/Button/Button';
import * as S from './DiscussionList.styled';
import { ROUTES } from '@/constants/routes';
import useUserInfo from '@/hooks/useUserInfo';
import { API_URL } from '@/apis/clients/develupClient';
import { PATH } from '@/apis/paths';

export default function DiscussionListHeader() {
  const { pathname } = useLocation();
  const { data: userInfo } = useUserInfo();

  const navigate = useNavigate();

  const handleToSubmitDiscussion = () => {
    navigate(ROUTES.submitDiscussion);
  };

  return (
    <S.HeaderTitleWrapper>
      <S.HeaderTitle>💬 디스커션</S.HeaderTitle>
      {userInfo ? (
        <Button variant="primary" onClick={handleToSubmitDiscussion}>
          작성하기
        </Button>
      ) : (
        <a href={`${API_URL}${PATH.githubLogin}?next=${pathname}`}>
          <Button variant="primary">작성하기</Button>
        </a>
      )}
    </S.HeaderTitleWrapper>
  );
}
