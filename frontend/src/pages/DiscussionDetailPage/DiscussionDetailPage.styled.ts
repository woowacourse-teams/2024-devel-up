import SanitizedMDPreview from '@/components/common/SanitizedMDPreview';
import styled, { keyframes } from 'styled-components';

const show = keyframes`
  0% {
    opacity: 0;
    }

  100% {
    opacity: 1;
  }
`;

export const DiscussionDetailPageContainer = styled.div`
  margin: 0 auto;
  width: fit-content;
  padding-bottom: 10rem;
  max-width: 100%;

  animation: ${show} 0.5s;
  transition: 0.5s;
`;

export const DiscussionDetailTitle = styled.h1`
  margin: 4.5rem 0;
  ${({ theme }) => theme.font.heading1}
  width: fit-content;
  cursor: pointer;
`;

export const DiscussionDescription = styled(SanitizedMDPreview)`
  max-width: 100rem;
  margin-top: 6.4rem;
  ${({ theme }) => theme.font.body}
`;
