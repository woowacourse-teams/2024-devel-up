import { useNavigate } from 'react-router-dom';
import * as S from './Submission.styled';
import Button from '../common/Button/Button';
import type { MissionSubmission } from '@/types';

interface SubmissionCompletedCardProps {
  completedMission: MissionSubmission;
}

export default function SubmissionCompletedCard({
  completedMission,
}: SubmissionCompletedCardProps) {
  const navigate = useNavigate();

  const handleMissionClick = (id: number) => {
    navigate(`/missions/${id}`);
  };

  const handlePairPrLink = (e: React.MouseEvent<HTMLButtonElement>, pairPrLink: string) => {
    e.stopPropagation();
    window.open(pairPrLink, '_blank');
  };

  const handleMyPrLink = (e: React.MouseEvent<HTMLButtonElement>, MyPrLink: string) => {
    e.stopPropagation();
    window.open(MyPrLink, '_blank');
  };

  return (
    <S.MissionCardWrapper
      key={completedMission.id}
      onClick={() => handleMissionClick(completedMission.id)}
    >
      <S.CompletedTitle>{completedMission.mission.title}</S.CompletedTitle>

      <S.CompletedPrButtonWrapper>
        <Button
          type="icon"
          content="페어 PR 이동"
          $bgColor="--grey-100"
          $hoverColor="--grey-200"
          $fontColor="--black-color"
          onHandleClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handlePairPrLink(e, completedMission.pairPrLink)
          }
        >
          <S.GithubIcons />
        </Button>
        <Button
          type="icon"
          content="내 PR 이동"
          $bgColor="--grey-100"
          $hoverColor="--grey-200"
          $fontColor="--black-color"
          onHandleClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleMyPrLink(e, completedMission.myPrLink)
          }
        >
          <S.GithubIcons />
        </Button>
      </S.CompletedPrButtonWrapper>
    </S.MissionCardWrapper>
  );
}
