import { styled } from 'styled-components';
import Rocket from '@/assets/images/rocket.svg';
import VSCode from '@/assets/images/vscode.svg';
import MissionCardElevator from '@/assets/images/missionCardElevator.svg';
import MissionCardReact from '@/assets/images/missionCardReact.svg';
import media from '@/styles/mediaQueries';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

// 로켓 이미지

export const RocketContainer = styled.article`
  background: linear-gradient(180deg, #9ca6e1 0%, #fff 100%);
  width: 100%;
  height: 100vh;

  display: flex;
  gap: 6rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.small`
    gap: 3rem;
  `}
`;

export const RocketImg = styled(Rocket)`
  width: 22rem;
  height: 22rem;
  margin: 2rem auto;

  ${media.small`
    width: 15rem;
    height: 15rem;
    `}
`;

export const TextAlignCenterWrapper = styled.div`
  text-align: center;
`;

// 폰트

export const Bold = styled.span`
  color: ${(props) => props.theme.colors.black};
  font-family: 'Pretendard Variable';
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

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

  ${media.small`
      font-size: 1.3rem;
    `}
`;

export const MediumText = styled(Text)`
  font-size: 2rem;

  ${media.small`
      font-size: 1.3rem;
    `}
`;

// 레벨 별 실전 문제 제공

export const LevelMissionContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-items: center;
  gap: 4rem;

  height: 100vh;
  background-color: ${(props) => props.theme.colors.white};

  ${media.small`
      gap: 2rem;
    `}
`;

export const ContentWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  ${media.small`
      gap: 2rem;
    `}
`;

export const VSCodeImg = styled(VSCode)`
  width: 60rem;

  ${media.small`
      width: 20rem;
    `}
`;

export const MissionCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  right: -19rem;
  bottom: -7rem;

  ${media.small`
      right: -2rem;
      bottom: 3rem;
    `}
`;

export const MissionCardElevatorImg = styled(MissionCardElevator)`
  width: 23rem;

  ${media.small`
      width: 8rem;
    `}
`;
export const MissionCardReactImg = styled(MissionCardReact)`
  width: 23rem;

  ${media.small`
      width: 8rem;
    `}
`;

export const LevelMissionTextWrapper = styled.div`
  text-align: start;
`;

// export const ButtonWrapper = styled.div`
//   position: relative;
//   width: 100%;
// `;

// export const Button = styled.button`
//   position: absolute;
// `;

// export const Image = styled.img`
//   width: 100%;
//   height: 100%;
// `;
