import One from '@/assets/images/1.svg';
import Two from '@/assets/images/2.svg';
import Three from '@/assets/images/3.svg';
import Four from '@/assets/images/4.svg';
import Five from '@/assets/images/5.svg';
import Six from '@/assets/images/6.svg';
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
      <One width={'100%'} height={'100%'} />
      <Two width={'100%'} height={'100%'} />
      <Three width={'100%'} height={'100%'} />
      <Four width={'100%'} height={'100%'} />
      <S.ButtonWrapper>
        <Five width={'100%'} height={'100%'} />
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
        <Six width={'100%'} height={'100%'} />
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
