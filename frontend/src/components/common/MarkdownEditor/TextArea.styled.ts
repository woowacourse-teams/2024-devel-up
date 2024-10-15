import { styled, css } from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

interface MarkdownEditorProps {
  $type: 'Default';
  $size: 'Default';
  $danger: boolean;
}

const sizeStyles = {
  Default: css`
    width: 100%;
    height: 15rem;
  `,
};

const typeStyles = {
  Default: css`
    background: ${(props) => props.theme.colors.grey100};
  `,
};

export const MarkdownEditor = styled(MDEditor)<MarkdownEditorProps>`
  ${(props) => sizeStyles[props.$size]}
  ${(props) => typeStyles[props.$type]}
  outline: none;
  min-height: 15rem;
  border-radius: 0.8rem;
  border: 1px solid transparent;
  border-bottom: 0.15rem solid transparent;

  ${(props) => props.theme.font.body}

  .w-md-editor-content {
    padding-left: 1.5rem;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  ${(props) =>
    props.$danger
      ? css`
          border-color: ${(props) => props.theme.colors.danger600};
        `
      : css`
          &:focus {
            border-color: ${(props) => props.theme.colors.primary500};
          }
        `}
`;

export const DangerText = styled.p`
  color: ${(props) => props.theme.colors.danger600};
  ${(props) => props.theme.font.caption}
  margin-top: 1rem;
  margin-left: 2.3rem;
`;
