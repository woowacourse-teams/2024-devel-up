import GithubLogo from '@/assets/images/githubLogo.svg';
import styled, { keyframes } from 'styled-components';

// InProgress

export const SubmissionInProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
`;

export const SubmissionInProgressBannerContainer = styled.div`
  width: 100%;
  height: 24rem;

  display: flex;
  justify-content: space-between;
  padding: 3.2rem 4.1rem;
  box-sizing: border-box;

  border-radius: 1rem;
  border: 0.1rem solid var(--grey-100);
`;

export const ThumbnailContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4rem;
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

export const PairNotMatchedWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: flex-end;
  align-items: flex-end;

  text-align: right;
  font-size: 1.4rem;
  font-weight: 500;
`;

export const InProgressPrButtonWrapper = styled.div`
  display: flex;
  gap: 0.7rem;
  justify-content: flex-end;
`;

export const MissionCompleteWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const InProgressThumbnailImg = styled.img`
  width: 21.8rem;
  overflow: hidden;
  object-fit: cover;
  border-radius: 0.8rem;
`;

export const InProgressTitle = styled.h2`
  font-size: 2.6rem;
  font-weight: bold;
`;

export const SubmissionTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: bold;
`;

export const GithubIcons = styled(GithubLogo)`
  height: 2.2rem;
`;

// Loader

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  border: 0.3rem solid rgba(0, 0, 0, 0.1);
  border-left-color: transparent;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

// Completed

export const SubmissionCompletedContainer = styled.div`
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

export const CompletedThumbnailImg = styled.img`
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

export const CompletedPrButtonWrapper = styled.div`
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
