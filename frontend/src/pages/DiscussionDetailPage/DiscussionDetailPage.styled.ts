import styled from 'styled-components';
import SanitizedMDPreview from '@/components/common/SanitizedMDPreview';

export const DiscussionDetailPageContainer = styled.div`
  margin: 0 auto;
  width: fit-content;
`;

export const DiscussionDetailTitle = styled.h2`
  margin: 4.5rem 0;
  ${({ theme }) => theme.font.heading1}
  width: fit-content;
  cursor: pointer;
`;

export const MissionTitle = styled.div`
  width: fit-content;
  ${({ theme }) => theme.font.badge}
  background-color: ${({ theme }) => theme.colors.danger50};
  padding: 1rem 2rem;
  border-radius: 2rem;

  ${(props) => props.theme.font.badge}
`;

export const HeaderUserName = styled.div`
  ${({ theme }) => theme.font.bodyBold}
`;

export const HeaderUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const DiscussionDetailHeaderContainer = styled.div`
  width: 100rem;

  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
`;

export const HeaderLeftArea = styled.div`
  bottom: 2.4rem;
  display: flex;
  flex-direction: column;
`;

export const MissionActionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DiscussionDetailInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const HeaderProfileImg = styled.img`
  width: 4.2rem;
  border-radius: 10rem;
`;

export const Title = styled.h1`
  margin: 2.4rem 0;
  ${(props) => props.theme.font.heading2}
`;

export const HashTagWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.1rem;
`;

export const DiscussionDescription = styled(SanitizedMDPreview)`
  width: fit-content;
  margin-top: 6.4rem;
  ${({ theme }) => theme.font.body}
`;
