import type { HashTag } from '@/types';
import HashTagButton from '../common/HashTagButton';
import * as S from './HashTagList.styled';
import { HASHTAGS } from '@/constants/hashTags';

interface HashTagListProps {
  hashTags: HashTag[];
  selectedHashTag: string;
  setSelectedHashTag: (name: string) => void;
}

export default function HashTagList({
  hashTags,
  selectedHashTag,
  setSelectedHashTag,
}: HashTagListProps) {
  return (
    <S.HashTagListContainer>
      {hashTags.map(({ id, name }) => {
        const isSelected = name === selectedHashTag;
        return (
          <HashTagButton
            isSelected={isSelected}
            onClick={() => setSelectedHashTag(isSelected ? HASHTAGS.all : name)}
            key={id}
          >
            {name}
          </HashTagButton>
        );
      })}
    </S.HashTagListContainer>
  );
}
