import styled from 'styled-components';
import MarkdownEditor from '@uiw/react-md-editor';

export const CommentForm = styled.form``;

export const CommentTextArea = styled.textarea`
  width: 100%;
  padding: 1.4rem;
  border: 1px solid ${({ theme }) => theme.colors.grey400};
  border-radius: 1rem;
`;

export const CommentButton = styled.button`
  margin-top: 1.7rem;
  color: ${({ theme }) => theme.colors.primary500};
  border: solid 1px ${({ theme }) => theme.colors.primary500};
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  ${({ theme }) => theme.font.button};
`;

export const StartFromRight = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const MDEditor = styled(MarkdownEditor)`
  border: 0.05rem solid ${({ theme }) => theme.colors.grey300};
  border-radius: 1rem;
  overflow: overlay;

  .cm-content {
    font-size: 1.6rem;
    padding: 1rem;
  }

  .md-editor-preview {
    font-size: 1.6rem;
  }
`;
