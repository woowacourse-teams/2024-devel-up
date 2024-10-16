import { styled } from 'styled-components';
import Rocket from '@/assets/images/rocket.svg';
import media from '@/styles/mediaQueries';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const RocketWrapper = styled.div`
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

export const PrimaryBold = styled.span`
  color: ${(props) => props.theme.colors.primary500};
  text-align: center;
  font-family: 'Pretendard Variable';
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  ${media.small`
      font-size: 2rem;
    `}
`;

export const Bold = styled.span`
  color: ${(props) => props.theme.colors.black};
  font-family: 'Pretendard Variable';
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  ${media.small`
      font-size: 2rem;
    `}
`;

export const ButtonWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Button = styled.button`
  position: absolute;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
