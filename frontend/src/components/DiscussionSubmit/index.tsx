import { useSubmitDiscussion } from '@/hooks/useSubmitDiscussion';
import DiscussionTitle from './DiscussionTitle';
import DiscussionDescription from './DiscussionDescription';
import SubmitButton from '../MissionSubmit/SubmitButton';

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

  return (
    <div>
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
