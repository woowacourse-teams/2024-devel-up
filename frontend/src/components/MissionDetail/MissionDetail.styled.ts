import styled from 'styled-components';

// MissionDetailHeader

export const MissionDetailHeaderContainer = styled.div`
  width: 100%;
  height: 20rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ThumbnailImg = styled.img`
  border: 1px solid var(--grey-200);
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;

  background-size: cover;
  background-position: center;

  display: block;
`;

export const Title = styled.h1`
  position: absolute;
  left: 2.4rem;
  bottom: 0;

  font-size: 4.8rem;
  font-weight: bold;
  color: var(--white-color);
  background-color: rgba(0, 0, 0, 0.3);
`;

// MissionDetailButtons

export const MissionDetailButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
`;

export const Button = styled.button`
  background-color: var(--grey-300);
  font-size: 1.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: var(--black-color);
`;

// MissionDetailContent

export const MissionDescription = styled.div`
  padding: 0 2.4rem;
  font-size: 1.8rem;

  background-color: var(--grey-50);
  border-radius: 1rem;
  padding: 2rem;
`;
