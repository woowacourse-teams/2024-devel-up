import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.p`
  ${(props) => props.theme.font.caption}
  color: ${(props) => props.theme.colors.grey500};
`;

export const TagMultipleListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  flex-wrap: wrap;
`;
