import * as S from './MissionThumbnail.styled';
// import Badge from '../common/Badge';

interface MissionImageProps {
  thumbnail: string;
  title: string;
  language: string;
}

export default function MissionImage({ thumbnail, title, language }: MissionImageProps) {
  language;
  return (
    <S.MissionImageContainer aria-label={`선택된 미션: ${title}`}>
      <S.MissionImageWrapper>
        <S.MissionImg src={thumbnail} alt="" />
        <S.MissionSummaryWrapper>
          <S.MissionSummaryText>{title}</S.MissionSummaryText>
        </S.MissionSummaryWrapper>
      </S.MissionImageWrapper>
    </S.MissionImageContainer>
  );
}
