import styled from 'styled-components';

export const Text = styled.p`
  ${(props) => props.theme.font.body}
  white-space: pre-line;
`;

export const BoldText = styled.span`
  ${(props) => props.theme.font.bodyBold}
`;
