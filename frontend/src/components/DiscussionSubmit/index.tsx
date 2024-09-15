import { useSubmitDiscussion } from '@/hooks/useSubmitDiscussion';
import DiscussionTitle from './DiscussionTitle';
import DiscussionDescription from './DiscussionDescription';
import SubmitButton from '../MissionSubmit/SubmitButton';
import useHashTags from '@/hooks/useHashTags';
import { useState } from 'react';
import useMissions from '@/hooks/useMissions';
import TagMultipleList from '../common/TagMultipleList';

export default function DiscussionSubmit() {
  const {
    discussionTitle,
    isDiscussionTitleError,
    handleDiscussionTitle,
    isDescriptionError,
    handleDescription,
    handleSubmitSolution,
  } = useSubmitDiscussion({
    missionId: 1,
  });

  const { data: allHashTags } = useHashTags();
  const { data: allMissions } = useMissions();
  const [selectedHashTags, setSelectedHashTags] = useState<{ id: number; title: string }[]>([]);

  return (
    <div>
      <TagMultipleList
        tags={allMissions}
        selectedTags={selectedHashTags}
        setSelectedTags={setSelectedHashTags}
        keyName="title"
      />
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
    </div>
  );
}
