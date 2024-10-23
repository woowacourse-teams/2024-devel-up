import DiscussionListContent from '@/components/DiscussionList/DiscussionListContent';
import * as S from './DiscussionListPage.styled';
import DiscussionListHeader from '@/components/DiscussionList/DiscussionListHeader';
import { useState, useEffect, useRef } from 'react';
import TagList from '@/components/common/TagList';
import useHashTags from '@/hooks/useHashTags';
import type { HashTag } from '@/types';
import useMissions from '@/hooks/useMissions';
import type { SelectedMissionType } from '@/types/mission';
import { usePagination } from '@/hooks/usePagination';
import { HASHTAGS } from '@/constants/hashTags';
import PageButtons from '@/components/common/PageButtons';
import useDiscussions from '@/hooks/useDiscussions';
import SpinnerSuspense from '@/components/common/SpinnerSuspense';

export default function DiscussionListPage() {
  const [selectedMission, setSelectedMission] = useState<SelectedMissionType | null>(null);
  const [selectedHashTag, setSelectedHashTag] = useState<HashTag | null>(null);
  const {
    currentPage,
    setTotalPages,
    goToPage,
    goToPreviousGroup,
    goToNextGroup,
    pageNumbers,
    hasPreviousGroup,
    hasNextGroup,
    handleInitializePage,
  } = usePagination();

  const prevMissionRef = useRef(selectedMission);
  const prevHashTagRef = useRef(selectedHashTag);

  useEffect(() => {
    if (prevMissionRef.current !== selectedMission || prevHashTagRef.current !== selectedHashTag) {
      handleInitializePage();
    }

    prevMissionRef.current = selectedMission;
    prevHashTagRef.current = selectedHashTag;
  }, [selectedMission, selectedHashTag, handleInitializePage]);

  const { discussions } = useDiscussions({
    mission: selectedMission?.title ?? HASHTAGS.all,
    hashTag: selectedHashTag?.name ?? HASHTAGS.all,
    page: currentPage,
    onPageInfoUpdate: (totalPagesFromServer: number) => {
      setTotalPages(totalPagesFromServer);
    },
  });
  const { data: allHashTags } = useHashTags();

  const { missions } = useMissions();

  return (
    <S.DiscussionListPageContainer>
      <DiscussionListHeader />
      <S.TagListWrapper>
        <TagList
          tags={missions}
          setSelectedTag={setSelectedMission}
          selectedTag={selectedMission}
          keyName="title"
          variant="danger"
        />
        <TagList
          tags={allHashTags}
          setSelectedTag={setSelectedHashTag}
          selectedTag={selectedHashTag}
          keyName="name"
        />
      </S.TagListWrapper>
      <SpinnerSuspense>
        <DiscussionListContent discussions={discussions} />
        {discussions.length > 0 && (
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
      </SpinnerSuspense>
    </S.DiscussionListPageContainer>
  );
}
