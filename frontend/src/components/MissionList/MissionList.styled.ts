import styled from 'styled-components';

export const MissionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  margin: 0 auto;
  margin-bottom: 10rem;
  padding-top: 6rem;
  width: fit-content;
`;

export const MissionListTitle = styled.h2`
  ${(props) => props.theme.font.heading1}
  margin-bottom: 3rem;
`;

export const MissionList = styled.div`
  display: flex;
  width: 100rem;
  column-gap: 5rem;
  row-gap: 3.6rem;
`;

export const MissionItemContainer = styled.article`
  width: 35rem;

  border-radius: 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey200};
  cursor: pointer;
`;

export const MissionThumbnailImg = styled.img`
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  height: 23rem;
  object-fit: cover;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey200};
`;

export const MissionDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const MissionTitle = styled.p`
  ${(props) => props.theme.font.bodyBold}
  color: black;
  margin-bottom: 1.7rem;
`;
