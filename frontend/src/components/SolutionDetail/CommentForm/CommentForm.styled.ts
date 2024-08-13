import styled from 'styled-components';

export const CommentForm = styled.form`
  border: 1px solid var(--grey-400);
  padding: 2.4rem;
  border-radius: 1.6rem;
  margin-top: 5.7rem;
`;

export const CommentTextArea = styled.textarea`
  width: 100%;
  padding: 1.4rem;
  border: 1px solid var(--grey-400);
  border-radius: 1rem;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

export const CommentButton = styled.button`
  margin-top: 1.7rem;
  font-size: 1.2rem;
`;

export const StartFromRight = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
