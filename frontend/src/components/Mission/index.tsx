import type { PropsWithChildren } from 'react';
import * as S from './Mission.styled';
import { Link } from 'react-router-dom';
import { HashTag } from '@/types/mission';

interface MissionProps extends PropsWithChildren {
  id: number;
  type: 'solution' | 'mission';
}

export default function Mission({ id, type, children }: MissionProps) {
  // TODO 솔루션 상세 URL이 아직 정해져 있지 않아서 임시로 해놓습니다.
  const targeRoute = type === 'mission' ? '/missions/' : '/solutions/';
  return (
    <S.MissionItemContainer>
      <Link to={`${targeRoute}${id}`}>{children}</Link>
    </S.MissionItemContainer>
  );
}

Mission.Card = function MissionCard({ id, children }: MissionProps) {
  return;
};

Mission.InfoWrapper = function MissionInfoWrapper({ children }: PropsWithChildren) {
  return <S.MissionInfoWrapper>{children}</S.MissionInfoWrapper>;
};

Mission.Title = function MissionTitle({ children }: PropsWithChildren) {
  return <S.MissionTitle>{children}</S.MissionTitle>;
};

Mission.Summary = function MissionSummary({ children }: PropsWithChildren) {
  return <S.MissionSummary>{children}</S.MissionSummary>;
};

interface MissionHashTagProps extends PropsWithChildren {
  hashtagList: HashTag[];
}

Mission.HashTag = function MissionHashTag({ hashtagList }: MissionHashTagProps) {
  return (
    <S.MissionHashTagWrapper>
      {hashtagList.map((hashTag) => {
        return <S.MissionHashTag key={hashTag.id}># {hashTag.name}</S.MissionHashTag>;
      })}
    </S.MissionHashTagWrapper>
  );
};

interface MissionThumbnailProps {
  thumbnail: string;
}

Mission.Thumbnail = function MissionThumbnail({ thumbnail }: MissionThumbnailProps) {
  return <S.MissionThumbnailImg src={thumbnail} />;
};
