import { Link } from 'react-router-dom';
import { missionMocks } from '../MissionList/missionMocks';
import type { Mission } from '../MissionList/missionMocks';
import * as S from './MissionDetail.styled';

interface MissionDetailButtonsProps {
  id: number;
}

export default function MissionDetailButtons({ id }: MissionDetailButtonsProps) {
  const url = missionMocks.find((mission: Mission) => mission.id === id)?.url ?? '';

  return (
    <S.MissionDetailButtonsContainer>
      <Link to={url} target="_blank">
        <S.Button
          style={{
            background: 'var(--primary-200)',
          }}
        >
          미션 참여하기
        </S.Button>
      </Link>
      <Link to="https://github.com/develup-mission/docs/blob/main/mission-guide.md" target="_blank">
        <S.Button>미션 제출 방법</S.Button>
      </Link>
      <Link to={`/submit/${id}`}>
        <S.Button>미션 제출하기</S.Button>
      </Link>
    </S.MissionDetailButtonsContainer>
  );
}
