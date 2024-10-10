import { useState } from 'react';
import type { UsePatchCommentMutation } from './CommentForm/types';
import { CommentForm } from './CommentForm';

interface CommentPatchFormProps {
  initialContent: string;
  commentId: number;
  usePatchCommentMutation: UsePatchCommentMutation;
  onSubmit: () => void;
}

export default function CommentPatchForm({
  initialContent,
  commentId,
  usePatchCommentMutation,
  onSubmit,
}: CommentPatchFormProps) {
  const [comment, setComment] = useState(initialContent);

  const resetComment = () => setComment('');

  const { mutate: patchCommentMutation } = usePatchCommentMutation(() => {
    resetComment();
    onSubmit();
  });

  const handleChangeComment = (value?: string) => {
    setComment(value || '');
  };

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    patchCommentMutation({ commentId, body: { content: comment } });
  };

  return (
    <CommentForm content={comment} onSubmit={handleSubmitComment} onChange={handleChangeComment} />
  );
}
