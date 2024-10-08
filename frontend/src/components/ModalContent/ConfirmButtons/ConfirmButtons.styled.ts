import styled from "styled-components";

export const DeleteModalContainer = styled.div`
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.boxShadow.shadow08};
  border-radius: 0.5rem;
  position: relative;
  padding: 3.9rem;
  display: flex;
  flex-direction: column;
`;

export const ModalButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;
