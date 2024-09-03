import * as S from './MainPage.styled';
import useMissions from '@/hooks/useMissions';
import MissionList from '@/components/MissionList';
import Carousel from '@/components/Carousel/Carousel';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import ContentBanner from '@/assets/images/ContentBanner.svg';

export default function MainPage() {
  const { data: missions } = useMissions();
  const navigate = useNavigate();

  const navigateToAboutPage = () => {
    navigate(ROUTES.about);
  };

  return (
    <S.MainPageContainer>
      <Carousel>
        <ContentBanner onClick={navigateToAboutPage} width={'100%'} height={'100%'} />
      </Carousel>
      <S.MissionListTitle>새로운 미션에 참여해 보세요!</S.MissionListTitle>
      <MissionList missions={missions} />
    </S.MainPageContainer>
  );
}
