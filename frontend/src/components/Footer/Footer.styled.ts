import media from '@/styles/mediaQueries';
import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 15.2rem;
  background: var(--grey-50);
  padding: 0 24.5rem;
  display: flex;
  flex-direction: column;

  ${media.small`
      padding: 0 6rem;
    `}
`;

export const TextWrapper = styled.div`
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
`;

export const LinkTextWrapper = styled.div`
  margin-top: 1.7rem;
  display: flex;
  flex-direction: column;
`;

export const LinkText = styled.a`
  color: var(--grey-500) !important;
  font-size: 1.4rem;
  width: fit-content;
`;

export const EmailText = styled(LinkText)`
  margin-bottom: 1rem;
`;

export const Text = styled.span`
  color: var(--grey-800);
  font-size: 1.6rem;
`;
