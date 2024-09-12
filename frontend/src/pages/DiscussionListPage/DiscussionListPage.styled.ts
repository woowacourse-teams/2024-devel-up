import styled from 'styled-components';

export const DiscussionListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
  margin: 4.5rem auto 0;
  width: 100%;
  max-width: 100rem;
`;

export const DiscussionListTitle = styled.h1`
  ${(props) => props.theme.font.heading1}
`;