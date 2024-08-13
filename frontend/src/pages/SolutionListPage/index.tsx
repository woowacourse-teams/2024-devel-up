import * as S from './SolutionListPage.styled';
import useSolutionSummaries from '@/hooks/useSolutions';
import InfoCard from '@/components/common/InfoCard';

export default function SolutionListPage() {
  const { data: solutionSummaries } = useSolutionSummaries();

  return (
    <S.SolutionListPageContainer>
      <S.SolutionTitle>💡 Solutions</S.SolutionTitle>
      <S.SolutionList>
        {solutionSummaries.map(({ id, thumbnail, title, description, hashTag }) => (
          <InfoCard
            key={id}
            id={id}
            thumbnailSrc={thumbnail}
            title={title}
            hashTag={hashTag}
            description={description}
            thumbnailFallbackText="Solution"
          />
        ))}
      </S.SolutionList>
    </S.SolutionListPageContainer>
  );
}
