import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MissionDetailButtonGroupContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
`;

export const Button = styled(Link)`
  background-color: var(--primary-100);
`;
