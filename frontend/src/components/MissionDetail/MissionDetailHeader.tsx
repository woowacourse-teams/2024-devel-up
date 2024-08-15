import type { HashTag } from '@/types';
import HashTagButton from '../common/HashTagButton';
import * as S from './MissionDetail.styled';

interface MissionDetailHeaderProps {
  title: string;
  thumbnail: string;
  language: string;
  hashTags: HashTag[];
}

export default function MissionDetailHeader({
  title,
  thumbnail,
  hashTags,
}: MissionDetailHeaderProps) {
  return (
    <S.MissionDetailHeaderContainer>
      <S.ThumbnailWrapper>
        <S.ThumbnailImg src={thumbnail} alt="미션 썸네일 이미지" />
        <S.GradientOverlay />
        <S.Title>{title}</S.Title>
        <S.HashTagWrapper>
          {hashTags &&
            hashTags.map((tag) => {
              return <HashTagButton key={tag.id}># {tag.name}</HashTagButton>;
            })}
        </S.HashTagWrapper>
      </S.ThumbnailWrapper>
    </S.MissionDetailHeaderContainer>
  );
}
