import * as S from './MissionList.styled';
import { Link } from 'react-router-dom';
import type { Mission } from './missionMocks';

interface MissionItemProps {
  mission: Mission;
}

export default function MissionItem({ mission }: MissionItemProps) {
  const { id, title, thumbnail } = mission;

  return (
    <Link to={`/missions/${id}`}>
      <S.MissionItemContainer>
        <S.MissionThumbnailImg src={thumbnail} alt={title} />

        <S.MissionDescription>
          <S.MissionTitle>[미션] {title}</S.MissionTitle>

          <S.TagWrapper>
            <S.PopularTag>🔥 인기 미션</S.PopularTag>
            <S.BackendTag>☕️ JAVA</S.BackendTag>
            <S.InsuranceTag>🔒 리뷰 100% 보장</S.InsuranceTag>
          </S.TagWrapper>
          <S.HorizontalLine />
          <S.MissionPrice>무료</S.MissionPrice>
        </S.MissionDescription>
      </S.MissionItemContainer>
    </Link>
  );
}
