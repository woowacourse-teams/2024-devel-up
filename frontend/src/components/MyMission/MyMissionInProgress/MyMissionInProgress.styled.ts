import GithubLogo from '@/assets/images/githubLogo.svg';
import styled from 'styled-components';

export const MyMissionInProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

export const MyMissionInProgressWrapper = styled.div`
  background-color: var(--grey-50);
  width: 100%;
  height: 24rem;

  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 2.7rem;
  padding: 3.2rem 4.1rem;
  box-sizing: border-box;
  border-radius: 0.8rem;
`;

export const MissionContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MissionButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PrButtonWrapper = styled.div`
  display: flex;
  gap: 0.7rem;
  justify-content: flex-end;
`;

export const MissionCompleteWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ThumbnailImg = styled.img`
  width: 100%;
  height: -webkit-fill-available; // Chrome, Safari
  height: -moz-available; // Firefox
  overflow: hidden;
  object-fit: cover;
  border-radius: 0.8rem;
`;

export const Title = styled.h2`
  font-size: 3.2rem;
  font-weight: bold;
`;

export const MissionTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: bold;
`;

export const MissionDate = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--grey-400);
`;

export const GithubIcons = styled(GithubLogo)`
  height: 100%;
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
  font-size: 1.4rem;
  font-weight: bold;
`;

export const MissionCompleteButton = styled.button`
  background-color: var(--primary-200);
  width: fit-content;
  padding: 0.6rem 1.9rem;
  border-radius: 0.4rem;

  display: flex;
  gap: 0.4rem;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: bold;
`;
