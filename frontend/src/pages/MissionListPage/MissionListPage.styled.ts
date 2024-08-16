import styled from 'styled-components';

export const MissionListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  margin: 5rem auto;
  width: 100%;
  max-width: 100rem;
`;

export const MissionListTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: bold;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Subtitle = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  font-family: inherit;

  color: var(--grey-500);
`;
