import * as S from './MissionDetail.styled';

interface MissionDetailContentProps {
  description: string;
}

export default function MissionDetailContent({ description }: MissionDetailContentProps) {
  return (
    <S.MissionDescription>
      <S.MissionDescriptionText source={description} />
    </S.MissionDescription>
  );
}
