import MissionList from '@/components/MissionList';
import * as S from './MissionListPage.styled';
import useMissions from '@/hooks/useMissions';
import useHashTags from '@/hooks/useHashTags';
import HashTagList from '@/components/HashTagList';
import { useState } from 'react';
import { HASHTAGS } from '@/constants/hashTags';

export default function MissionListPage() {
  const [selectedHashTag, setSelectedHashTag] = useState(HASHTAGS.all);
  const { data: allMissions } = useMissions(selectedHashTag);
  const { data: allHashTags } = useHashTags();

  return (
    <S.MissionListPageContainer>
      <S.TitleWrapper>
        <S.MissionListTitle>🎯 지금 참여할 수 있는 미션</S.MissionListTitle>
        <S.Subtitle>미션에 참여하고 의견을 주고받을 수 있어요!</S.Subtitle>
      </S.TitleWrapper>
      <HashTagList
        hashTags={allHashTags}
        setSelectedHashTag={setSelectedHashTag}
        selectedHashTag={selectedHashTag}
      />
      <MissionList missions={allMissions} />
    </S.MissionListPageContainer>
  );
}
