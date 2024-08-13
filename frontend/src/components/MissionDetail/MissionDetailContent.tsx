import * as S from './MissionDetail.styled';

interface MissionDetailContentProps {
  description: string;
}

export default function MissionDetailContent({ description }: MissionDetailContentProps) {
  // descriptionUrl; // 추후 markdown 구현 @프룬
  return (
    <S.MissionDescription>
      <S.MissionDescriptionText>{description}</S.MissionDescriptionText>
    </S.MissionDescription>
  );
}
