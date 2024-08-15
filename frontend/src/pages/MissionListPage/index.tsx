import MissionList from '@/components/MissionList';
import * as S from './MissionListPage.styled';
import useMissions from '@/hooks/useMissions';
import useHashTags from '@/hooks/useHashTags';
import HashTagList from '@/components/HashTagList';
import useToggleHashTag from '@/hooks/useToggleHashTag';

export default function MissionListPage() {
  const { selectedHashTag, setSelectedHashTag } = useToggleHashTag();
  const { data: allMissions } = useMissions(selectedHashTag);
  const { data: allHashTags } = useHashTags();

  return (
    <S.MissionListPageContainer>
      <S.MissionListTitle>지금 참여할 수 있는 미션</S.MissionListTitle>
      <HashTagList
        hashTags={allHashTags}
        setSelectedHashTag={setSelectedHashTag}
        selectedHashTag={selectedHashTag}
      />
      <MissionList missions={allMissions} />
    </S.MissionListPageContainer>
  );
}
