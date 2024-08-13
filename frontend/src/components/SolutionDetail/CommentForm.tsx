import usePostCommentMutation from '@/hooks/usePostCommentMutation';
import * as S from './SolutionDetail.styled';
import { useState } from 'react';

interface CommentFormProps {
  solutionId?: number;
}

export default function CommentForm({ solutionId = 1 }: CommentFormProps) {
  const [comment, setComment] = useState('');

  const resetComment = () => setComment('');

  const { mutate: postCommentMutation } = usePostCommentMutation(resetComment);

  const onChangeCommentTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const onSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postCommentMutation({ solutionId, body: { content: comment } });
  };

  return (
    <S.CommentForm onSubmit={onSubmitComment}>
      <S.CommentTextArea onChange={onChangeCommentTextArea} value={comment} />
      <S.StartFromRight>
        <S.CommentButton>제출하기</S.CommentButton>
      </S.StartFromRight>
    </S.CommentForm>
  );
}
