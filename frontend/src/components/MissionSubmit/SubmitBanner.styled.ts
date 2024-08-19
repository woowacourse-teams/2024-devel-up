import { styled } from 'styled-components';
import GithubLogo from '@/assets/images/githubLogo.svg';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 2rem 0;
`;

export const GithubIcon = styled(GithubLogo)`
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  justify-content: center;
  margin-right: 0.3rem;
`;

export const BannerTitle = styled.h1`
  ${(props) => props.theme.font.heading3}
`;
