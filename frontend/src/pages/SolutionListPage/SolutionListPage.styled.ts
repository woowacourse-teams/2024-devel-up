import styled, { keyframes } from 'styled-components';

export const SolutionTitle = styled.h2`
  ${(props) => props.theme.font.heading1}
`;

export const Subtitle = styled.p`
  ${(props) => props.theme.font.body}
  color: ${(props) => props.theme.colors.grey500};
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
