import styled from 'styled-components';

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10rem;
  width: 100%;
`;

export const MissionListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const MissionListTitle = styled.h2`
  ${(props) => props.theme.font.heading1}
  margin-top: 6rem;
  margin-bottom: 3rem;
`;
