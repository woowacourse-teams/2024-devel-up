import { useSubmitDiscussion } from '@/hooks/useSubmitDiscussion';
import DiscussionTitle from './DiscussionTitle';
import DiscussionDescription from './DiscussionDescription';
import SubmitButton from '../MissionSubmit/SubmitButton';
import useHashTags from '@/hooks/useHashTags';
import { useCallback, useEffect, useState } from 'react';
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

  // 초기 데이터 설정 함수
  const initializeFormValues = useCallback(() => {
    if (!isEditMode || member.id !== userInfo?.id) return;

    if (inputTitle) {
      handleDiscussionTitle({
        target: { value: inputTitle },
      } as React.ChangeEvent<HTMLInputElement>);
    }

    if (inputContent) {
      handleDescription({
        target: { value: inputContent },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    }

    if (inputMission) {
      setSelectedMission({
        id: inputMission.id,
        title: inputMission.title,
      });
    }

    if (inputHashTags) {
      setSelectedHashTags(inputHashTags);
    }
  }, [isEditMode, inputTitle, inputContent, inputMission, inputHashTags, member.id, userInfo?.id]);

  useEffect(() => {
    initializeFormValues();
  }, [initializeFormValues]);

  // 수정 모드 제출 함수
  const handleEditSubmit = useCallback(() => {
    discussionPatchMutation({
      discussionId,
      title: discussionTitle,
      content: description,
      missionId: selectedMission?.id,
      hashTagIds,
    });
  }, [
    discussionId,
    discussionPatchMutation,
    discussionTitle,
    description,
    selectedMission?.id,
    hashTagIds,
  ]);

  // 폼 제출 핸들러
  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isEditMode && discussionId) {
        handleEditSubmit();
      } else {
        handleSubmitDiscussion(e);
      }
    },
    [isEditMode, handleEditSubmit, handleSubmitDiscussion],
  );

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
            danger={isDescriptionError}
            dangerMessage={ERROR_MESSAGE.no_content}
            onChange={handleMarkDownDescription}
          />
          <SubmitButton />
        </form>
      </section>
    </S.DiscussionSubmitContainer>
  );
}
