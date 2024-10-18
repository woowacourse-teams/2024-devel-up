import { styled } from 'styled-components';
import GithubLogo from '@/assets/images/githubLogo.svg';

export const Container = styled.header`
  width: 100%;
  margin: 4rem 0;
`;

export const BannerTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const GithubIcon = styled(GithubLogo)`
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  justify-content: center;
  margin-right: 0.9rem;
`;

export const BannerTitleText = styled.h1`
  ${(props) => props.theme.font.heading3}
`;
