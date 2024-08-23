import styled from 'styled-components';

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom: 10rem;
  padding-top: 6rem;
  width: fit-content;
`;

export const MissionListTitle = styled.h2`
  ${(props) => props.theme.font.heading1}
  margin-top: 6rem;
  margin-bottom: 3rem;
`;
