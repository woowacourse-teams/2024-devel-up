import { useNavigate } from 'react-router-dom';
import * as S from './MissionDetail.styled';
import { ROUTES } from '@/constants/routes';
import useUserInfo from '@/hooks/useUserInfo';
import useModal from '@/hooks/useModal';
import Modal from '../common/Modal/Modal';
import MissionProcess from '../ModalContent/MissionProcess';
import useMissionStartMutation from '@/hooks/useMissionStartMutation';
import { useState } from 'react';
import ButtonSample from '../common/ButtonSample/ButtonSample';

interface MissionDetailButtonsProps {
  id: number;
  missionUrl: string;
  isStarted?: boolean;
}

export default function MissionDetailButtons({
  id,
  missionUrl,
  isStarted = false,
}: MissionDetailButtonsProps) {
  const navigate = useNavigate();
  const handleNavigateToSubmit = () => {
    navigate(`${ROUTES.submitSolution}/${id}`);
  };
  const [isMissionStarted, setIsMissionStarted] = useState(isStarted);

  const handleStartMission = () => {
    handleModalOpen();
    setIsMissionStarted(true);
  };

  const { data: userInfo } = useUserInfo();
  const { isModalOpen, handleModalClose, handleModalOpen } = useModal();
  const { startMissionMutation } = useMissionStartMutation({
    onSuccessCallback: handleStartMission,
  });

  const handleMissionStart = () => {
    startMissionMutation({ missionId: id });
  };

  const handleNavigateToMission = () => {
    window.open(missionUrl, '_blank');
  };

  return (
    <S.MissionDetailButtonsContainer>
      <S.ButtonWrapper>
        {userInfo && !isMissionStarted && (
          <ButtonSample variant="primary" size="half" onClick={handleMissionStart}>
            미션 시작하기
          </ButtonSample>
        )}
        {userInfo && isMissionStarted && (
          <ButtonSample variant="primary" size="half" onClick={handleNavigateToSubmit}>
            미션 제출하기
          </ButtonSample>
        )}

        <Modal isModalOpen={isModalOpen}>
          <MissionProcess handleModalClose={handleModalClose} onClick={handleNavigateToMission} />
        </Modal>
      </S.ButtonWrapper>

      <S.InfoMsgWrapper onClick={handleModalOpen}>
        <S.InfoIcon />
        <S.Text>어떻게 참여하나요?</S.Text>
      </S.InfoMsgWrapper>
    </S.MissionDetailButtonsContainer>
  );
}
