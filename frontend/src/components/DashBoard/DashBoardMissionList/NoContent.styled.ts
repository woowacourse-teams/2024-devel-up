import NoResultIcon from '@/assets/images/NoResult.svg';
import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const NoContent = styled(NoResultIcon)`
  width: 18rem;
  height: 15rem;
  margin-bottom: 1rem;
`;

export const MainText = styled.span`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

export const SubText = styled.span`
  color: var(--grey-400);
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  background: var(--grey-200);
  padding: 1.2rem 1.8rem;
  border-radius: 0.8rem;
`;
