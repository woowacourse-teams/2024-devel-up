import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 30rem;
  box-shadow: 0 0.4rem 0.4rem rgba(0, 0, 0, 0.12);
  border-radius: 0 0 0.8rem 0.8rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.04);
  }
`;

export const Thumbnail = styled.img`
  width: 30rem;
  height: 21.9rem;
  object-fit: cover;
  border-radius: 0.8rem 0.8rem 0 0;
`;

export const Content = styled.div`
  padding: 2.5rem;
  height: 20rem;
`;
