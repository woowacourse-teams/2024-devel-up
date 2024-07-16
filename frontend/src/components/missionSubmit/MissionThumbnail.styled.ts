import { styled } from 'styled-components';

export const MissionImageContainer = styled.div``;

export const MissionImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 40rem;
  border: 1px solid var(--grey-200);
  margin: 0 auto;
  border-radius: 1rem;
`;

export const MissionImg = styled.img`
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  height: 27rem;
`;

export const MissionSummaryWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: var(--primary-100);
  border-radius: 0 0 1rem 1rem;
`;

export const MissionSummaryText = styled.span`
  font-weight: 700;
  font-size: 1.7rem;
`;
