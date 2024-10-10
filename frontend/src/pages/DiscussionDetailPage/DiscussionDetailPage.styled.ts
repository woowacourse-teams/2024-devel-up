import styled from 'styled-components';
import SanitizedMDPreview from '@/components/common/SanitizedMDPreview';

export const DiscussionDetailPageContainer = styled.div`
  margin: 0 auto;
  width: fit-content;
  padding-bottom: 10rem;
`;

export const DiscussionDetailTitle = styled.h2`
  margin: 4.5rem 0;
  ${({ theme }) => theme.font.heading1}
  width: fit-content;
  cursor: pointer;
`;

export const DiscussionDescription = styled(SanitizedMDPreview)`
  width: fit-content;
  margin-top: 6.4rem;
  ${({ theme }) => theme.font.body}
`;
