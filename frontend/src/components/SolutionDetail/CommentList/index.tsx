import type { Comment } from '@/types';
import * as S from './CommentList.styled';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <S.CommentListContainer>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </S.CommentListContainer>
  );
}
