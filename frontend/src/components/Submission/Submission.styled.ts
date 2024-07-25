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

export const BannerRightWrapper = styled.div`
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

export const BannerReviewStatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ToolTipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  position: relative;
  padding-bottom: 1.2rem;
  filter: drop-shadow(0 0.4rem 0.4rem rgba(0, 0, 0, 0.12));
`;

export const ToolTipRectangle = styled.div`
  width: fit-content;
  padding: 1.4rem 1.6rem;
  box-sizing: border-box;
  border-radius: 1.2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;
  font-size: 1.4rem;
  background-color: var(--white-color);
`;

export const ToolTipTail = styled.div`
  display: inline-block;
  margin-right: 0.9rem;
  border-bottom: 0.6rem solid transparent;
  border-top: 0.6rem solid var(--white-color);
  border-left: 1.2rem solid transparent;
  border-right: 1.2rem solid var(--white-color);
  border-radius: 0.3rem;

  position: absolute;
  right: 0.9rem;
  bottom: 0.3rem;
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
