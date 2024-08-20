import styled from 'styled-components';

export const SolutionTitle = styled.h2`
  margin-bottom: 3.5rem;
  ${(props) => props.theme.font.heading1}
`;

export const SolutionListPageContainer = styled.div`
  margin: 0 auto;
  width: fit-content;
  padding: 3.5rem 0;
`;

export const SolutionList = styled.div`
  display: flex;
  max-width: 100rem;
  width: fit-content;
  column-gap: 5rem;
  row-gap: 3.6rem;
  flex-wrap: wrap;
`;
