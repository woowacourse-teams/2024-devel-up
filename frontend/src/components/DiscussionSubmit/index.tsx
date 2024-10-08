import { useSubmitDiscussion } from '@/hooks/useSubmitDiscussion';
import DiscussionTitle from './DiscussionTitle';
import DiscussionDescription from './DiscussionDescription';
import SubmitButton from '../MissionSubmit/SubmitButton';
import useHashTags from '@/hooks/useHashTags';
import { useEffect, useState } from 'react';
import useMissions from '@/hooks/useMissions';
import TagMultipleList from '../common/TagMultipleList';
import type { HashTag } from '@/types';
import TagList from '@/components/common/TagList';
import * as S from './DiscussionSubmit.style';
import { useSearchParams } from 'react-router-dom';
import useDiscussion from '@/hooks/useDiscussion';
import useUserInfo from '@/hooks/useUserInfo';

export default function DiscussionSubmit() {
  const [searchParams] = useSearchParams();
  const discussionId = Number(searchParams.get('discussionId')) ?? null;
  const isEditMode = !!discussionId;

  const { data: discussion } = useDiscussion(discussionId);
  const { data: allHashTags } = useHashTags();
  const { data: allMissions } = useMissions();
  const { data: userInfo } = useUserInfo();

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
    description,
    discussionTitle,
    isDiscussionTitleError,
    handleDiscussionTitle,
    isDescriptionError,
    handleDescription,
    handleSubmitSolution,
  } = useSubmitDiscussion(useSubmitDiscussionData);

  const {
    title: inputTitle,
    content: inputContent,
    mission: inputMission,
    hashTags: inputHashTags,
    member,
  } = discussion;

  useEffect(() => {
    if (isEditMode && member.id === userInfo?.id) {
      if (inputTitle)
        handleDiscussionTitle({
          target: { value: inputTitle },
        } as React.ChangeEvent<HTMLInputElement>);
      if (inputContent)
        handleDescription({
          target: { value: inputContent },
        } as React.ChangeEvent<HTMLTextAreaElement>);
      if (inputMission)
        setSelectedMission({
          id: inputMission.id,
          title: inputMission.title,
        });
      if (inputHashTags) setSelectedHashTags(inputHashTags);
    }
  }, [isEditMode, inputTitle, inputContent, inputMission, inputHashTags, member.id, userInfo?.id]);

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
          value={description}
          danger={isDescriptionError}
          onChange={handleDescription}
          placeholder="내용을 입력해 주세요."
        />
        <SubmitButton />
      </form>
    </S.DiscussionSubmitContainer>
  );
}
