import type { Comment } from '@/types';
import CommentForm from './CommentForm';
import { type UsePostCommentMutation } from './CommentForm/types';
import CommentList from './CommentList';
import * as S from './CommentSection.styled';

interface CommentSectionProps {
  comments: Comment[];
  postId: number;
  usePostCommentMutation: UsePostCommentMutation;
  isLoggedIn: boolean;
}

export default function CommentSection({
  comments,
  postId,
  usePostCommentMutation,
  isLoggedIn,
}: CommentSectionProps) {
  const hasComment = comments.length > 0;

  return (
    <div>
      {(hasComment || isLoggedIn) && <S.SeparationLine />}
      <CommentList comments={comments} usePostCommentMutation={usePostCommentMutation} />
      {isLoggedIn && (
        <S.CommentFormWrapper>
          <CommentForm postId={postId} usePostCommentMutation={usePostCommentMutation} />
        </S.CommentFormWrapper>
      )}
    </div>
  );
}
