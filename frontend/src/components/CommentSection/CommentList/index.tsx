import type { Comment } from '@/types';
import * as S from './CommentList.styled';
import CommentItem from './CommentItem';
import type {
  UseDeleteCommentMutation,
  UsePatchCommentMutation,
  UsePostCommentMutation,
} from '../CommentForm/types';

interface CommentListProps {
  comments: Comment[];
  usePostCommentMutation: UsePostCommentMutation;
  usePatchCommentMutation: UsePatchCommentMutation;
  useDeleteCommentMutation: UseDeleteCommentMutation;
}

export default function CommentList({
  comments,
  usePostCommentMutation,
  usePatchCommentMutation,
  useDeleteCommentMutation,
}: CommentListProps) {
  return (
    <S.CommentListContainer>
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem
            comment={comment}
            usePostCommentMutation={usePostCommentMutation}
            usePatchCommentMutation={usePatchCommentMutation}
            useDeleteCommentMutation={useDeleteCommentMutation}
          />
        </li>
      ))}
    </S.CommentListContainer>
  );
}
