import * as S from '../CommentList.styled';
import type { CommentReply } from '@/types';
import CommentReplyItem from './CommentReplyItem';

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
