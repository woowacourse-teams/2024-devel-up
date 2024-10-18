import * as S from './OneWord.styled';
import MarkdownEditor from '../common/MarkdownEditor/MarkdownEditor';

interface OneWordProps {
  danger: boolean;
  dangerMessage?: string;
  value: string;
  onChange: (v?: string) => void;
}

export default function OneWord({ ...props }: OneWordProps) {
  return (
    <S.Container>
      <S.Title htmlFor="description">구현 방식에 대한 설명</S.Title>
      <MarkdownEditor id="description" {...props} />
    </S.Container>
  );
}
