import * as S from './DiscussionDetailPage.styled';
import TagButton from '@/components/common/TagButton';
import type discussionMock from './mock.json';

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
          <S.HeaderUserInfo>
            <S.HeaderProfileImg src={member.imageUrl} />
            <S.HeaderUserName>{member.name}</S.HeaderUserName>
          </S.HeaderUserInfo>
        </S.HeaderLeftArea>
        <S.HashTagWrapper>
          {hashTags && hashTags.map((tag) => <TagButton key={tag.id}># {tag.name}</TagButton>)}
        </S.HashTagWrapper>
      </S.ThumbnailWrapper>
    </S.DiscussionDetailHeaderContainer>
  );
}
