import { styled } from 'styled-components';
import closeIcon from '@/assets/images/close.svg';
import Button from '@/components/common/Button/Button';

export const MissionProcessContentContainer = styled.div`
  width: 53rem;
  height: 58rem;
  background: var(--white-color);
  box-shadow: var(--shadow-8);
  border-radius: 0.5rem;
  position: relative;
  padding: 3.9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 2.4rem;
  font-weight: bold;
`;

export const CloseIconWrapper = styled.div`
  padding: 0.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

export const CloseIcon = styled(closeIcon)`
  width: 1.4rem;
  height: 1.4rem;
`;

export const Text = styled.p`
  font-size: 1.6rem;
`;

// Prev Next 버튼

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  gap: 0.8rem;
`;

export const ArrowButton = styled(Button)`
  gap: 1.2rem;
`;
