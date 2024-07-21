import * as S from './missionDetailHeader.styled';
import { missionMocks } from '../MissionList/missionMocks';
import type { Mission } from '../MissionList/missionMocks';

interface MissionDetailHeaderProps {
  id: number;
}

export default function MissionDetailHeader({ id }: MissionDetailHeaderProps) {
  const thumbnailUrl = missionMocks.find((mission: Mission) => mission.id === id)?.thumbnail;
  const title = missionMocks.find((mission: Mission) => mission.id === id)?.title;

  return (
    <S.MissionDetailHeaderContainer>
      <S.ThumbnailImg src={thumbnailUrl} alt="미션 썸네일 이미지" />
      <S.Title>{title}</S.Title>
    </S.MissionDetailHeaderContainer>
  );
}
