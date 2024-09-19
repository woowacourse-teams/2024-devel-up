import { useSubmitDiscussion } from '@/hooks/useSubmitDiscussion';
import DiscussionTitle from './DiscussionTitle';
import DiscussionDescription from './DiscussionDescription';
import SubmitButton from '../MissionSubmit/SubmitButton';
import useHashTags from '@/hooks/useHashTags';
import { useState } from 'react';
import useMissions from '@/hooks/useMissions';
import TagMultipleList from '../common/TagMultipleList';
import type { HashTag } from '@/types';
import TagList from '../common/TagList';
import * as S from './DiscussionSubmit.style';

export default function DiscussionSubmit() {
  const { data: allHashTags } = useHashTags();
  const { data: allMissions } = useMissions();
  const [selectedHashTags, setSelectedHashTags] = useState<HashTag[]>([]);
  const [selectedMission, setSelectedMission] = useState<{ id: number; title: string } | null>(
    null,
  );

  const hashTagIds = selectedHashTags.map((tag) => tag.id);
  const useSubmitDiscussionData = {
    hashTagIds,
    ...(selectedMission?.id && { missionId: selectedMission?.id }),
  };

  const {
    discussionTitle,
    isDiscussionTitleError,
    handleDiscussionTitle,
    isDescriptionError,
    handleDescription,
    handleSubmitSolution,
  } = useSubmitDiscussion(useSubmitDiscussionData);

  return (
    <S.DiscussionSubmitContainer>
      <S.DiscussionTagListWrapper>
        <TagList
          tags={allMissions}
          selectedTag={selectedMission}
          setSelectedTag={setSelectedMission}
          variant="danger"
          keyName="title"
        />
        <TagMultipleList
          tags={allHashTags}
          selectedTags={selectedHashTags}
          setSelectedTags={setSelectedHashTags}
          keyName="name"
        />
      </S.DiscussionTagListWrapper>

      <form onSubmit={handleSubmitSolution}>
        <DiscussionTitle
          value={discussionTitle}
          onChange={handleDiscussionTitle}
          danger={isDiscussionTitleError}
        />
        <DiscussionDescription
          danger={isDescriptionError}
          onChange={handleDescription}
          placeholder="내용을 입력해 주세요."
        />
        <SubmitButton />
      </form>
    </S.DiscussionSubmitContainer>
  );
}
