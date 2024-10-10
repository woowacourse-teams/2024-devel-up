import TagButton, { type TagButtonVariant } from '../TagButton';
import * as S from './TagMultipleList.styled';

interface TagMultipleListProps<T> {
  tags: T[];
  selectedTags: T[];
  setSelectedTags: (updatedSelectedTags: T[]) => void;
  variant?: TagButtonVariant;
  label?: string;
  keyName: keyof T;
}

export default function TagMultipleList<T extends { id: number }>({
  tags,
  selectedTags,
  setSelectedTags,
  variant = 'default',
  label,
  keyName,
}: TagMultipleListProps<T>) {
  const handleSelectedTags = (tag: T) => {
    const isSelected = selectedTags.some((selectedTag) => selectedTag.id === tag.id);

    if (isSelected) {
      const updatedSelectedTags = selectedTags.filter((selectedTag) => selectedTag.id !== tag.id);
      setSelectedTags(updatedSelectedTags);
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.TagMultipleListWrapper>
        {tags.map((tag) => {
          const name = tag[keyName] as string;
          const isSelected = selectedTags.some((selectedTag) => selectedTag.id === tag.id);
          return (
            <TagButton
              key={tag.id}
              isSelected={isSelected}
              onClick={() => handleSelectedTags(tag)}
              variant={variant}
            >
              # {name}
            </TagButton>
          );
        })}
      </S.TagMultipleListWrapper>
    </S.Container>
  );
}
