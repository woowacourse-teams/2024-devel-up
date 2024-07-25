import styled from 'styled-components';
import infoIcon from '@/assets/images/infoIcon.svg';
import githubLogo from '@/assets/images/githubLogo.svg';
import javaIcon from '@/assets/images/java.svg';

// MissionDetailHeader

export const MissionDetailHeaderContainer = styled.div`
  width: 100%;
  height: 20rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
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
  background: linear-gradient(rgba(0, 0, 0, 0), var(--black-color));
  pointer-events: none; // 그라데이션이 클릭 이벤트를 방지하지 않도록 설정
`;

export const Title = styled.h1`
  position: absolute;
  left: 2.1rem;
  bottom: 2.4rem;

  font-size: 2.8rem;
  font-weight: bold;
  color: var(--white-color);
`;

export const LangBadgeWrapper = styled.div`
  width: 5rem;
  height: 5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.4rem;
  box-sizing: border-box;
  border-radius: 10rem;
  overflow: hidden;

  position: absolute;
  right: 2.1rem;
  bottom: 2.4rem;

  background-color: var(--white-color);
`;

export const JavaIcon = styled(javaIcon)``;

// MissionDetailButtons

export const MissionDetailButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
`;

export const InfoMsgWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  border-radius: 0.8rem;
  padding: 0.3rem;

  color: var(--grey-500);
  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    background-color: var(--grey-50);
  }
`;

export const InfoIcon = styled(infoIcon)`
  height: 100%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: flex-end;
`;

export const GithubIcon = styled(githubLogo)`
  width: 2.2rem;
  height: 2.2rem;
`;

// MissionDetailContent

export const MissionDescription = styled.div`
  width: 100%;
  padding: 2rem;

  background-color: var(--grey-50);
  border-radius: 0.8rem;
`;
