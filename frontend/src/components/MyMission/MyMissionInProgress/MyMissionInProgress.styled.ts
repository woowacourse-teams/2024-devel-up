import GithubLogo from '@/assets/images/githubLogo.svg';
import styled from 'styled-components';

export const MyMissionInProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
`;

export const MyMissionInProgressBannerContainer = styled.div`
  width: 100%;
  height: 24rem;

  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  gap: 2.7rem;
  padding: 3.2rem 4.1rem;
  box-sizing: border-box;

  border-radius: 0.8rem;
  border: 0.1rem solid var(--grey-100);
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

export const InProgressTitle = styled.h2`
  font-size: 2.6rem;
  font-weight: bold;
`;

export const MissionTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: bold;
`;

export const GithubIcons = styled(GithubLogo)`
  height: 2.2rem;
`;
