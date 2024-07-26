import * as S from './MissionList.styled';
import { Link } from 'react-router-dom';
import type { Mission } from '@/types';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';

interface MissionItemProps {
  mission: Mission;
}

export default function MissionItem({ mission }: MissionItemProps) {
  const { id, title, thumbnail } = mission;

  return (
    <Link to={`/missions/${id}`}>
      <Card
        key={id}
        thumbnailSrc={thumbnail}
        thumbnailFallbackText="Mission"
        contentElement={
          <S.MissionDescription>
            <S.MissionTitle>{title}</S.MissionTitle>
            <Badge text="JAVA ☕️" />
          </S.MissionDescription>
        }
      />
    </Link>
  );
}
