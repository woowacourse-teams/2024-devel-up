import { useRef, useState } from 'react';
import type {
  UseDeleteCommentMutation,
  UsePatchCommentMutation,
  UsePostCommentMutation,
} from '../../CommentForm/types';
import * as S from '../CommentList.styled';
import CommentReplyList from './CommentReplyList';
import type { Comment, SolutionComment } from '@/types';
import CommentSubmitForm from '../../CommentSubmitForm';

interface CommentReplySectionProps {
  parentComment: Comment;
  isLoggedIn: boolean;
  usePostCommentMutation: UsePostCommentMutation;
  usePatchCommentMutation: UsePatchCommentMutation;
  useDeleteCommentMutation: UseDeleteCommentMutation;
}

export default function CommentReplySection({
  parentComment,
  isLoggedIn,
  usePostCommentMutation,
  usePatchCommentMutation,
  useDeleteCommentMutation,
}: CommentReplySectionProps) {
  const replyButtonAreaRef = useRef<HTMLDivElement>(null);

  const { isDeleted: isParentDeleted, id: parentId, replies } = parentComment;

  const postId = getCommentPostId(parentComment);

  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

  const toggleReplyFormOpen = () => {
    setIsReplyFormOpen((prevState) => !prevState);

    if (!isReplyFormOpen) {
      setTimeout(() =>
        replyButtonAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      );
    }
  };

  return (
    <S.CommentReplySectionContainer>
      {!isLoggedIn && !isParentDeleted && (
        <>
          <S.ReplyWriteButton onClick={toggleReplyFormOpen}>답글</S.ReplyWriteButton>
        </>
      )}
      <CommentReplyList
        commentReplies={replies}
        usePatchCommentMutation={usePatchCommentMutation}
        useDeleteCommentMutation={useDeleteCommentMutation}
      />
      <div ref={replyButtonRef} />
      {isReplyFormOpen && (
        <S.CommentReplyFormWrapper>
          <CommentSubmitForm
            postId={postId}
            parentCommentId={parentId}
            usePostCommentMutation={usePostCommentMutation}
          />
        </S.CommentReplyFormWrapper>
      )}
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
