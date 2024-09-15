import type { Solution } from '@/types/solution';
import * as S from './SolutionSection.styled';
import TagButton from '@/components/common/TagButton';

interface SolutionDetailHeaderProps {
  solution: Solution;
}

export default function SolutionDetailHeader({ solution }: SolutionDetailHeaderProps) {
  const { mission, member, title } = solution;

  return (
    <S.SolutionDetailHeaderContainer>
      <S.ThumbnailWrapper>
        <S.ThumbnailImg src={mission.thumbnail} alt="미션 썸네일 이미지" />
        <S.GradientOverlay />
        <S.HeaderLeftArea>
          <S.MissionTitle># {mission.title}</S.MissionTitle>
          <S.Title>{title}</S.Title>
          <S.HeaderUserInfo>
            <S.HeaderProfileImg src={member.imageUrl} />
            <S.HeaderUserName>{member.name}</S.HeaderUserName>
          </S.HeaderUserInfo>
        </S.HeaderLeftArea>
        <S.HashTagWrapper>
          {mission.hashTags &&
            mission.hashTags.map((tag) => <TagButton key={tag.id}># {tag.name}</TagButton>)}
        </S.HashTagWrapper>
      </S.ThumbnailWrapper>
    </S.SolutionDetailHeaderContainer>
  );
}
