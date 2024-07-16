import styled from 'styled-components';

export const MissionDetailHeaderContainer = styled.div`
  width: 80%;
  height: 20rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  background-size: cover;
  background-position: center;

  display: block;
`;

export const Title = styled.h1`
  position: absolute;
  bottom: 0;
  font-size: 4.8rem;
  font-weight: bold;
`;
