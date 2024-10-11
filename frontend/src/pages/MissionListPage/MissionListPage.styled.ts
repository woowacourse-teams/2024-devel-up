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
  ${(props) => props.theme.font.heading1};
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Subtitle = styled.p`
  ${(props) => props.theme.font.body}

  color: ${(props) => props.theme.colors.grey500};
`;
