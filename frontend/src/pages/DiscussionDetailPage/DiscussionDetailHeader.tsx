import * as S from './DiscussionDetailPage.styled';
import HashTagButton from '@/components/common/HashTagButton';
import type discussionMock from './discussionMock.json';

interface SolutionDetailHeaderProps {
  discussion: typeof discussionMock;
}

export default function DiscussionDetailHeader({ discussion }: SolutionDetailHeaderProps) {
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
