import type { HashTag } from '@/types';
import TagButton from '../common/TagButton';
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
    <S.MissionDetailHeaderContainer
      aria-label={`${title} 미션 상세페이지입니다. 관련 키워드는 ${hashTags?.map(({ name }) => name).join(', ')}입니다.`}
    >
      <S.ThumbnailWrapper>
        <S.ThumbnailImg src={thumbnail} alt="" />
        <S.GradientOverlay />
        <div
          style={{
            position: 'absolute',
            width: '95%',
            padding: '0 1rem',
            left: '2.1rem',
            bottom: '2.4rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <S.Title>{title}</S.Title>
          <S.HashTagWrapper>
            {hashTags &&
              hashTags.map((tag) => {
                return (
                  <li key={tag.id}>
                    <TagButton isClickable={false}># {tag.name}</TagButton>
                  </li>
                );
              })}
          </S.HashTagWrapper>
        </div>
      </S.ThumbnailWrapper>
    </S.MissionDetailHeaderContainer>
  );
}
