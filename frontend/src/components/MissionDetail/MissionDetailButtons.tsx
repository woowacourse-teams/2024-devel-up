import { useNavigate } from 'react-router-dom';
import * as S from './MissionDetail.styled';
import Button from '../common/Button/Button';
import { ROUTES } from '@/constants/routes';

interface MissionDetailButtonsProps {
  id: number;
  missionUrl: string;
}

export default function MissionDetailButtons({ id, missionUrl }: MissionDetailButtonsProps) {
  const navigate = useNavigate();
  const handleNavigateToSubmit = () => {
    navigate(`${ROUTES.submit}/${id}`);
  };

  // const handleNavigateToMyPr = () => {
  //   window.open('', '_blank'); // 추후 구현 예정입니다 @프룬
  // };

  const handleNavigateToMission = () => {
    window.open(missionUrl, '_blank');
  };

  const handleNavigateToMethod = () => {
    window.open('https://github.com/develup-mission/docs/blob/main/mission-guide.md', '_blank');
  };

  return (
    <S.MissionDetailButtonsContainer>
      <S.InfoMsgWrapper onClick={handleNavigateToMethod}>
        <S.InfoIcon />
        어떻게 참여하나요?
      </S.InfoMsgWrapper>

      <S.ButtonWrapper>
        <Button content="제출하기" onHandleClick={handleNavigateToSubmit} />
        {/* <Button
          content="내 PR 보러 가기"
          $bgColor="--grey-200"
          $hoverColor="--grey-300"
          $fontColor="--black-color"
          onHandleClick={handleNavigateToMyPr}
        /> */}
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
