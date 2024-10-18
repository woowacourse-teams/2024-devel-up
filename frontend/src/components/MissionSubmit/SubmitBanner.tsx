import type { Mission } from '@/types';
import * as S from './SubmitBanner.styled';
import MissionImage from './MissionThumbnail';

export default function SubmitBanner({ mission }: { mission: Mission }) {
  return (
    <S.Container>
      <S.BannerTitle>
        <S.GithubIcon />
        <S.BannerTitleText aria-label="제출하기">제출하기</S.BannerTitleText>
      </S.BannerTitle>
      <MissionImage
        thumbnail={mission.thumbnail}
        title={mission.title}
        language={mission.language}
      />
    </S.Container>
  );
}
