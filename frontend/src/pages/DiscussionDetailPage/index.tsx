import * as S from './DiscussionDetailPage.styled';
import DiscussionDetailHeader from '@/components/DiscussionDetail/DiscussionDetailHeader';
import useUserInfo from '@/hooks/useUserInfo';
import usePostDiscussionCommentMutation from '@/hooks/usePostDiscussionCommentMutation';
import CommentSection from '@/components/CommentSection';
import usePathnameAt from '@/hooks/usePathnameAt';
import useDiscussion from '@/hooks/useDiscussion';
import { useDiscussionComments } from '@/hooks/useDiscussionComments';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import DiscussionDetailBottom from '@/components/DiscussionDetail/DiscussionDetailBottom';
import useDeleteDiscussionCommentMutation from '@/hooks/useDeleteDiscussionCommentMutation';
import usePatchDiscussionCommentMutation from '@/hooks/usePatchDiscussionComment';

export default function DiscussionDetailPage() {
  const { data: userInfo } = useUserInfo();
  const discussionId = Number(usePathnameAt(-1));

  const { data: discussion } = useDiscussion(discussionId);
  const { data: comments } = useDiscussionComments(discussionId);

  const isLoggedIn = Boolean(userInfo);

  const navigate = useNavigate();

  const handleToDiscussionList = () => {
    navigate(ROUTES.discussions);
  };

  return (
    <S.DiscussionDetailPageContainer>
      <S.DiscussionDetailTitle onClick={handleToDiscussionList}>
        💬 디스커션
      </S.DiscussionDetailTitle>
      <DiscussionDetailHeader discussion={discussion} />
      <S.DiscussionDescription source={discussion.content} />
      {userInfo?.id === discussion.member.id && (
        <DiscussionDetailBottom discussionId={discussionId} />
      )}
      <CommentSection
        comments={comments}
        postId={discussionId}
        usePostCommentMutation={usePostDiscussionCommentMutation}
        usePatchCommentMutation={usePatchDiscussionCommentMutation}
        useDeleteCommentMutation={useDeleteDiscussionCommentMutation}
        isLoggedIn={isLoggedIn}
      />
    </S.DiscussionDetailPageContainer>
  );
}
