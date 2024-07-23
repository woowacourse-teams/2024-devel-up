import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 30rem;
  margin: 10rem;
  width: fit-content;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
  border-radius: 0 0 8px 8px;
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
  border-radius: 8px 8px 0 0;
`;

export const Content = styled.div`
  padding: 2.5rem;
  height: 21.9rem;
`;
