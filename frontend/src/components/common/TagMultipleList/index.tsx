import TagButton, { type TagButtonVariant } from '../TagButton';
import * as S from './TagMultipleList.styled';

interface TagMultipleListProps<T> {
  tags: T[];
  selectedTags: T[];
  setSelectedTags: (updatedSelectedTags: T[]) => void;
  variant?: TagButtonVariant;
  keyName: keyof T;
}

export default function TagMultipleList<T extends { id: number }>({
  tags,
  selectedTags,
  setSelectedTags,
  variant = 'primary',
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
    <S.TagMultipleListContainer>
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
            {name}
          </TagButton>
        );
      })}
    </S.TagMultipleListContainer>
  );
}
