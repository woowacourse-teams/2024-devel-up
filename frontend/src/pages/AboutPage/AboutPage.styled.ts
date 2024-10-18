import { keyframes, styled } from 'styled-components';
import Rocket from '@/assets/images/rocket.svg';
import LevelMission from '@/assets/images/levelMission.svg';
import Discussion from '@/assets/images/discussion.svg';
import VSCodeSolution from '@/assets/images/vscodeSolution.svg';
import UpArrow from '@/assets/images/upArrow.svg';
import media from '@/styles/mediaQueries';

export const Container = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

// 로켓 이미지

export const RocketContainer = styled.figure`
  background: linear-gradient(180deg, #9ca6e1 0%, #fff 100%);
  width: 100%;
  height: 100vh;

  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.small`
    gap: 3rem;
  `}
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.5rem);
  }
`;

export const RocketImg = styled(Rocket)`
  width: 25rem;
  height: 25rem;
  margin: 0 auto;

  animation: ${bounce} 1.5s ease-in-out infinite;

  ${media.small`
    width: 15rem;
    height: 15rem;
    `}
`;

export const DownArrow = styled(UpArrow)`
  transform: rotate(180deg);
  transition: transform 0.3s ease-in-out;
  width: 4rem;
  margin-top: 5rem;
  cursor: pointer;

  &:hover {
    transform: rotate(180deg) scale(1.2);
  }

  ${media.small`
      width: 2rem;
      margin-top: 1rem;
    `}
`;

// 폰트

export const Bold = styled.span`
  color: ${(props) => props.theme.colors.black};
  font-family: 'Pretendard Variable';
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  white-space: nowrap;

  width: 100%;

  ${media.landingMedium`
      font-size: 2rem;
    `}

  ${media.small`
    font-size: 1.6rem;
    `}
`;

export const PrimaryBold = styled(Bold)`
  color: ${(props) => props.theme.colors.primary500};
`;

export const Text = styled(Bold)`
  font-weight: 500;
`;

export const MediumBold = styled(Bold)`
  font-size: 2rem;

  ${media.landingMedium`
      font-size: 1.6rem;
    `}

  ${media.small`
      font-size: 1.3rem;
    `}
`;

export const MediumText = styled(Text)`
  font-size: 2rem;

  ${media.landingMedium`
    font-size: 1.6rem;
  `}

  ${media.small`
      font-size: 1.3rem;
    `}
`;

// 공통

export const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  margin: 0 auto;

  ${media.landingMedium`
    margin: 0;
    width: 100%;
  `}
`;

export const ComponentContainer = styled.figure<{ isVisible: boolean }>`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) => (props.isVisible ? 'translateY(0)' : 'translateY(20px)')};
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;

  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: center;
  gap: 4rem;

  max-width: 120rem;
  width: 89rem;
  height: 100vh;

  background-color: ${(props) => props.theme.colors.white};

  ${media.landingMedium`
      width: 100%;
      padding: 2rem 1.5rem;
  `}

  ${media.small`
      gap: 2rem;
    `}
`;

export const TextAlignCenterWrapper = styled.div`
  text-align: center;
`;

export const ImgLeftPadding = styled.div`
  padding-left: 7rem;

  ${media.small`
    padding-left: 2rem;
    `}
`;

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 레벨 별 실전 문제 제공 (LevelMission)

export const MissionCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  right: -2rem;
  bottom: 0;

  ${media.landingMedium`
    right: -10rem;
  `}

  ${media.small`
      right: -2rem;
      bottom: 3rem;
    `}
`;

export const LevelMissionImg = styled(LevelMission)`
  width: 82rem;
  height: fit-content;
  animation: ${slideUp} 1s ease-out;

  ${media.landingMedium`
    width: 100%;
    `}
`;

// 소통 공간 제공 (DiscussionSpace)

export const DiscussionImg = styled(Discussion)`
  width: 82rem;
  height: fit-content;
  animation: ${slideUp} 1s ease-out;

  ${media.landingMedium`
    width: 100%;
    `}
`;

// 다른 개발자들의 풀이 코드 제공 (Solution)

export const SolutionImg = styled(VSCodeSolution)`
  width: 82rem;
  height: fit-content;

  ${media.landingMedium`
    width: 100%;
    `}
`;
