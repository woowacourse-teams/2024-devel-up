import * as S from './MissionThumbnail.styled';

interface MissionImageProps {
  thumbnail: string;
  title: string;
  language: string;
}

export default function MissionImage({ thumbnail, title, language }: MissionImageProps) {
  return (
    <S.MissionImageContainer>
      <S.MissionImageWrapper>
        <S.MissionImg src={thumbnail} alt="미션 이미지" />
        <S.MissionSummaryWrapper>
          <S.MissionSummaryText>{title}</S.MissionSummaryText>
          <S.MissionSummaryText>{language}</S.MissionSummaryText>
        </S.MissionSummaryWrapper>
      </S.MissionImageWrapper>
    </S.MissionImageContainer>
  );
}
