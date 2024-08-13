import * as S from './SolutionListPage.styled';
import useSolutionSummaries from '@/hooks/useSolutions';
import InfoCard from '@/components/common/InfoCard';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function SolutionListPage() {
  const { data: solutionSummaries } = useSolutionSummaries();

  return (
    <S.SolutionListPageContainer>
      <S.SolutionTitle>💡 Solutions</S.SolutionTitle>
      <S.SolutionList>
        {solutionSummaries.map(({ id, thumbnail, title, description }) => (
          <Link key={id} to={`${ROUTES.solutions}/${id}`}>
            <InfoCard
              id={id}
              thumbnailSrc={thumbnail}
              title={title}
              description={description}
              thumbnailFallbackText="Solution"
            />
          </Link>
        ))}
      </S.SolutionList>
    </S.SolutionListPageContainer>
  );
}
