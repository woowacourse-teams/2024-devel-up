import Button from '@/components/common/Button/Button';
import * as S from './Submission.styled';
import useMissionInProgress from '@/hooks/useMissionInProgress';
import useCompleteReview from '@/hooks/useCompleteReview';

export default function SubmissionInProgressBanner() {
  const { data: missionInProgress } = useMissionInProgress();
  const { mutate: completeReview } = useCompleteReview();

  const handlePage = (link: string) => {
    window.open(link, '_blank');
  };

  const handleReviewCompleted = () => {
    completeReview(missionInProgress.id);
  };

  return (
    <S.SubmissionInProgressBannerContainer>
      <S.ThumbnailContentWrapper>
        <S.InProgressThumbnailImg src={missionInProgress.mission.thumbnail} />

        <S.MissionContentWrapper>
          <S.SubmissionTitle>{missionInProgress.mission.title}</S.SubmissionTitle>
        </S.MissionContentWrapper>
      </S.ThumbnailContentWrapper>
      {missionInProgress.status === '매칭 대기' ? (
        <S.PairNotMatchedWrapper>
          페어를 매칭하고 있어요! 조금만 기다려주세요
          <S.Loader />
        </S.PairNotMatchedWrapper>
      ) : (
        <S.BannerRightWrapper>
          <S.InProgressPrButtonWrapper>
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
          </S.InProgressPrButtonWrapper>

          <S.BannerReviewStatusWrapper>
            {missionInProgress.status !== '매칭 됨' && (
              <S.ToolTipWrapper>
                <S.ToolTipRectangle>
                  {missionInProgress.status === '내가 리뷰 완료' &&
                    '페어의 리뷰를 기다리고 있어요!'}
                  {missionInProgress.status === '상대가 리뷰 완료' &&
                    '페어가 리뷰를 기다리고 있어요!'}
                </S.ToolTipRectangle>
                <S.ToolTipTail />
              </S.ToolTipWrapper>
            )}

            <S.MissionCompleteWrapper>
              {/* TODO: 아래 버튼 리팩터링 필요 */}
              <Button
                content="리뷰 완료"
                onHandleClick={handleReviewCompleted}
                $bgColor={missionInProgress.status === '내가 리뷰 완료' ? '--grey-100' : undefined}
                $hoverColor={
                  missionInProgress.status === '내가 리뷰 완료' ? '--grey-200' : undefined
                }
                $fontColor={
                  missionInProgress.status === '내가 리뷰 완료' ? '--black-color' : undefined
                }
                disabled={missionInProgress.status === '내가 리뷰 완료' && true}
              />
            </S.MissionCompleteWrapper>
          </S.BannerReviewStatusWrapper>
        </S.BannerRightWrapper>
      )}
    </S.SubmissionInProgressBannerContainer>
  );
}
