import { Link } from 'react-router-dom';
import { missionMocks } from '../missionList/missionMocks';
import type { Mission } from '../missionList/missionMocks';
import * as S from './MissionDetailButtonGroup.styled';

interface MissionDetailButtonGroupProps {
  id: number;
}

export default function MissionDetailButtonGroup({ id }: MissionDetailButtonGroupProps) {
  const url = missionMocks.find((mission: Mission) => mission.id === id)?.url ?? '';

  return (
    <S.MissionDetailButtonGroupContainer>
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
    </S.MissionDetailButtonGroupContainer>
  );
}
