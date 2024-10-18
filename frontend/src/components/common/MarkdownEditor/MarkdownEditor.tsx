import * as S from './TextArea.styled';

interface MarkdownEditorProps {
  id?: string;
  type?: 'Default';
  size?: 'Default';
  danger?: boolean;
  dangerMessage?: string;
  onChange: (v?: string) => void;
  value: string;
}

export default function MarkdownEditor({
  id,
  type = 'Default',
  size = 'Default',
  danger = false,
  dangerMessage = '',
  ...props
}: MarkdownEditorProps) {
  return (
    <>
      <S.MarkdownEditor
        aria-label="마크다운 에디터"
        textareaProps={{ id }}
        $type={type}
        $size={size}
        $danger={danger}
        {...props}
      />
      {danger && dangerMessage && <S.DangerText>{dangerMessage}</S.DangerText>}
    </>
  );
}
