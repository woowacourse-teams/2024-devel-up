import { useState } from 'react';
import type { UsePostCommentMutation } from './CommentForm/types';
import { CommentForm } from './CommentForm';

interface CommentSubmitFormProps {
  postId: number;
  parentCommentId?: number;
  usePostCommentMutation: UsePostCommentMutation;
}

export default function CommentSubmitForm({
  postId,
  parentCommentId,
  usePostCommentMutation,
}: CommentSubmitFormProps) {
  const [comment, setComment] = useState('');

  const resetComment = () => setComment('');

  const { mutate: postCommentMutation } = usePostCommentMutation(resetComment);

  const handleChangeComment = (value?: string) => {
    setComment(value || '');
  };

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postCommentMutation({ postId, body: { content: comment, parentCommentId } });
  };

  return (
    <CommentForm content={comment} onSubmit={handleSubmitComment} onChange={handleChangeComment} />
  );
}
