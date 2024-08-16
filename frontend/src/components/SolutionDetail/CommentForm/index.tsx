import { useState } from 'react';
import usePostCommentMutation from '@/hooks/usePostCommentMutation';
import * as S from './CommentForm.styled';

interface CommentFormProps {
  solutionId: number;
  parentCommentId?: number;
}

export default function CommentForm({ solutionId, parentCommentId }: CommentFormProps) {
  const [comment, setComment] = useState('');

  const resetComment = () => setComment('');

  const { mutate: postCommentMutation } = usePostCommentMutation(resetComment);

  const onSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postCommentMutation({ solutionId, body: { content: comment, parentCommentId } });
  };

  return (
    <S.CommentForm onSubmit={onSubmitComment}>
      <S.MDEditor
        height="fit-content"
        maxHeight={200}
        preview="edit"
        onChange={(v?: string) => setComment(v || '')}
        value={comment}
      />
      <S.StartFromRight>
        <S.CommentButton>작성하기</S.CommentButton>
      </S.StartFromRight>
    </S.CommentForm>
  );
}
