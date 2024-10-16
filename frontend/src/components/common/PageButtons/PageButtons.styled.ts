import { styled } from 'styled-components';

export const Container = styled.div`
  width: 23.4rem;
  height: 2.4rem;
  margin: 0 auto;
  display: flex;
  margin-top: 1.5rem;
`;

export const DefaultButtonWrapper = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.1rem;
  cursor: pointer;
`;

interface PageButtonWrapperProps {
  $isActive: boolean;
}

export const PageButtonWrapper = styled(DefaultButtonWrapper)<PageButtonWrapperProps>`
  background: ${({ $isActive }) => ($isActive ? 'var(--primary-50)' : '')};
  color: ${({ $isActive }) => ($isActive ? 'black' : 'var(--grey-500)')};
  font-size: 1.4rem;
`;

export const PageButton = styled.button``;
