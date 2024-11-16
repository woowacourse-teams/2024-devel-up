import DiscussionTitle from './DiscussionTitle';
import DiscussionDescription from './DiscussionDescription';
import SubmitButton from '../MissionSubmit/SubmitButton';
import TagMultipleList from '../common/TagMultipleList';
import TagList from '@/components/common/TagList';
import * as S from './DiscussionSubmit.styled';
import { ERROR_MESSAGE } from '@/constants/messages';
import { useDiscussionSubmitHandlers } from '@/hooks/useSubmitDiscussionHandlers';

export default function DiscussionSubmit() {
  const {
    missions,
    allHashTags,
    selectedHashTags,
    setSelectedHashTags,
    selectedMission,
    setSelectedMission,
    discussionTitle,
    description,
    handleDiscussionTitle,
    handleMarkDownDescription,
    isDiscussionTitleError,
    isValidDiscussionTitle,
    isDescriptionError,
    handleFormSubmit,
  } = useDiscussionSubmitHandlers();

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
