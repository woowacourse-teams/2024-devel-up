import styled from 'styled-components';

export const Button = styled.div`
  background-color: ${(props) => props.theme.colors.primary50};
  color: ${(props) => props.theme.colors.blackColor};
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.theme.font.badge}

  padding: 1rem 1.6rem;
  border-radius: 2rem;
`;
