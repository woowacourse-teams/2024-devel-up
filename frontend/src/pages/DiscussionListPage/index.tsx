import DiscussionListContent from '@/components/DiscussionList/DiscussionListContent';
import * as S from './DiscussionListPage.styled';
import DiscussionListHeader from '@/components/DiscussionList/DiscussionListHeader';
import { useState } from 'react';
import useDiscussions from '@/hooks/useDiscussions';
import TagList from '@/components/common/TagList';
import useHashTags from '@/hooks/useHashTags';
import type { HashTag } from '@/types';
import useMissions from '@/hooks/useMissions';
import type { SelectedMissionType } from '@/types/mission';

export default function DiscussionListPage() {
  const [selectedMission, setSelectedMission] = useState<SelectedMissionType | null>(null);
  const [selectedHashTag, setSelectedHashTag] = useState<HashTag | null>(null);

  const { data: discussions } = useDiscussions(selectedMission?.title, selectedHashTag?.name);
  const { data: allHashTags } = useHashTags();
  const { data: allMissions } = useMissions();

  return (
    <S.DiscussionListPageContainer>
      <DiscussionListHeader />
      <S.TagListWrapper>
        <TagList
          tags={allMissions}
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
      <DiscussionListContent discussions={discussions} />
    </S.DiscussionListPageContainer>
  );
}
