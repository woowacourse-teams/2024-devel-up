import MissionList from '@/components/MissionList';
import * as S from './MissionListPage.styled';
import useMissions from '@/hooks/useMissions';
import useHashTags from '@/hooks/useHashTags';
import TagList from '@/components/common/TagList';
import { useState } from 'react';
import type { HashTag } from '@/types';
import { HASHTAGS } from '@/constants/hashTags';

export default function MissionListPage() {
  const [selectedHashTag, setSelectedHashTag] = useState<HashTag | null>(null);
  const { missions } = useMissions({
    filter: selectedHashTag?.name ?? HASHTAGS.all,
  });
  const { data: allHashTags } = useHashTags();

  return (
    <S.MissionListPageContainer>
      <S.TitleWrapper>
        <S.MissionListTitle id="mission-title">🎯 지금 참여할 수 있는 미션</S.MissionListTitle>
        <S.Subtitle>미션에 참여하고 의견을 주고받을 수 있어요!</S.Subtitle>
      </S.TitleWrapper>
      <TagList
        tags={allHashTags}
        setSelectedTag={setSelectedHashTag}
        selectedTag={selectedHashTag}
        keyName="name"
        aria-labelledby="mission-title"
      />
      <MissionList missions={missions} />
    </S.MissionListPageContainer>
  );
}
