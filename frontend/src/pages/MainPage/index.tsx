import * as S from './MainPage.styled';
import useMissions from '@/hooks/useMissions';
import MissionList from '@/components/MissionList';
import Carousel from '@/components/Carousel/Carousel';

export default function MainPage() {
  const { data: missions } = useMissions();

  return (
    <S.MainPageContainer>
      <Carousel>
        <S.BannerContent />
      </Carousel>
      <S.MissionListTitle>새로운 미션에 참여해 보세요!</S.MissionListTitle>
      <MissionList missions={missions} />
    </S.MainPageContainer>
  );
}
