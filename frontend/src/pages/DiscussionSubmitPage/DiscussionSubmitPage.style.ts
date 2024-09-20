import styled from 'styled-components';

export const DiscussionSubmitPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
  margin: 4.5rem auto 0;
  width: 100%;
  max-width: 100rem;
`;

export const DiscussionSubmitTitle = styled.h1`
  ${(props) => props.theme.font.heading1}
`;
