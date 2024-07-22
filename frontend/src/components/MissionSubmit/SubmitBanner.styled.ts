import { styled } from 'styled-components';
import GithubLogo from '@/assets/images/githubLogo.svg';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 2rem 0;
`;

export const GithubIcon = styled(GithubLogo)`
  width: 3rem;
  height: 3rem;
  margin-right: 2rem;
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

export const BannerTitle = styled.h1`
  font-weight: bold;
  font-size: 3rem;
`;
