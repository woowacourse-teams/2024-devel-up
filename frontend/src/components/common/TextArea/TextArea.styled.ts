import { styled, css } from 'styled-components';

interface TextAreaProps {
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

export const TextArea = styled.textarea<TextAreaProps>`
  ${(props) => sizeStyles[props.$size]}
  ${(props) => typeStyles[props.$type]}
  ${(props) => props.theme.font.body}
  outline: none;
  padding: 1.5rem;
  min-height: 15rem;
  border-radius: 0.8rem;
  border: 1px solid transparent;
  border-bottom: 0.15rem solid transparent;
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
  margin-left: 1rem;
`;
