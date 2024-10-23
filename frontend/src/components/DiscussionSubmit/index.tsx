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
import * as S from './DiscussionSubmit.styled';
import { useSearchParams } from 'react-router-dom';
import useDiscussion from '@/hooks/useDiscussion';
import useUserInfo from '@/hooks/useUserInfo';
import { useUpdateDiscussion } from '@/hooks/useUpdateDiscussion';
import { ERROR_MESSAGE } from '@/constants/messages';

export default function DiscussionSubmit() {
  const [searchParams] = useSearchParams();
  const discussionId = Number(searchParams.get('discussionId')) ?? null;
  const isEditMode = !!discussionId;

  const { data: discussion } = useDiscussion(discussionId);
  const { data: allHashTags } = useHashTags();
  const [selectedHashTags, setSelectedHashTags] = useState<HashTag[]>([]);
  const [selectedMission, setSelectedMission] = useState<{ id: number; title: string } | null>(
    null,
  );

  const { missions } = useMissions();

  const { data: userInfo } = useUserInfo();
  const { discussionPatchMutation } = useUpdateDiscussion(discussionId);

  const hashTagIds = selectedHashTags.map((tag) => tag.id);
  const useSubmitDiscussionData = {
    hashTagIds,
    ...(selectedMission?.id && { missionId: selectedMission?.id }),
  };

  const {
    description,
    discussionTitle,
    isDiscussionTitleError,
    isValidDiscussionTitle,
    isValidDescription,
    handleDiscussionTitle,
    handleMarkDownDescription,
    isDescriptionError,
    handleDescription,
    handleSubmitDiscussion,
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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditMode && discussionId) {
      discussionPatchMutation({
        discussionId,
        title: discussionTitle,
        content: description,
        missionId: selectedMission?.id,
        hashTagIds: selectedHashTags.map((hashTag) => hashTag.id),
      });
    } else {
      handleSubmitDiscussion(e);
    }
  };

  return (
    <S.DiscussionSubmitContainer>
      <S.DiscussionTagListWrapper>
        <TagList
          tags={missions}
          selectedTag={selectedMission}
          setSelectedTag={setSelectedMission}
          variant="danger"
          label="미션"
          keyName="title"
        />
        <TagMultipleList
          tags={allHashTags}
          selectedTags={selectedHashTags}
          setSelectedTags={setSelectedHashTags}
          label="해시 태그"
          keyName="name"
        />
      </S.DiscussionTagListWrapper>

      <section>
        <form onSubmit={handleFormSubmit}>
          <DiscussionTitle
            value={discussionTitle}
            onChange={handleDiscussionTitle}
            danger={isDiscussionTitleError || !isValidDiscussionTitle}
          />
          <DiscussionDescription
            value={description}
            danger={isDescriptionError || !isValidDescription}
            dangerMessage={ERROR_MESSAGE.no_content}
            onChange={handleMarkDownDescription}
          />
          <SubmitButton />
        </form>
      </section>
    </S.DiscussionSubmitContainer>
  );
}
