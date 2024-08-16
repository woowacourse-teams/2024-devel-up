import styled from 'styled-components';

export const SolutionTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: bold;
`;

export const Subtitle = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  font-family: inherit;

  color: var(--grey-500);
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SolutionListPageContainer = styled.div`
  width: 100%;
  max-width: 100rem;
  margin: 5rem auto;

  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const SolutionList = styled.div`
  display: flex;
  max-width: 100rem;
  width: fit-content;
  column-gap: 5rem;
  row-gap: 3.6rem;
  flex-wrap: wrap;
`;
