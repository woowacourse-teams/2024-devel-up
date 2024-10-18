import { styled } from 'styled-components';

export const DiscussionSubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

export const DiscussionTagListWrapper = styled.section`
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

export const DiscussionTitle = styled.label`
  cursor: pointer;
  ${(props) => props.theme.font.bodyBold}
  margin: 1.1rem 0;
`;

export const DiscussionDescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const DiscussionDescriptionTitle = styled.label`
  cursor: pointer;
  ${(props) => props.theme.font.bodyBold}
  margin: 1.1rem 0;
`;

// Header
export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DiscussionSubmitTitle = styled.h1`
  ${(props) => props.theme.font.heading1}
`;

export const Subtitle = styled.p`
  ${(props) => props.theme.font.body}
  color: ${(props) => props.theme.colors.grey500};
`;
