import { styled } from 'styled-components';

export const DiscussionSubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  margin: 0 8rem;
`;

export const DiscussionTagListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

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
