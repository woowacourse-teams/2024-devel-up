import * as S from './SolutionListPage.styled';
import useSolutionSummaries from '@/hooks/useSolutionSummaries';
import InfoCard from '@/components/common/InfoCard';
import HashTagList from '@/components/HashTagList';
import useToggleHashTag from '@/hooks/useToggleHashTag';
import useHashTags from '@/hooks/useHashTags';

export default function SolutionListPage() {
  const { selectedHashTag, setSelectedHashTag } = useToggleHashTag();
  const { data: solutionSummaries } = useSolutionSummaries(selectedHashTag);
  const { data: allHashTags } = useHashTags();

  return (
    <S.SolutionListPageContainer>
      <S.SolutionTitle>💡 Solutions</S.SolutionTitle>
      <HashTagList
        hashTags={allHashTags}
        setSelectedHashTag={setSelectedHashTag}
        selectedHashTag={selectedHashTag}
      />
      <S.SolutionList>
        {solutionSummaries.map(({ id, thumbnail, title, description, hashTags }) => (
          <InfoCard
            key={id}
            id={id}
            thumbnailSrc={thumbnail}
            title={title}
            hashTags={hashTags}
            description={description}
            thumbnailFallbackText="Solution"
          />
        ))}
      </S.SolutionList>
    </S.SolutionListPageContainer>
  );
}
