import { useState } from 'react';
import usePostCommentMutation from '@/hooks/usePostCommentMutation';
import * as S from './CommentForm.styled';
import { commands } from '@uiw/react-md-editor';

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
        preview="edit"
        visibleDragbar={false}
        onChange={(v?: string) => setComment(v || '')}
        value={comment}
        commands={[
          commands.bold,
          commands.italic,
          commands.strikethrough,
          commands.codeBlock,
          commands.image,
        ]}
        extraCommands={[commands.codeEdit, commands.codeLive]}
      />
      <S.StartFromRight>
        <S.CommentButton>제출</S.CommentButton>
      </S.StartFromRight>
    </S.CommentForm>
  );
}
