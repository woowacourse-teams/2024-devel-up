import TagButton from '../TagButton';
import * as S from './TagList.styled';
import { HASHTAGS } from '@/constants/hashTags';

interface TagListProps<T> {
  tags: T[];
  selectedTag: string;
  setSelectedTag: (name: string) => void;
  keyName: keyof T;
}

export default function TagList<T extends { id: number }>({
  tags,
  selectedTag,
  setSelectedTag,
  keyName,
}: TagListProps<T>) {
  return (
    <S.TagListContainer>
      {tags.map((tag) => {
        const name = tag[keyName] as string;
        const isSelected = name === selectedTag;
        return (
          <TagButton
            key={tag.id}
            isSelected={isSelected}
            onClick={() => setSelectedTag(isSelected ? HASHTAGS.all : name)}
          >
            {name}
          </TagButton>
        );
      })}
    </S.TagListContainer>
  );
}
