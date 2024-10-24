import MarkdownEditor from '../common/MarkdownEditor/MarkdownEditor';
import * as S from './DiscussionSubmit.styled';

interface DiscussionDescriptionProps {
  value: string;
  onChange: (v?: string) => void;
  danger: boolean;
  dangerMessage: string;
}

export default function DiscussionDescription({
  value,
  onChange,
  danger,
  dangerMessage,
}: DiscussionDescriptionProps) {
  return (
    <S.DiscussionDescriptionContainer>
      <S.DiscussionDescriptionTitle htmlFor="description">내용</S.DiscussionDescriptionTitle>
      <MarkdownEditor
        id="description"
        value={value}
        onChange={onChange}
        danger={danger}
        dangerMessage={dangerMessage}
      />
    </S.DiscussionDescriptionContainer>
  );
}
