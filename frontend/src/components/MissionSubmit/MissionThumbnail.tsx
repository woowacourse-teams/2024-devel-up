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
    <S.MissionImageContainer>
      <S.MissionImageWrapper>
        <S.MissionImg src={thumbnail} alt="미션 이미지" />
        <S.MissionSummaryWrapper>
          <S.MissionSummaryText>{title}</S.MissionSummaryText>
          {/* 뱃지는 안쓰이고 있어서 주석처리할게요 @프룬 */}
          {/* <Badge text={language} /> */}
        </S.MissionSummaryWrapper>
      </S.MissionImageWrapper>
    </S.MissionImageContainer>
  );
}
