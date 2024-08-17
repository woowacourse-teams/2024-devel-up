import type { Mission } from '@/types';
import * as S from './MissionList.styled';
import { Link } from 'react-router-dom';
import InfoCard from '@/components/common/InfoCard';
import Button from '../common/Button/Button';

interface MissionListProps {
  missions: Mission[];
}

export default function MissionList({ missions }: MissionListProps) {
  return (
    <S.MissionList>
      <Button>123</Button>
      {missions.map(({ id, thumbnail, title, hashTags }) => (
        <Link key={id} to={`/missions/${id}`} draggable={false}>
          <InfoCard
            id={id}
            thumbnailSrc={thumbnail}
            title={title}
            hashTags={hashTags}
            thumbnailFallbackText="Mission"
          />
        </Link>
      ))}
    </S.MissionList>
  );
}
