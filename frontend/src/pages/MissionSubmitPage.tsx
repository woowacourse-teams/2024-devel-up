import MissionImage from '@/components/MissionSubmit/MissionThumbnail';
import * as S from './MissionSubmitPage.styled';
import SubmitBanner from '@/components/MissionSubmit/SubmitBanner';
import PRLink from '@/components/MissionSubmit/PRLink';
import OneWord from '@/components/MissionSubmit/OneWord';
import SubmitButton from '@/components/MissionSubmit/SubmitButton';
import SuccessMissionSubmitPopUp from '@/components/PopUp/SuccessMissionSubmitPopUp';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useMission from '@/hooks/useMission';

export default function MissionSubmitPage() {
  const { id } = useParams();
  const { data: mission } = useMission(Number(id));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMissionSubmit = () => {
    // TODO 미션 제출 post 요청 @버건디
    setIsModalOpen(true);
  };

  return (
    <S.Container>
      <SubmitBanner />
      <MissionImage
        thumbnail={mission.thumbnail}
        title={mission.title}
        language={mission.language}
      />
      <PRLink />
      <OneWord />
      <SubmitButton onSubmit={handleMissionSubmit} />
      <SuccessMissionSubmitPopUp isModalOpen={isModalOpen} thumbnail={mission.thumbnail} />
    </S.Container>
  );
}
