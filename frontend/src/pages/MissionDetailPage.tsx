import MissionDetailButtonGroup from '@/components/MissionDetail/MissionDetailButtons';
import MissionDetailContent from '@/components/MissionDetail/MissionDetailContent';
import MissionDetailHeader from '@/components/MissionDetail/MissionDetailHeader';
import { useParams } from 'react-router-dom';
import * as S from './MissionDetailPage.styled';

export default function MissionDetailPage() {
  const { id } = useParams();

  return (
    <S.MissionDetailPageContainer>
      <MissionDetailHeader id={Number(id)} />
      <MissionDetailButtonGroup id={Number(id)} />
      <MissionDetailContent id={Number(id)} />
    </S.MissionDetailPageContainer>
  );
}
