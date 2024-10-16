import MissionList from '@/components/MissionList';
import * as S from './MissionListPage.styled';
import useMissions from '@/hooks/useMissions';
import useHashTags from '@/hooks/useHashTags';
import TagList from '@/components/common/TagList';
import { useState } from 'react';
import type { HashTag } from '@/types';
import { usePagination } from '@/hooks/usePagination';
import { HASHTAGS } from '@/constants/hashTags';
import PageButtons from '@/components/common/PageButtons';

export default function MissionListPage() {
  const [selectedHashTag, setSelectedHashTag] = useState<HashTag | null>(null);
  const { data: allHashTags } = useHashTags();
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
  const { missions } = useMissions({
    filter: selectedHashTag ? selectedHashTag.name : HASHTAGS.all,
    page: currentPage,
    onPageInfoUpdate: (totalPagesFromServer) => {
      setTotalPages(totalPagesFromServer);
    },
  });

  return (
    <S.MissionListPageContainer>
      <S.TitleWrapper>
        <S.MissionListTitle>🎯 지금 참여할 수 있는 미션</S.MissionListTitle>
        <S.Subtitle>미션에 참여하고 의견을 주고받을 수 있어요!</S.Subtitle>
      </S.TitleWrapper>
      <TagList
        tags={allHashTags}
        setSelectedTag={setSelectedHashTag}
        selectedTag={selectedHashTag}
        keyName="name"
      />
      <MissionList missions={missions} />
      <PageButtons
        goToNextGroup={goToNextGroup}
        goToPage={goToPage}
        goToPreviousGroup={goToPreviousGroup}
        pageNumbers={pageNumbers}
        hasPreviousGroup={hasPreviousGroup}
        hasNextGroup={hasNextGroup}
        currentPage={currentPage}
      />
    </S.MissionListPageContainer>
  );
}
