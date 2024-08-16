import type { Comment } from '@/types';
import * as S from './CommentList.styled';
import CommentReplyList from './CommentReplyList';
import CommentForm from '../CommentForm';
import { useState } from 'react';
import useUserInfo from '@/hooks/useUserInfo';
import CommentUserInfo from './CommentUserInfo';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const { id, solutionId, content, member, replies } = comment;

  const { data: userInfo } = useUserInfo();

  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);

  const toggleReplyFormOpen = () => {
    setIsReplyFormOpen((prevState) => !prevState);
  };

  return (
    <S.CommentItemContainer>
      <CommentUserInfo member={member} />
      <S.CommentContent source={content} />
      <S.CommentReplyWrapper>
        {userInfo && (
          <S.ReplyWriteButton onClick={toggleReplyFormOpen}>답글 작성</S.ReplyWriteButton>
        )}
        {userInfo && isReplyFormOpen && (
          <S.CommentReplyFormWrapper>
            <CommentForm solutionId={solutionId} parentCommentId={id} />
          </S.CommentReplyFormWrapper>
        )}
        <CommentReplyList commentReplies={replies} />
      </S.CommentReplyWrapper>
    </S.CommentItemContainer>
  );
}
