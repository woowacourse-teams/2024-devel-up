import * as S from './DiscussionDetail.styled';
import TagButton from '@/components/common/TagButton';
import type { DiscussionDetail } from '@/types/discussion';

interface DiscussionDetailHeaderProps {
  discussion: DiscussionDetail;
}

export default function DiscussionDetailHeader({ discussion }: DiscussionDetailHeaderProps) {
  const { mission, member, title, hashTags } = discussion;

  return (
    <S.DiscussionDetailHeaderContainer>
      <S.ThumbnailWrapper>
        <S.HeaderLeftArea>
          <S.MissionActionHeader>
            <S.ButtonLeft>
              {mission && <TagButton variant="danger"># {mission.title}</TagButton>}
            </S.ButtonLeft>
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
