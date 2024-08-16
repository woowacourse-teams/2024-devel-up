import styled from 'styled-components';
import MarkdownEditor from '@uiw/react-md-editor';

export const CommentForm = styled.form``;

export const CommentTextArea = styled.textarea`
  width: 100%;
  padding: 1.4rem;
  border: 1px solid var(--grey-400);
  border-radius: 1rem;
`;

export const CommentButton = styled.button`
  margin-top: 1.7rem;
  font-size: 1.2rem;
  background-color: var(--primary-50);
`;

export const StartFromRight = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const MDEditor = styled(MarkdownEditor)`
  border: 0.05rem solid var(--grey-300);
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
