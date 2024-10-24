import type { PropsWithChildren } from 'react';
import * as S from './Mission.styled';
import type { HashTag } from '@/types';

interface MissionProps extends PropsWithChildren {
  id: number;
  type: 'solution' | 'mission';
}

export default function Mission({ id, type, children }: MissionProps) {
  // TODO 솔루션 상세 URL이 아직 정해져 있지 않아서 임시로 해놓습니다.

  const targeRoute = type === 'mission' ? '/missions/' : '/solutions/';
  const URL =
    process.env.NODE_ENV === 'development'
      ? 'https://dev.devel-up.co.kr'
      : 'https://devel-up.co.kr';
  return (
    <S.MissionItemContainer>
      <a href={`${URL}${targeRoute}${id}`}>{children}</a>
      {/* <Link to={`${targeRoute}${id}`}>{children}</Link> */}
    </S.MissionItemContainer>
  );
}

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
  hashTagList: HashTag[];
}

Mission.HashTag = function MissionHashTag({ hashTagList }: MissionHashTagProps) {
  return (
    <S.MissionHashTagWrapper>
      {hashTagList.map((hashTag) => {
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
