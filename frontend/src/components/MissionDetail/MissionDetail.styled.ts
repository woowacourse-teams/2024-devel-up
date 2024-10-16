import styled from 'styled-components';
import infoIcon from '@/assets/images/infoIcon.svg';
import githubLogo from '@/assets/images/githubLogo.svg';
import javaIcon from '@/assets/images/java.svg';
import { CommonButton } from '../common/Button/Button.styled';
import SanitizedMDPreview from '../common/SanitizedMDPreview';

// MissionDetailHeader

export const MissionDetailHeaderContainer = styled.header`
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
  object-position: 0 20%;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0), ${(props) => props.theme.colors.black});
  opacity: 0.5;
  pointer-events: none; // 그라데이션이 클릭 이벤트를 방지하지 않도록 설정
`;

export const Title = styled.h1`
  position: absolute;
  left: 2.1rem;
  bottom: 2.4rem;
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

// MissionDetailButtons

export const MissionDetailButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoMsgWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  padding: 0.3rem;

  color: ${(props) => props.theme.colors.grey500};
  ${(props) => props.theme.font.caption}

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey50};
  }
`;

export const InfoIcon = styled(infoIcon)``;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  width: 100%;
  justify-content: space-between;
`;

export const GithubIcon = styled(githubLogo)`
  width: 2.2rem;
  height: 2.2rem;
`;

export const MissionButton = styled(CommonButton)`
  width: 27rem;
`;

export const Text = styled.div`
  width: 11rem;
`;

export const NeedToLoginText = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--grey-500);
`;

export const SubmitButton = styled.button`
  background-color: var(--grey-700);
  color: #ffffff;
  width: 27.1rem;
  min-height: 4.2rem;
  padding: 1rem 1.4rem;
  border-radius: 0.8rem;
  display: flex;
  gap: 0.3rem;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: 500;
  font-family: inherit;
`;

// MissionDetailContent

export const MissionDescription = styled.section`
  width: 100%;
  padding: 2rem;

  border-radius: 0.8rem;
`;

export const MissionDescriptionText = styled(SanitizedMDPreview)`
  font-size: 2rem;
`;
