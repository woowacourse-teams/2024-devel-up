import type { Mission } from '@/types';
import * as S from './MissionList.styled';
import { Link } from 'react-router-dom';
import InfoCard from '@/components/common/InfoCard';
import NoContentWithoutButton from '../common/NoContent/NoContentWithoutButton';

interface MissionListProps {
  missions: Mission[];
}

export default function MissionList({ missions }: MissionListProps) {
  return (
    <>
      {missions.length > 0 ? (
        <S.MissionList>
          {missions.map(({ id, thumbnail, title, hashTags, summary }) => (
            <S.MissionItemWrapper key={id}>
              <Link to={`/missions/${id}`} draggable={false}>
                <InfoCard
                  id={id}
                  thumbnailSrc={thumbnail}
                  title={title}
                  hashTags={hashTags}
                  description={summary}
                  thumbnailFallbackText="Mission"
                />
              </Link>
            </S.MissionItemWrapper>
          ))}
        </S.MissionList>
      ) : (
        <NoContentWithoutButton type="mission" />
      )}
    </>
  );
}
