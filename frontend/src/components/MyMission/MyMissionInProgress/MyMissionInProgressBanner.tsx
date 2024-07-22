import Button from '@/components/common/Button/Button';
import * as S from './MyMissionInProgress.styled';

export default function MyMissionInProgressBanner() {
  const imgLink =
    'https://dszw1qtcnsa5e.cloudfront.net/community/20231115/ccefd368-2687-4d26-954d-712315f38fea/2232611625864AF59FF189AB61A75869.jpeg';
  const missionTitle = '숫자 야구 게임 미션';
  const myPrLink = 'naver.com';
  const pairPrLink = 'naver.com';

  const handlePage = (link: string) => {
    window.open(`https://${link}`, '_blank');
  };

  // 리뷰 완료 기능 API 연결 예정입니다 @프룬
  const handleReviewCompleted = () => {};

  return (
    <S.MyMissionInProgressBannerContainer>
      <S.ThumbnailImg src={imgLink} />

      <S.MissionContentWrapper>
        <S.MissionTitle>{missionTitle}</S.MissionTitle>
      </S.MissionContentWrapper>

      <S.MissionButtonWrapper>
        <S.PrButtonWrapper>
          <Button
            type="icon"
            content="페어 PR 이동"
            $bgColor="--grey-100"
            $hoverColor="--grey-200"
            $fontColor="--black-color"
            onHandleClick={() => handlePage(pairPrLink)}
          >
            <S.GithubIcons />
          </Button>
          <Button
            type="icon"
            content="내 PR 이동"
            $bgColor="--grey-100"
            $hoverColor="--grey-200"
            $fontColor="--black-color"
            onHandleClick={() => handlePage(myPrLink)}
          >
            <S.GithubIcons />
          </Button>
        </S.PrButtonWrapper>
        <S.MissionCompleteWrapper>
          <Button content="리뷰 완료" onHandleClick={handleReviewCompleted} />
        </S.MissionCompleteWrapper>
      </S.MissionButtonWrapper>
    </S.MyMissionInProgressBannerContainer>
  );
}
