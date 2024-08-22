import One from '@/assets/images/1.png';
import Two from '@/assets/images/2.png';
import Three from '@/assets/images/3.png';
import Four from '@/assets/images/4.png';
import Five from '@/assets/images/5.png';
import Six from '@/assets/images/6.png';
import * as S from './AboutPage.styled';
import Button from '@/components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function AboutPage() {
  const navigate = useNavigate();

  const navigateToMissionList = () => {
    navigate(ROUTES.missionList);
  };

  const navigateToMain = () => {
    navigate(ROUTES.main);
  };

  return (
    <S.Container>
      <S.Image src={One} alt="banner-content" />
      <S.Image src={Two} alt="banner-content" />
      <S.Image src={Three} alt="banner-content" />
      <S.Image src={Four} alt="banner-content" />
      <S.ButtonWrapper>
        <S.Image src={Five} alt="banner-content" />
        <Button
          variant="primary"
          style={{
            margin: '0 auto',
          }}
          onClick={navigateToMissionList}
        >
          풀 수 있는 미션 둘러보기
        </Button>
      </S.ButtonWrapper>

      <S.ButtonWrapper>
        <S.Image src={Six} alt="banner-content" />
        <Button
          variant="primary"
          style={{
            position: 'absolute',
            bottom: '20rem',
            left: '45%',
          }}
          onClick={navigateToMain}
        >
          지금 바로 Devel Up 시작하기
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  );
}
