import type { Discussion } from '@/types/discussion';
import * as S from './DiscussionDetailPage.styled';
import HashTagButton from '@/components/common/HashTagButton';

interface DiscussionDetailHeaderProps {
  discussion: Discussion;
}

export default function DiscussionDetailHeader({ discussion }: DiscussionDetailHeaderProps) {
  const { mission, member, title, hashTags } = discussion;

  return (
    <S.DiscussionDetailHeaderContainer>
      <S.ThumbnailWrapper>
        <S.HeaderLeftArea>
          {mission && <S.MissionTitle># {mission.title}</S.MissionTitle>}
          <S.Title>{title}</S.Title>
          <S.DiscussionDetailInfo>
            <S.HeaderUserInfo>
              <S.HeaderProfileImg src={member.imageUrl} />
              <S.HeaderUserName>{member.name}</S.HeaderUserName>
            </S.HeaderUserInfo>
            <S.HashTagWrapper>
              {hashTags &&
                hashTags.map((tag) => <HashTagButton key={tag.id}># {tag.name}</HashTagButton>)}
            </S.HashTagWrapper>
          </S.DiscussionDetailInfo>
        </S.HeaderLeftArea>
      </S.ThumbnailWrapper>
    </S.DiscussionDetailHeaderContainer>
  );
}
