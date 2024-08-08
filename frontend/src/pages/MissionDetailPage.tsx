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
      <MissionDetailHeader
        title={missionData.title}
        thumbnail={missionData.thumbnail}
        language={missionData.language}
      />
      <MissionDetailButtons id={Number(missionData.id)} missionUrl={missionData.url} />
      <MissionDetailContent descriptionUrl={missionData.description} />
    </S.MissionDetailPageContainer>
  );
}
