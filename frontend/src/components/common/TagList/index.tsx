import TagButton, { type TagButtonVariant } from '../TagButton';
import * as S from './TagList.styled';

interface TagListProps<T> {
  tags: T[];
  selectedTag: T | null;
  setSelectedTag: (tag: T | null) => void;
  variant?: TagButtonVariant;
  label?: string;
  keyName: keyof T;
}

export default function TagList<T extends { id: number }>({
  tags,
  selectedTag,
  setSelectedTag,
  variant,
  label,
  keyName,
}: TagListProps<T>) {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.TagListWrapper>
        {tags.map((tag) => {
          const name = tag[keyName] as string;
          const isSelected = tag.id === selectedTag?.id;
          return (
            <TagButton
              key={tag.id}
              isSelected={isSelected}
              onClick={() => setSelectedTag(isSelected ? null : tag)}
              variant={variant}
            >
              {name}
            </TagButton>
          );
        })}
      </S.TagListWrapper>
    </S.Container>
  );
}
