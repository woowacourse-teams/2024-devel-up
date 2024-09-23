import Button from '@/components/common/Button/Button';
import * as S from './DiscussionDetailPage.styled';
import TagButton from '@/components/common/TagButton';
import type { DiscussionDetail } from '@/types/discussion';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

interface DiscussionDetailHeaderProps {
  discussion: DiscussionDetail;
}

export default function DiscussionDetailHeader({ discussion }: DiscussionDetailHeaderProps) {
  const { mission, member, title, hashTags } = discussion;

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(ROUTES.submitDiscussion);
  };

  return (
    <S.DiscussionDetailHeaderContainer>
      <S.ThumbnailWrapper>
        <S.HeaderLeftArea>
          <S.MissionActionHeader>
            {mission && <S.MissionTitle># {mission.title}</S.MissionTitle>}
            <Button variant="primary" onClick={handleNavigate}>
              작성하기
            </Button>
          </S.MissionActionHeader>
          <S.Title>{title}</S.Title>
          <S.DiscussionDetailInfo>
            <S.HeaderUserInfo>
              <S.HeaderProfileImg src={member.imageUrl} />
              <S.HeaderUserName>{member.name}</S.HeaderUserName>
            </S.HeaderUserInfo>
            <S.HashTagWrapper>
              {hashTags && hashTags.map((tag) => <TagButton key={tag.id}># {tag.name}</TagButton>)}
            </S.HashTagWrapper>
          </S.DiscussionDetailInfo>
        </S.HeaderLeftArea>
      </S.ThumbnailWrapper>
    </S.DiscussionDetailHeaderContainer>
  );
}
