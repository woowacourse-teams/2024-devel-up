import MissionDetailButtonGroup from '@/components/missionDetailButtonGroup';
import MissionDetailContent from '@/components/missionDetailContent';
import MissionDetailHeader from '@/components/missionDetailHeader';
// import { useParams } from 'react-router-dom';

export default function MissionDetailPage() {
  // const { id } = useParams(); // TODO: 추후 사용 @프룬

  return (
    <>
      <MissionDetailHeader />
      <MissionDetailButtonGroup />
      <MissionDetailContent />
    </>
  );
}
