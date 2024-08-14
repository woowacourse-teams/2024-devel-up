import type { Comment } from '@/types';
import * as S from './CommentList.styled';
import CommentReplyList from './CommentReplyList';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const { content, member, replies } = comment;

  return (
    <S.CommentItemContainer>
      <S.UserInfoWrapper>
        <S.UserProfileImg src={member.imageUrl} />
        <S.UserName>{member.name}</S.UserName>
      </S.UserInfoWrapper>
      <S.CommentContent>{content}</S.CommentContent>
      <CommentReplyList commentReplies={replies} />
    </S.CommentItemContainer>
  );
}
