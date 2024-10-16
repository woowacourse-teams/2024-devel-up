import type { Solution } from '@/types/solution';
import * as S from './SolutionDetail.styled';
import TagButton from '@/components/common/TagButton';

interface SolutionDetailHeaderProps {
  solution: Solution;
}

export default function SolutionDetailHeader({ solution }: SolutionDetailHeaderProps) {
  const { mission, member, title } = solution;

  return (
    <S.SolutionDetailHeaderContainer>
      <S.SolutionDetailTitle>💡 풀이</S.SolutionDetailTitle>
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
            mission.hashTags.map((tag) => (
              <li key={tag.id}>
                <TagButton isClickable={false}># {tag.name}</TagButton>
              </li>
            ))}
        </S.HashTagWrapper>
      </S.ThumbnailWrapper>
    </S.SolutionDetailHeaderContainer>
  );
}
