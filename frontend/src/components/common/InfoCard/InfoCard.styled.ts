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
  ${(props) => props.theme.font.bodyBold}
`;

export const Description = styled.div`
  ${(props) => props.theme.font.body}
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
