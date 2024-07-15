import { styled } from 'styled-components';

export const Container = styled.div``;

export const MissionImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 40rem;
  border: 1px solid var(--primary-300);
  margin: 0 auto;
`;

export const MissionImg = styled.img`
  width: 100%;
  height: 27rem;
`;

export const MissionSummaryWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: var(--primary-200);
`;

export const MissionSummaryText = styled.span`
  font-weight: 700;
  font-size: 2rem;
`;
