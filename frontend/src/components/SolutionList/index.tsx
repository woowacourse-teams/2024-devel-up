import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import InfoCard from '@/components/common/InfoCard';
import * as S from './SolutionList.styled';
import useSolutionSummaries from '@/hooks/useSolutionSummaries';
import type { HashTag } from '@/types';
import type { SelectedMissionType } from '@/types/mission';
import NoContentWithoutButton from '../common/NoContent/NoContentWithoutButton';
import { usePagination } from '@/hooks/usePagination';
import { HASHTAGS } from '@/constants/hashTags';
import PageButtons from '../common/PageButtons';

interface SolutionListProps {
  selectedMission: SelectedMissionType | null;
  selectedHashTag: HashTag | null;
}

export default function SolutionList({ selectedMission, selectedHashTag }: SolutionListProps) {
  const {
    currentPage,
    setTotalPages,
    goToPage,
    goToPreviousGroup,
    goToNextGroup,
    pageNumbers,
    hasPreviousGroup,
    hasNextGroup,
  } = usePagination();
  const { solutionSummaries } = useSolutionSummaries({
    mission: selectedMission?.title ?? HASHTAGS.all,
    hashTag: selectedHashTag?.name ?? HASHTAGS.all,
    page: currentPage,
    onPageInfoUpdate: (totalPagesFromServer) => {
      setTotalPages(totalPagesFromServer);
    },
  });

  return (
    <>
      <S.SolutionList>
        {solutionSummaries.length > 0 ? (
          solutionSummaries.map(({ id, thumbnail, title, description, hashTags }) => (
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
          ))
        ) : (
          <NoContentWithoutButton type="solution" />
        )}
      </S.SolutionList>
      {solutionSummaries.length > 0 && (
        <PageButtons
          goToNextGroup={goToNextGroup}
          goToPage={goToPage}
          goToPreviousGroup={goToPreviousGroup}
          pageNumbers={pageNumbers}
          hasPreviousGroup={hasPreviousGroup}
          hasNextGroup={hasNextGroup}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
