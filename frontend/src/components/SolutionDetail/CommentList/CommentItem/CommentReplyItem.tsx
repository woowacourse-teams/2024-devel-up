import * as S from '../CommentList.styled';
import type { CommentReply } from '@/types';
import CommentInfo from './CommentInfo';

interface CommentReplyItemProps {
  commentReply: CommentReply;
}

export default function CommentReplyItem({ commentReply }: CommentReplyItemProps) {
  const { member, content, createdAt } = commentReply;

  return (
    <S.CommentReplyItemContainer>
      <CommentInfo member={member} createdAt={createdAt} />
      <S.CommentContent source={content} />
    </S.CommentReplyItemContainer>
  );
}
