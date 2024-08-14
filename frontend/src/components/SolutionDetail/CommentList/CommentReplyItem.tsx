import * as S from './CommentList.styled';
import type { CommentReply } from '@/types';

interface CommentReplyItemProps {
  commentReply: CommentReply;
}

export default function CommentReplyItem({ commentReply }: CommentReplyItemProps) {
  const { member, content } = commentReply;

  return (
    <S.CommentItemContainer>
      <S.UserInfoWrapper>
        <S.UserProfileImg src={member.imageUrl} />
        <S.UserName>{member.name}</S.UserName>
      </S.UserInfoWrapper>
      <S.CommentContent>{content}</S.CommentContent>
    </S.CommentItemContainer>
  );
}
