import type { PropsWithChildren } from 'react';
import * as S from './Mission.styled';
import { Link } from 'react-router-dom';
import { HashTag } from '@/types/mission';

interface MissionProps extends PropsWithChildren {
  id: number;
}

export default function Mission({ children }: PropsWithChildren) {
  return <S.MissionItemContainer>{children}</S.MissionItemContainer>;
}

Mission.Card = function MissionCard({ id, children }: MissionProps) {
  return <Link to={`/missions/${id}`}>{children}</Link>;
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
