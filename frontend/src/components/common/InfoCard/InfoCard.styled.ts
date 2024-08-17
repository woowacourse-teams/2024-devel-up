import styled from 'styled-components';

export const InfoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
`;

export const Description = styled.div`
  font-size: 1.6rem;
  font-weight: 300;
  color: ${(props) => props.theme.colors.grey500};
  margin-top: 0.5rem;
`;

export const TagWrapper = styled.ul`
  display: flex;
  gap: 0.8rem;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
