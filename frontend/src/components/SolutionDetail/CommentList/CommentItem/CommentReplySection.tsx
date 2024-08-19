import { useState } from 'react';
import CommentForm from '../../CommentForm';
import * as S from '../CommentList.styled';
import CommentReplyList from './CommentReplyList';
import type { Comment } from '@/types';

interface CommentReplySectionProps {
  parentComment: Comment;
  isLoggedIn: boolean;
}

export default function CommentReplySection({
  parentComment,
  isLoggedIn,
}: CommentReplySectionProps) {
  const { isDeleted: isParentDeleted, solutionId, id: parentId, replies } = parentComment;

  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

  const toggleReplyFormOpen = () => {
    setIsReplyFormOpen((prevState) => !prevState);
  };

  return (
    <S.CommentReplySectionContainer>
      {!isLoggedIn && !isParentDeleted && (
        <>
          <S.ReplyWriteButton onClick={toggleReplyFormOpen}>답글</S.ReplyWriteButton>
          {isReplyFormOpen && (
            <S.CommentReplyFormWrapper>
              <CommentForm solutionId={solutionId} parentCommentId={parentId} />
            </S.CommentReplyFormWrapper>
          )}
        </>
      )}
      <CommentReplyList commentReplies={replies} />
    </S.CommentReplySectionContainer>
  );
}
