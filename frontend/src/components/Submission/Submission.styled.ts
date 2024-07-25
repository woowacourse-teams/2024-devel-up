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

export const Title = styled.h2`
  font-size: 2.6rem;
  font-weight: bold;
`;

export const SubmissionTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: bold;
`;

export const GithubIcons = styled(GithubLogo)`
  width: 2.2rem;
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

export const CompletedCardListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 5rem;
  row-gap: 2.6rem;

  width: 100%;
`;

export const MissionCardWrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CompletedTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const CompletedPrButtonWrapper = styled.div`
  display: flex;
  gap: 0.3rem;
  justify-content: start;
`;
