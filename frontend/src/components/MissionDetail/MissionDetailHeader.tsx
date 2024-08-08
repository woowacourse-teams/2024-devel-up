import * as S from './MissionDetail.styled';

interface MissionDetailHeaderProps {
  title: string;
  thumbnail: string;
  language: string;
}

export default function MissionDetailHeader({
  title,
  thumbnail,
  language,
}: MissionDetailHeaderProps) {
  return (
    <S.MissionDetailHeaderContainer>
      <S.ThumbnailWrapper>
        <S.ThumbnailImg src={thumbnail} alt="미션 썸네일 이미지" />
        <S.GradientOverlay />
        <S.Title>{title}</S.Title>
        {/* <S.LangBadgeWrapper>{language === 'JAVA' ? <S.JavaIcon /> : null}</S.LangBadgeWrapper> */}
      </S.ThumbnailWrapper>
    </S.MissionDetailHeaderContainer>
  );
}
