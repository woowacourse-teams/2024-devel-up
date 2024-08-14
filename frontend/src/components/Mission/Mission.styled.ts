import { styled } from 'styled-components';

export const MissionItemContainer = styled.article`
  width: 100%;
  max-width: 30rem;
  border-radius: 1rem;
  border: 1px solid var(--grey-200);
  cursor: pointer;
`;

export const MissionThumbnailImg = styled.img`
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  height: 23rem;
  object-fit: cover;
  border-bottom: 1px solid var(--grey-200);
`;

export const MissionInfoWrapper = styled.div`
  padding: 2.5rem;
`;

export const MissionDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const MissionTitle = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  color: black;
  margin-bottom: 1.7rem;
`;

export const MissionSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  font-size: 1.4rem;
  color: var(--grey-500);
`;

export const MissionHashTagWrapper = styled.div`
  display: flex;
  margin-top: 6.2rem;
  overflow-x: auto;
  white-space: nowrap;
`;

export const MissionHashTag = styled.span`
  background: var(--primary-100);
  border-radius: 0.8rem;
  padding: 0.4rem 0.8rem;
  text-align: center;
  display: inline-block;
  justify-content: center;
  align-items: center;
  margin-right: 0.8rem;
  min-width: 4.7rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.4rem;
  flex-shrink: 0;
`;
