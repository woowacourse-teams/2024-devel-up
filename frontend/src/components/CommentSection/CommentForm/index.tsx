import { type FormEventHandler } from 'react';
import * as S from './CommentForm.styled';
import { commands } from '@uiw/react-md-editor';

interface CommentFormProps {
  content: string;
  onChange: (value?: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function CommentForm({ content, onChange, onSubmit }: CommentFormProps) {
  return (
    <S.CommentForm onSubmit={onSubmit}>
      <S.MDEditor
        height="fit-content"
        preview="live"
        visibleDragbar={false}
        onChange={onChange}
        value={content}
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
