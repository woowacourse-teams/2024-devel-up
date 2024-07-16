import { missionMocks } from '../missionList/missionMocks';
import type { Mission } from '../missionList/missionMocks';
import * as S from './MissionDetailContent.styled';

interface MissionDetailContentProps {
  id: number;
}

export default function MissionDetailContent({ id }: MissionDetailContentProps) {
  const thumbnailUrl = missionMocks.find((mission: Mission) => mission.id === id)?.thumbnail;

  return <S.MissionDetailImg src={thumbnailUrl} alt="미션 썸네일 이미지" />;
}
