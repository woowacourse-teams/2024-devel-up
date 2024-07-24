import { useNavigate } from 'react-router-dom';
import * as S from './MissionDetail.styled';
import Button from '../common/Button/Button';

interface MissionDetailButtonsProps {
  id: number;
  missionUrl: string;
}

export default function MissionDetailButtons({ id, missionUrl }: MissionDetailButtonsProps) {
  const navigate = useNavigate();
  const handleNavigateToSubmit = () => {
    navigate(`${id}`);
  };

  const handleNavigateToMyPr = () => {
    window.open('', '_blank');
  };

  const handleNavigateToMission = () => {
    window.open(missionUrl, '_blank');
  };

  return (
    <S.MissionDetailButtonsContainer>
      <S.InfoMsgWrapper>
        <S.InfoIcon />
        어떻게 참여하나요?
      </S.InfoMsgWrapper>

      <S.ButtonWrapper>
        <Button content="제출하기" onHandleClick={handleNavigateToSubmit} />
        <Button
          content="내 PR 보러 가기"
          $bgColor="--grey-200"
          $hoverColor="--grey-300"
          $fontColor="--black-color"
          onHandleClick={handleNavigateToMyPr}
        />
        <Button
          content="미션 코드 보러 가기"
          $bgColor="--grey-200"
          $hoverColor="--grey-300"
          $fontColor="--black-color"
          type="icon"
          onHandleClick={handleNavigateToMission}
        >
          <S.GithubIcon />
        </Button>
      </S.ButtonWrapper>
    </S.MissionDetailButtonsContainer>
  );
}
