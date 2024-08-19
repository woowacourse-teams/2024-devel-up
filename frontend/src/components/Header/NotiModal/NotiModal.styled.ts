import styled from 'styled-components';

export const NotiModalContainer = styled.div`
  z-index: 101;
  position: fixed;
  top: 5.5rem;
  right: 17rem;
  box-shadow: ${(props) => props.theme.boxShadow.shadow12};

  border-radius: 1rem;
  padding: 2.5rem 3.4rem;
  background-color: white;
`;

export const NotiItem = styled.div`
  width: 28rem;
  position: relative;
  ${(props) => props.theme.font.caption}
  margin-bottom: 1rem;
  padding: 2.3rem 0;
  border-bottom: 0.1rem solid ${(props) => props.theme.colors.grey100};
  background-color: white;
  cursor: pointer;
`;

export const NotiModalTitle = styled.h2`
  color: ${(props) => props.theme.colors.grey600};
  ${(props) => props.theme.font.caption}
  margin-bottom: 1.2rem;
`;

export const NotiReadBtn = styled.button`
  ${(props) => props.theme.font.body}
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const NotiTitle = styled.div`
  ${(props) => props.theme.font.bodyBold}
  margin-bottom: 0.6rem;
`;

export const NotiMessage = styled.div`
  color: ${(props) => props.theme.colors.grey500};
  ${(props) => props.theme.font.caption}

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
