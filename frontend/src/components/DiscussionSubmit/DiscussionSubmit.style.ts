import { styled } from 'styled-components';

export const DiscussionTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
`;

export const DiscussionTitle = styled.h1`
  ${(props) => props.theme.font.bodyBold}
  margin: 1.1rem 0;
`;

export const DiscussionDescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const DiscussionDescriptionTitle = styled.h1`
  ${(props) => props.theme.font.bodyBold}
  margin: 1.1rem 0;
`;
