import type { Comment } from '@/types';
import type {
  UseDeleteCommentMutation,
  UsePatchCommentMutation,
  UsePostCommentMutation,
} from './CommentForm/types';
import CommentList from './CommentList';
import * as S from './CommentSection.styled';
import CommentSubmitForm from './CommentSubmitForm';

interface CommentSectionProps {
  comments: Comment[];
  postId: number;
  usePostCommentMutation: UsePostCommentMutation;
  usePatchCommentMutation: UsePatchCommentMutation;
  useDeleteCommentMutation: UseDeleteCommentMutation;
  isLoggedIn: boolean;
}

export default function CommentSection({
  comments,
  postId,
  usePostCommentMutation,
  usePatchCommentMutation,
  useDeleteCommentMutation,
  isLoggedIn,
}: CommentSectionProps) {
  const hasComment = comments.length > 0;

  return (
    <div>
      {(hasComment || isLoggedIn) && <S.SeparationLine />}
      <CommentList
        comments={comments}
        usePostCommentMutation={usePostCommentMutation}
        usePatchCommentMutation={usePatchCommentMutation}
        useDeleteCommentMutation={useDeleteCommentMutation}
      />
      {!isLoggedIn && (
        <S.CommentFormWrapper>
          <CommentSubmitForm postId={postId} usePostCommentMutation={usePostCommentMutation} />
        </S.CommentFormWrapper>
      )}
    </div>
  );
}
