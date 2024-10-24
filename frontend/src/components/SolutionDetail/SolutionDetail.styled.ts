import styled from 'styled-components';
import javaIcon from '@/assets/images/java.svg';
import GithubLogo from '@/assets/images/githubLogo.svg';
import { Link } from 'react-router-dom';
import SanitizedMDPreview from '../common/SanitizedMDPreview';

export const SolutionDetailTitle = styled.h1`
  margin: 4rem 0 2rem 0;
  ${({ theme }) => theme.font.heading1}
`;

export const MissionTitle = styled.h2`
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

interface SolutionDetailHeaderContainerProps {
  $url: string;
}

export const SolutionDetailHeaderContainer = styled.div<SolutionDetailHeaderContainerProps>`
  background-image: url(${(props) => props.$url});
  background-position: center;
  border-radius: 1rem;
  overflow: hidden;

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

export const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0), ${(props) => props.theme.colors.black});
  opacity: 0.5;
  pointer-events: none; // 그라데이션이 클릭 이벤트를 방지하지 않도록 설정
`;

export const HeaderLeftArea = styled.div`
  // position: absolute;
  position: relative;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.4rem 2.1rem;
`;

export const HeaderProfileImg = styled.img`
  width: 4.2rem;
  border-radius: 10rem;
`;

export const Title = styled.h1`
  margin: 1rem 0;
  word-break: break-all;
  ${(props) => props.theme.font.heading1}
  color: ${(props) => props.theme.colors.white};
`;

export const HeaderLeftAreaInnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const JavaIcon = styled(javaIcon)``;

export const HashTagWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.1rem;
  flex-wrap: wrap;
`;

export const CodeViewButtonWrapper = styled.div`
  margin: 3rem 0;
`;

export const SolutionDescription = styled(SanitizedMDPreview)`
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
