import media from '@/styles/mediaQueries';
import styled from 'styled-components';

export const CardContainer = styled.div`
  box-shadow: ${(props) => props.theme.boxShadow.shadow04};
  border-radius: 0 0 0.8rem 0.8rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.04);
  }

  ${media.medium`
      width: 100%;
    `}
`;

export const Thumbnail = styled.img`
  width: -webkit-fill-available;
  height: 21.9rem;
  object-fit: cover;
  border-radius: 0.8rem 0.8rem 0 0;
`;

export const Content = styled.div`
  padding: 2.5rem;
  min-height: 20rem;
  display: flex;
  justify-content: space-between;

  ${media.medium`
    min-height: 15rem;
    `}
`;
