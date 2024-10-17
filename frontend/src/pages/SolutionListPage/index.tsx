import * as S from './SolutionListPage.styled';
import TagList from '@/components/common/TagList';
import useHashTags from '@/hooks/useHashTags';

import { useState } from 'react';
import SolutionList from '@/components/SolutionList';
import type { SelectedMissionType } from '@/types/mission';
import useMissions from '@/hooks/useMissions';
import SpinnerSuspense from '@/components/common/SpinnerSuspense';

export default function SolutionListPage() {
  const [selectedMission, setSelectedMission] = useState<SelectedMissionType | null>(null);
  const [selectedHashTag, setSelectedHashTag] = useState<{ id: number; name: string } | null>(null);

  const { data: allHashTags } = useHashTags();
  const { missions } = useMissions();

  return (
    <S.SolutionListPageContainer>
      <S.TitleWrapper>
        <S.SolutionTitle>💡 풀이</S.SolutionTitle>
        <S.Subtitle>다른 사람이 푼 풀이도 확인해보세요!</S.Subtitle>
      </S.TitleWrapper>
      <TagList
        tags={missions}
        setSelectedTag={setSelectedMission}
        selectedTag={selectedMission}
        keyName="title"
        variant="danger"
      />
      <TagList
        tags={allHashTags}
        setSelectedTag={setSelectedHashTag}
        selectedTag={selectedHashTag}
        keyName="name"
      />
      <SpinnerSuspense>
        <SolutionList selectedMission={selectedMission} selectedHashTag={selectedHashTag} />
      </SpinnerSuspense>
    </S.SolutionListPageContainer>
  );
}
