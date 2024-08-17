import { styled } from 'styled-components';

export const SubmitPopUpContainer = styled.div`
  width: 39rem;
  height: 32rem;
  background: ${(props) => props.theme.colors.whiteColor};
  box-shadow: var(--shadow-8);
  border-radius: 0.5rem;
  position: relative;
  padding: 3.9rem;
  display: flex;
  flex-direction: column;
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
  color: ${(props) => props.theme.colors.blackColor};
`;

export const SubmitButtonContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled.button`
  padding: 1rem;
  color: ${(props) => props.theme.colors.whiteColor};
  font-size: 1.5rem;
  background: ${(props) => props.theme.colors.primary500};
  border-radius: 0.8rem;
  cursor: pointer;
  width: 8.5rem;
`;

export const MissionImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MissionImg = styled.img`
  width: 14rem;
  height: 9.5rem;
  margin: 3rem 0;
`;
