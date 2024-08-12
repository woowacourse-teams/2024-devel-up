import type { MissionResponse } from '@/types';
import * as S from './MissionList.styled';
import { Link } from 'react-router-dom';
import InfoCard from '@/components/common/InfoCard';

interface MissionListProps {
  missions: MissionResponse[];
}

export default function MissionList({ missions }: MissionListProps) {
  return (
    <S.MissionList>
      {missions.map(({ id, thumbnail, title }) => (
        <Link key={id} to={`/missions/${id}`}>
          <InfoCard
            id={id}
            thumbnailSrc={thumbnail}
            title={title}
            thumbnailFallbackText="Mission"
          />
        </Link>
      ))}
    </S.MissionList>
  );
}
