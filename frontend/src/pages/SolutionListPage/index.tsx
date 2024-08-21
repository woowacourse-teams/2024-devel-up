import * as S from './SolutionListPage.styled';
import useSolutionSummaries from '@/hooks/useSolutionSummaries';
import InfoCard from '@/components/common/InfoCard';
import HashTagList from '@/components/HashTagList';
import useHashTags from '@/hooks/useHashTags';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { HASHTAGS } from '@/constants/hashTags';
import { useState } from 'react';

export default function SolutionListPage() {
  const [selectedHashTag, setSelectedHashTag] = useState(HASHTAGS.all);

  const { data: solutionSummaries } = useSolutionSummaries(selectedHashTag);
  const { data: allHashTags } = useHashTags();

  return (
    <S.SolutionListPageContainer>
      <S.TitleWrapper>
        <S.SolutionTitle>💡 다른 사람의 풀이</S.SolutionTitle>
        <S.Subtitle>다른 사람이 푼 풀이도 확인해보세요!</S.Subtitle>
      </S.TitleWrapper>
      <HashTagList
        hashTags={allHashTags}
        setSelectedHashTag={setSelectedHashTag}
        selectedHashTag={selectedHashTag}
      />
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
    </S.SolutionListPageContainer>
  );
}
