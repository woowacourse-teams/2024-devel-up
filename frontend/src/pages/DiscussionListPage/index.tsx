import DiscussionList from '@/components/DiscussionList';
import * as S from './DiscussionListPage.styled';
import { useState } from 'react';
import useDiscussions from '@/hooks/useDiscussions';
import TagList from '@/components/common/TagList';
import useHashTags from '@/hooks/useHashTags';
import type { HashTag } from '@/types';
import useMissions from '@/hooks/useMissions';

interface SelectedMissionType {
  id: number;
  title: string;
}

export default function DiscussionListPage() {
  const [selectedMission, setSelectedMission] = useState<SelectedMissionType | null>(null);
  const [selectedHashTag, setSelectedHashTag] = useState<HashTag | null>(null);

  const { data: discussions } = useDiscussions(selectedMission?.title, selectedHashTag?.name);
  const { data: allHashTags } = useHashTags();
  const { data: allMissions } = useMissions(selectedHashTag?.name); // TODO: 미션 필터링용 미션 리스트 API 나오면 변경 필요

  return (
    <S.DiscussionListPageContainer>
      <S.DiscussionListTitle>💬 Discussion</S.DiscussionListTitle>
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
      <DiscussionList discussions={discussions} />
    </S.DiscussionListPageContainer>
  );
}
