import type { Comment } from '@/types';
import * as S from './CommentList.styled';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const { content, member } = comment;

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
