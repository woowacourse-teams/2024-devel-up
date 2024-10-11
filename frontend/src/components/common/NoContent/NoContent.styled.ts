import styled from "styled-components";

export const NoContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
  margin: 4.5rem auto 0;
  width: 100%;
  align-items: center;
`;

export const NoContentMessage = styled.p`
  ${(props) => props.theme.font.subHeading}
`;
