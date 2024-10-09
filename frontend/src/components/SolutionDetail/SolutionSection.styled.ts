import styled from 'styled-components';
import javaIcon from '@/assets/images/java.svg';
import GithubLogo from '@/assets/images/githubLogo.svg';
import { Link } from 'react-router-dom';

export const SolutionDetailTitle = styled.h2`
  margin: 4rem 0 2rem 0;
  ${({ theme }) => theme.font.heading1}
`;

export const MissionTitle = styled.div`
  width: fit-content;
  ${({ theme }) => theme.font.badge}
  background-color: ${({ theme }) => theme.colors.danger50};
  padding: 1rem 2rem;
  border-radius: 2rem;

  ${(props) => props.theme.font.badge}
`;

export const HeaderUserName = styled.div`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.font.bodyBold}
`;

export const HeaderUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const SolutionDetailHeaderContainer = styled.div`
  width: 100%;
  height: 20rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const GithubIcon = styled(GithubLogo)`
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  justify-content: center;
  margin-right: 0.3rem;
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
`;

export const ThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0), ${(props) => props.theme.colors.black});
  opacity: 0.5;
  pointer-events: none; // 그라데이션이 클릭 이벤트를 방지하지 않도록 설정
`;

export const HeaderLeftArea = styled.div`
  position: absolute;
  left: 2.1rem;
  bottom: 2.4rem;
  display: flex;
  flex-direction: column;
`;

export const HeaderProfileImg = styled.img`
  width: 4.2rem;
  border-radius: 10rem;
`;

export const Title = styled.h1`
  margin: 1rem 0;
  ${(props) => props.theme.font.heading1}
  color: ${(props) => props.theme.colors.white};
`;

export const JavaIcon = styled(javaIcon)``;

export const HashTagWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.1rem;

  position: absolute;
  right: 2.1rem;
  bottom: 2.4rem;
`;

export const CodeViewButtonWrapper = styled.div`
  margin: 3rem 0;
`;

export const SolutionDescription = styled.div`
  margin-top: 3rem;
  ${({ theme }) => theme.font.body}
`;

export const SolutionDescriptionBottom = styled.div`
  margin: 2rem 0;

  display: flex;
  gap: 0.2rem;
  justify-content: flex-end;
  align-content: center;
`;

export const CodeViewButtonLink = styled(Link)`
  display: contents;
`;

