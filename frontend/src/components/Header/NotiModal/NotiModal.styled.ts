import styled from 'styled-components';

export const NotiModalContainer = styled.div`
  z-index: 101;
  position: fixed;
  top: 5.5rem;
  right: 17rem;
  width: 30rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  border-radius: 1rem;
  padding: 2rem;
  background-color: var(--grey-100);
`;

export const NotiItem = styled.div`
  position: relative;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: white;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
`;

export const NotiTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

export const NotiReadBtn = styled.button`
  font-size: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  right: 0;
  bottom: 0;
`;
