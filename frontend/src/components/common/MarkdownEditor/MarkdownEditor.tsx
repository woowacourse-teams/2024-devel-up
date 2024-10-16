import * as S from './TextArea.styled';

interface MarkdownEditorProps {
  type?: 'Default';
  size?: 'Default';
  danger?: boolean;
  dangerMessage?: string;
  onChange: (v?: string) => void;
  value: string;
}

export default function MarkdownEditor({
  type = 'Default',
  size = 'Default',
  danger = false,
  dangerMessage = '',
  ...props
}: MarkdownEditorProps) {
  return (
    <>
      <S.MarkdownEditor $type={type} $size={size} $danger={danger} {...props} />
      {danger && dangerMessage && <S.DangerText>{dangerMessage}</S.DangerText>}
    </>
  );
}
