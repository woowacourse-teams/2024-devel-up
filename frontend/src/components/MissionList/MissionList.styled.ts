import styled from 'styled-components';

export const MissionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  margin: 0 auto;
  margin-bottom: 10rem;
  width: fit-content;
`;

export const MissionListTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 3rem;
`;

export const MissionList = styled.div`
  display: flex;
  gap: 4rem;
  width: fit-content;
`;

export const MissionItemContainer = styled.article`
  width: 35rem;

  border-radius: 1rem;
  border: 1px solid var(--grey-200);
  cursor: pointer;
`;

export const MissionThumbnailImg = styled.img`
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  height: 23rem;
  object-fit: cover;
  border-bottom: 1px solid var(--grey-200);
`;

export const MissionDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const MissionTitle = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  color: black;
  margin-bottom: 1.7rem;
`;
