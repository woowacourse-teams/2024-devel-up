import * as S from './Submission.styled';
import useMissionCompleted from '@/hooks/useMissionCompleted';
import Card from '../common/Card';
import SubmissionCompletedCard from './SubmissionCompletedCard';

export default function SubmissionCompleted() {
  const { data: completedMissions } = useMissionCompleted();

  return (
    <S.SubmissionCompletedContainer>
      <S.Title>완료한 미션</S.Title>
      <S.CompletedCardListWrapper>
        {completedMissions.map((completedMission) => (
          <Card
            thumbnailSrc={completedMission.mission.thumbnail}
            thumbnailFallbackText="Error"
            contentElement={<SubmissionCompletedCard completedMission={completedMission} />}
            key={completedMission.id}
          />
        ))}
      </S.CompletedCardListWrapper>
    </S.SubmissionCompletedContainer>
  );
}
