import { Container } from './header.styled';
import { styled } from 'styled-components';
import { Logo } from './header.styled';

const Spacer = styled.div`
  height: 8rem;
`;

export default function Header() {
  return (
    <>
      <Container>
        <Logo>🆙 Devel Up</Logo>
      </Container>
      <Spacer />
    </>
  );
}
