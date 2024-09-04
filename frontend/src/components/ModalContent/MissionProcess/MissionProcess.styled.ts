import { styled } from 'styled-components';
import closeIcon from '@/assets/images/close.svg';
import Button from '@/components/common/Button/Button';

export const MissionProcessContentContainer = styled.div`
  width: 53rem;
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.boxShadow.shadow08};
  border-radius: 1.2rem;
  position: relative;
  padding: 7.8rem 5.6rem 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h1`
  ${(props) => props.theme.font.bodyBold}
`;

export const CloseIconWrapper = styled.div`
  padding: 0.5rem;
  position: absolute;
  top: 2.1rem;
  right: 2.6rem;
  cursor: pointer;
`;

export const CloseIcon = styled(closeIcon)`
  width: 1.4rem;
  height: 1.4rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

// Prev Next 버튼

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
`;

export const ArrowButton = styled(Button)`
  gap: 1.2rem;
`;
