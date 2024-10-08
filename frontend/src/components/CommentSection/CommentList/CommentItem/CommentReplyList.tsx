import * as S from '../CommentList.styled';
import type { CommentReply } from '@/types';
import CommentReplyItem from './CommentReplyItem';
import type { UseDeleteCommentMutation, UsePatchCommentMutation } from '../../CommentForm/types';

interface CommentReplyListProps {
  commentReplies: CommentReply[];
  usePatchCommentMutation: UsePatchCommentMutation;
  useDeleteCommentMutation: UseDeleteCommentMutation;
}

export default function CommentReplyList({
  commentReplies,
  usePatchCommentMutation,
  useDeleteCommentMutation,
}: CommentReplyListProps) {
  return (
    <S.CommentReplyListContainer>
      {commentReplies.map((reply) => (
        <CommentReplyItem
          key={reply.id}
          commentReply={reply}
          usePatchCommentMutation={usePatchCommentMutation}
          useDeleteCommentMutation={useDeleteCommentMutation}
        />
      ))}
    </S.CommentReplyListContainer>
  );
}
