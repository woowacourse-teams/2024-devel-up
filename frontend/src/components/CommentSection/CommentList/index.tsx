import type { Comment } from '@/types';
import * as S from './CommentList.styled';
import CommentItem from './CommentItem';
import type { UsePostCommentMutation } from '../CommentForm/types';

interface CommentListProps {
  comments: Comment[];
  usePostCommentMutation: UsePostCommentMutation;
}

export default function CommentList({ comments, usePostCommentMutation }: CommentListProps) {
  return (
    <S.CommentListContainer>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          usePostCommentMutation={usePostCommentMutation}
        />
      ))}
    </S.CommentListContainer>
  );
}
