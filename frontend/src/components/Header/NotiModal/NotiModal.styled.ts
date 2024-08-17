import styled from 'styled-components';

export const NotiModalContainer = styled.div`
  z-index: 101;
  position: fixed;
  top: 5.5rem;
  right: 17rem;
  box-shadow:
    0 0.6rem 0.9rem rgba(0, 0, 0, 0.12),
    0 1.2rem 1.8rem rgba(0, 0, 0, 0.08);

  border-radius: 1rem;
  padding: 2.5rem 3.4rem;
  background-color: white;
`;

export const NotiItem = styled.div`
  width: 28rem;
  position: relative;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  padding: 2.3rem 0;
  border-bottom: 0.1rem solid ${(props) => props.theme.colors.grey100};
  background-color: white;
  cursor: pointer;
`;

export const NotiModalTitle = styled.h2`
  color: ${(props) => props.theme.colors.grey600};
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  font-weight: 500;
`;

export const NotiReadBtn = styled.button`
  font-size: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const NotiTitle = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 0.6rem;
`;

export const NotiMessage = styled.div`
  color: ${(props) => props.theme.colors.grey500};
  font-size: 1.4rem;
  font-weight: 500;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
