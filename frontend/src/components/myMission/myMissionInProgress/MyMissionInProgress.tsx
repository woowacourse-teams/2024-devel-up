import * as S from './MyMissionInProgress.styled';

export default function MyMissionInProgress() {
  return (
    <S.MyMissionInProgressContainer>
      <S.Title>진행 중인 미션</S.Title>

      <S.MyMissionInProgressWrapper>
        <S.ThumbnailImg src="https://dszw1qtcnsa5e.cloudfront.net/community/20231115/ccefd368-2687-4d26-954d-712315f38fea/2232611625864AF59FF189AB61A75869.jpeg" />

        <S.MissionContentWrapper>
          <S.MissionTitle>숫자 야구 게임 미션</S.MissionTitle>
          <S.MissionDate>2024.07.17 ~ 2024.07.24 23:59</S.MissionDate>
        </S.MissionContentWrapper>

        <S.MissionButtonWrapper>
          <S.PrButtonWrapper>
            <S.PrButton>
              <S.GithubIcons />
              페어 PR 이동
            </S.PrButton>
            <S.PrButton>
              <S.GithubIcons />내 PR 이동
            </S.PrButton>
          </S.PrButtonWrapper>
          <S.MissionCompleteWrapper>
            <S.MissionCompleteButton>리뷰 완료</S.MissionCompleteButton>
          </S.MissionCompleteWrapper>
        </S.MissionButtonWrapper>
      </S.MyMissionInProgressWrapper>
    </S.MyMissionInProgressContainer>
  );
}
