import * as S from './CommentList.styled';
import type { CommentReply } from '@/types';
import CommentUserInfo from './CommentUserInfo';

interface CommentReplyItemProps {
  commentReply: CommentReply;
}

export default function CommentReplyItem({ commentReply }: CommentReplyItemProps) {
  const { member, content } = commentReply;

  return (
    <S.CommentItemContainer $isReply>
      <CommentUserInfo member={member} />
      <S.CommentContent source={content} />
    </S.CommentItemContainer>
  );
}
