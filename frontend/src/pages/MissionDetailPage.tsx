import MissionDetailButtonGroup from '@/components/MissionDetailButtonGroup';
import MissionDetailContent from '@/components/MissionDetailContent';
import MissionDetailHeader from '@/components/MissionDetailHeader';
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
