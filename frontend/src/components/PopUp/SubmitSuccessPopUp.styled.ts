import { styled } from 'styled-components';

export const SubmitPopUpContainer = styled.div`
  width: 39rem;
  height: 32rem;
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.boxShadow.shadow08};
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
  ${(props) => props.theme.font.body}
  color: ${(props) => props.theme.colors.black};
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
  color: ${(props) => props.theme.colors.white};
  ${(props) => props.theme.font.button}
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
