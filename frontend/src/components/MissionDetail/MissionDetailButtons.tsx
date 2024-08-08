import { useNavigate } from 'react-router-dom';
import * as S from './MissionDetail.styled';
import Button from '../common/Button/Button';
import { ROUTES } from '@/constants/routes';
import useUserInfo from '@/hooks/useUserInfo';
import useModal from '@/hooks/useModal';
import Modal from '../common/Modal/Modal';
import MissionProcess from '../ModalContent/MissionProccess';

interface MissionDetailButtonsProps {
  id: number;
  missionUrl: string;
}

export default function MissionDetailButtons({ id, missionUrl }: MissionDetailButtonsProps) {
  const navigate = useNavigate();
  const handleNavigateToSubmit = () => {
    navigate(`${ROUTES.submission}/${id}`);
  };
  const { data: userInfo } = useUserInfo();
  const { isModalOpen, handleModalClose, handleModalOpen } = useModal();

  // const handleNavigateToMyPr = () => {
  //   window.open('', '_blank'); // 추후 구현 예정입니다 @프룬
  // };

  const handleMissionStart = () => {
    handleModalOpen();
  };

  const handleNavigateToMission = () => {
    window.open(missionUrl, '_blank');
  };

  const handleNavigateToMethod = () => {
    window.open('https://github.com/develup-mission/docs/blob/main/mission-guide.md', '_blank');
  };

  return (
    <S.MissionDetailButtonsContainer>
      <S.ButtonWrapper>
        {!userInfo && (
          <S.MissionButton
            $bgColor="--primary-500"
            $fontColor="--white-color"
            $hoverColor="--primary-600"
            onClick={handleMissionStart}
          >
            미션 시작하기
          </S.MissionButton>
        )}
        {userInfo && (
          <S.MissionButton
            $bgColor="--primary-500"
            $fontColor="--white-color"
            $hoverColor="--primary-600"
            onClick={handleNavigateToSubmit}
          >
            미션 제출하기
          </S.MissionButton>
        )}

        <Modal isModalOpen={isModalOpen}>
          <MissionProcess handleModalClose={handleModalClose} />
        </Modal>

        {/* <Button
          content="내 PR 보러 가기"
          $bgColor="--grey-200"
          $hoverColor="--grey-300"
          $fontColor="--black-color"
          onHandleClick={handleNavigateToMyPr}
        /> */}
      </S.ButtonWrapper>

      <S.InfoMsgWrapper onClick={handleNavigateToMethod}>
        <S.InfoIcon />
        <S.Text>어떻게 참여하나요?</S.Text>
      </S.InfoMsgWrapper>
    </S.MissionDetailButtonsContainer>
  );
}
