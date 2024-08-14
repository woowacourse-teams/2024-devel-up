import type { CommentReply } from '@/types';
import CommentReplyItem from './CommentReplyItem';
import * as S from './CommentList.styled';

interface CommentReplyListProps {
  commentReplies: CommentReply[];
}

export default function CommentReplyList({ commentReplies }: CommentReplyListProps) {
  return (
    <S.CommentReplyListContainer>
      {commentReplies.map((reply) => (
        <CommentReplyItem key={reply.id} commentReply={reply} />
      ))}
    </S.CommentReplyListContainer>
  );
}
