import TagButton, { type TagButtonVariant } from '../TagButton';
import * as S from './TagList.styled';
import { HASHTAGS } from '@/constants/hashTags';

interface TagListProps<T> {
  tags: T[];
  selectedTag: T;
  setSelectedTag: (tag: T) => void;
  variant?: TagButtonVariant;
  keyName: keyof T;
}

export default function TagList<T extends { id: number }>({
  tags,
  selectedTag,
  setSelectedTag,
  variant,
  keyName,
}: TagListProps<T>) {
  return (
    <S.TagListContainer>
      {tags.map((tag) => {
        const name = tag[keyName] as string;
        const isSelected = tag.id === selectedTag.id;
        return (
          <TagButton
            key={tag.id}
            isSelected={isSelected}
            onClick={() =>
              setSelectedTag(isSelected ? ({ id: 0, [keyName]: HASHTAGS.all } as T) : tag)
            }
            variant={variant}
          >
            {name}
          </TagButton>
        );
      })}
    </S.TagListContainer>
  );
}
