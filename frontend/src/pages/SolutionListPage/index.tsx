import * as S from './SolutionListPage.styled';
import useSolutionSummaries from '@/hooks/useSolutionSummaries';
import InfoCard from '@/components/common/InfoCard';
import TagList from '@/components/common/TagList';
import useHashTags from '@/hooks/useHashTags';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { HASHTAGS } from '@/constants/hashTags';
import { useState } from 'react';

export default function SolutionListPage() {
  const [selectedHashTag, setSelectedHashTag] = useState({ id: 0, name: HASHTAGS.all });

  const { data: solutionSummaries } = useSolutionSummaries(selectedHashTag.name);
  const { data: allHashTags } = useHashTags();

  return (
    <S.SolutionListPageContainer>
      <S.TitleWrapper>
        <S.SolutionTitle>💡 다른 사람의 풀이</S.SolutionTitle>
        <S.Subtitle>다른 사람이 푼 풀이도 확인해보세요!</S.Subtitle>
      </S.TitleWrapper>
      <TagList
        tags={allHashTags}
        setSelectedTag={setSelectedHashTag}
        selectedTag={selectedHashTag}
        keyName="name"
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
