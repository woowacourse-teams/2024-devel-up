import styled from 'styled-components';

export const MyMissionCompletedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

export const MissionCardListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.7rem;
`;

export const MissionCardWrapper = styled.div`
  min-height: 32.6rem;
  border-radius: 0.8rem;

  display: flex;
  flex-direction: column;
  background-color: var(--grey-50);

  position: relative;
  box-sizing: border-box;
`;

export const MissionCardHeaderWrapper = styled.div`
  display: flex;
  position: relative;
  height: 50%;
`;

export const MissionCardContentWrapper = styled.div`
  width: 100%;
  height: 50%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-sizing: border-box;
  padding: 0.8rem 1.7rem;
`;

export const MissionLanguageBox = styled.div`
  background-color: var(--primary-300);
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;

  padding: 0.3rem 1.2rem;
  box-sizing: border-box;
  border-radius: 0.4rem;

  font-size: 1.4rem;
  font-weight: 500;
`;

export const ThumbnailImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  object-fit: cover;
  border-radius: 0.8rem 0.8rem 0 0;
`;

export const CompletedTitle = styled.h2`
  font-size: 2.6rem;
  font-weight: bold;
`;

export const MissionTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: bold;
`;

export const MissionDate = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--grey-400);
`;

export const PrButtonWrapper = styled.div`
  display: flex;
  gap: 0.7rem;
  justify-content: start;
`;

export const PrButton = styled.button`
  background-color: var(--grey-200);
  width: fit-content;
  padding: 0.6rem 1.9rem;
  border-radius: 0.4rem;

  display: flex;
  gap: 0.4rem;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
  font-size: 1.2rem;
  font-weight: bold;
`;
