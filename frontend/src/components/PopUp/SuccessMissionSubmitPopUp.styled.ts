import { styled } from 'styled-components';

export const SubmitPopUpContainer = styled.div`
  width: 50rem;
  height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: var(--white-color);
  border-radius: 0.5rem;
  position: 'relative';
`;

export const PopUpMessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PopUpMessage = styled.p`
  font-size: 1.5rem;
  color: var(--black-color);
`;

export const SubmitButtonContainer = styled.div`
  width: 13rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled.div`
  padding: 1rem;
  color: var(--white-color);
  font-size: 1.5rem;
  background: var(--grey-300);
  border-radius: 0.5rem;
  cursor: pointer;
`;
