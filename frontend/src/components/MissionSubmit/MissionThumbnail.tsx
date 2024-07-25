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
          {/* TODO language 부분은 뱃지 컴포넌트로 변경해야함 @버건디 */}
          {language === 'JAVA' ? <S.JavaIcon width={30} height={30} /> : null}
        </S.MissionSummaryWrapper>
      </S.MissionImageWrapper>
    </S.MissionImageContainer>
  );
}
