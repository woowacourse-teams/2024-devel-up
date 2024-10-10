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
      <S.Image src="https://dp71rnme1p14w.cloudfront.net/about-3.webp" />
      <S.Image src="https://dp71rnme1p14w.cloudfront.net/about-4.webp" />
      <S.Image src="https://dp71rnme1p14w.cloudfront.net/about-5.webp" />
      <S.ButtonWrapper>
        <S.Image src="https://dp71rnme1p14w.cloudfront.net/about-6.webp" />
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
        <S.Image src="https://dp71rnme1p14w.cloudfront.net/about-7.webp" />
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
