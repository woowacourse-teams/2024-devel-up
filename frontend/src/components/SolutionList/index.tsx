import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import InfoCard from '@/components/common/InfoCard';
import * as S from './SolutionList.styled';
import useSolutionSummaries from '@/hooks/useSolutionSummaries';
import type { HashTag } from '@/types';
import type { SelectedMissionType } from '@/types/mission';

interface SolutionListProps {
  selectedMission: SelectedMissionType | null;
  selectedHashTag: HashTag | null;
}

export default function SolutionList({ selectedMission, selectedHashTag }: SolutionListProps) {
  const { data: solutionSummaries } = useSolutionSummaries(
    selectedMission?.title,
    selectedHashTag?.name,
  );
  return (
    <S.SolutionList>
      {solutionSummaries.map(({ id, thumbnail, title, description, hashTags }) => (
        <Link key={id} to={`${ROUTES.solutions}/${id}`}>
          <InfoCard
            id={id}
            thumbnailSrc={thumbnail}
            title={title}
            hashTags={hashTags}
            description={description}
            thumbnailFallbackText="Solution"
          />
        </Link>
      ))}
    </S.SolutionList>
  );
}
