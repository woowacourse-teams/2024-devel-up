import MissionDetailButtons from '@/components/MissionDetail/MissionDetailButtons';
import MissionDetailContent from '@/components/MissionDetail/MissionDetailContent';
import MissionDetailHeader from '@/components/MissionDetail/MissionDetailHeader';
import { useParams } from 'react-router-dom';
import * as S from './MissionDetailPage.styled';
import useMission from '@/hooks/useMission';

export default function MissionDetailPage() {
  const { id } = useParams();
  const { data: missionData } = useMission(Number(id));

  return (
    <S.MissionDetailPageContainer>
      <S.MissionDetailInnerWrapper>
        <MissionDetailHeader
          title={missionData.title}
          thumbnail={missionData.thumbnail}
          language={missionData.language}
          hashTags={missionData.hashTags}
        />
        <MissionDetailButtons
          id={Number(missionData.id)}
          missionUrl={missionData.url}
          isStarted={missionData.isStarted}
        />
        <MissionDetailContent description={missionData.description} />
      </S.MissionDetailInnerWrapper>
    </S.MissionDetailPageContainer>
  );
}
