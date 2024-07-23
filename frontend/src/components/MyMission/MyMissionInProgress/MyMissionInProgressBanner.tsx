import Button from '@/components/common/Button/Button';
import * as S from './MyMissionInProgress.styled';
import useMissionInProgress from '@/hooks/useMissionInProgress';

export default function MyMissionInProgressBanner() {
  const { missionInProgress } = useMissionInProgress();

  const handlePage = (link: string) => {
    window.open(link, '_blank');
  };

  // 리뷰 완료 기능 API 연결 예정입니다 @프룬
  const handleReviewCompleted = () => {};

  return (
    <S.MyMissionInProgressBannerContainer>
      <S.ThumbnailContentWrapper>
        <S.ThumbnailImg src={missionInProgress.mission.thumbnail} />

        <S.MissionContentWrapper>
          <S.MissionTitle>{missionInProgress.mission.title}</S.MissionTitle>
        </S.MissionContentWrapper>
      </S.ThumbnailContentWrapper>
      {missionInProgress.status !== '매칭 대기' ? (
        <S.PairNotMatchedWrapper>
          페어를 매칭하고 있어요! 조금만 기다려주세요
          <S.Loader />
        </S.PairNotMatchedWrapper>
      ) : (
        <S.MissionButtonWrapper>
          <S.PrButtonWrapper>
            <Button
              type="icon"
              content="페어 PR 이동"
              $bgColor="--grey-100"
              $hoverColor="--grey-200"
              $fontColor="--black-color"
              onHandleClick={() => handlePage(missionInProgress.pairPrLink)}
            >
              <S.GithubIcons />
            </Button>
            <Button
              type="icon"
              content="내 PR 이동"
              $bgColor="--grey-100"
              $hoverColor="--grey-200"
              $fontColor="--black-color"
              onHandleClick={() => handlePage(missionInProgress.myPrLink)}
            >
              <S.GithubIcons />
            </Button>
          </S.PrButtonWrapper>
          <S.MissionCompleteWrapper>
            <Button content="리뷰 완료" onHandleClick={handleReviewCompleted} />
          </S.MissionCompleteWrapper>
        </S.MissionButtonWrapper>
      )}
    </S.MyMissionInProgressBannerContainer>
  );
}
