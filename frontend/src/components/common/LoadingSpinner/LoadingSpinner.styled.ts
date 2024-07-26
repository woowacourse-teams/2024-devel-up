import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const wobble1 = keyframes`
  0%,
  100% {
    transform: translateY(0%) scale(1);
    opacity: 1;
  }

  50% {
    transform: translateY(-66%) scale(0.65);
    opacity: 0.8;
  }
`;

const wobble2 = keyframes`
  0%,
  100% {
    transform: translateY(0%) scale(1);
    opacity: 1;
  }

  50% {
    transform: translateY(66%) scale(0.65);
    opacity: 0.8;
  }
`;

export const Container = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // TODO rgba에 관하여 일단 속성 값을 지정해둡니다.
  background: rgba(0, 0, 0, 0.4);
  z-index: 30000;
`;

export const ThreeBody = styled.div`
  --uib-size: 35px;
  --uib-speed: 0.8s;
  position: relative;
  display: inline-block;
  height: var(--uib-size);
  width: var(--uib-size);
  animation: ${spin} calc(var(--uib-speed) * 2.5) infinite linear;
`;

export const Dot = styled.div`
  position: absolute;
  height: 100%;
  width: 30%;

  &:after {
    content: '';
    position: absolute;
    height: 0%;
    width: 100%;
    padding-bottom: 100%;
    background-color: var(--primary-700);
    border-radius: 50%;
  }

  &:nth-child(1) {
    bottom: 5%;
    left: 0;
    transform: rotate(60deg);
    transform-origin: 50% 85%;

    &:after {
      bottom: 0;
      left: 0;
      animation: ${wobble1} var(--uib-speed) infinite ease-in-out;
      animation-delay: calc(var(--uib-speed) * -0.3);
    }
  }

  &:nth-child(2) {
    bottom: 5%;
    right: 0;
    transform: rotate(-60deg);
    transform-origin: 50% 85%;

    &:after {
      bottom: 0;
      left: 0;
      animation: ${wobble1} var(--uib-speed) infinite calc(var(--uib-speed) * -0.15) ease-in-out;
    }
  }

  &:nth-child(3) {
    bottom: -5%;
    left: 0;
    transform: translateX(116.666%);

    &:after {
      top: 0;
      left: 0;
      animation: ${wobble2} var(--uib-speed) infinite ease-in-out;
    }
  }
`;
