import { useState } from 'react';
import CommentForm from '../../CommentForm';
import type { UsePostCommentMutation } from '../../CommentForm/types';
import * as S from '../CommentList.styled';
import CommentReplyList from './CommentReplyList';
import type { Comment, SolutionComment } from '@/types';

interface CommentReplySectionProps {
  parentComment: Comment;
  isLoggedIn: boolean;
  usePostCommentMutation: UsePostCommentMutation;
}

export default function CommentReplySection({
  parentComment,
  isLoggedIn,
  usePostCommentMutation,
}: CommentReplySectionProps) {
  const { isDeleted: isParentDeleted, id: parentId, replies } = parentComment;

  const postId = getCommentPostId(parentComment);

  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

  const toggleReplyFormOpen = () => {
    setIsReplyFormOpen((prevState) => !prevState);
  };

  return (
    <S.CommentReplySectionContainer>
      {isLoggedIn && !isParentDeleted && (
        <>
          <S.ReplyWriteButton onClick={toggleReplyFormOpen}>답글</S.ReplyWriteButton>
          {isReplyFormOpen && (
            <S.CommentReplyFormWrapper>
              <CommentForm
                postId={postId}
                parentCommentId={parentId}
                usePostCommentMutation={usePostCommentMutation}
              />
            </S.CommentReplyFormWrapper>
          )}
        </>
      )}
      <CommentReplyList commentReplies={replies} />
    </S.CommentReplySectionContainer>
  );
}

function getCommentPostId(parentComment: Comment) {
  if (isSolutionComment(parentComment)) {
    return parentComment.solutionId;
  } else {
    return parentComment.discussionId;
  }
}

function isSolutionComment(comment: Comment): comment is SolutionComment {
  return (comment as SolutionComment).solutionId !== undefined;
}
