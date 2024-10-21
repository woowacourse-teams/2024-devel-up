import type { Solution } from '@/types/solution';
import * as S from './SolutionDetail.styled';
import TagButton from '@/components/common/TagButton';

interface SolutionDetailHeaderProps {
  solution: Solution;
}

export default function SolutionDetailHeader({ solution }: SolutionDetailHeaderProps) {
  const { mission, member, title } = solution;

  return (
    <S.SolutionDetailHeaderContainer
      aria-label={`풀이 게시글 제목 ${title}, 작성자 ${member.name}`}
    >
      <S.ThumbnailWrapper>
        <S.ThumbnailImg src={mission.thumbnail} alt="" />
        <S.GradientOverlay />
        <S.HeaderLeftArea>
          <S.MissionTitle># {mission.title}</S.MissionTitle>
          <S.Title>{title}</S.Title>
          <S.HeaderLeftAreaInnerWrapper>
            <S.HeaderUserInfo>
              <S.HeaderProfileImg src={member.imageUrl} alt="" />
              <S.HeaderUserName>{member.name}</S.HeaderUserName>
            </S.HeaderUserInfo>
            <S.HashTagWrapper>
              {mission.hashTags &&
                mission.hashTags.map((tag) => (
                  <li key={tag.id}>
                    <TagButton isClickable={false}># {tag.name}</TagButton>
                  </li>
                ))}
            </S.HashTagWrapper>
          </S.HeaderLeftAreaInnerWrapper>
        </S.HeaderLeftArea>
      </S.ThumbnailWrapper>
    </S.SolutionDetailHeaderContainer>
  );
}
