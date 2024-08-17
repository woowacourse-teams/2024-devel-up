import { styled } from 'styled-components';
import closeIcon from '@/assets/images/close.svg';
import Button from '@/components/common/Button/Button';

export const MissionProcessContentContainer = styled.div`
  width: 53rem;
  height: 58rem;
  background: ${(props) => props.theme.colors.whiteColor};
  box-shadow: ${(props) => props.theme.boxShadow.shadow08};
  border-radius: 0.5rem;
  position: relative;
  padding: 3.9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h1`
  ${(props) => props.theme.font.bodyBold}
  margin-bottom: 2.4rem;
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
  ${(props) => props.theme.font.body}
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
