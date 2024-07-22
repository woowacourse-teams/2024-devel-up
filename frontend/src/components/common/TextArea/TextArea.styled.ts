import { styled, css } from 'styled-components';

interface TextAreaProps {
  Type: 'Default';
  Size: 'Default';
  Danger: boolean;
}

const sizeStyles = {
  Default: css`
    width: 100%;
    height: 15rem;
  `,
};

const typeStyles = {
  Default: css`
    background: var(--grey-100);
  `,
};

export const TextArea = styled.textarea<TextAreaProps>`
  ${(props) => sizeStyles[props.Size]}
  ${(props) => typeStyles[props.Type]}
  outline: none;
  font-weight: bold;
  padding: 1.5rem;
  min-height: 15rem;
  border-radius: 0.8rem;
  border: 1px solid transparent;
  border-bottom: 0.15rem solid transparent;
  ${(props) =>
    props.Danger
      ? css`
          border-color: var(--danger-600);
        `
      : css`
          &:focus {
            border-color: var(--primary-500);
          }
        `}
`;

export const DangerText = styled.p`
  color: var(--danger-600);
  font-size: 1.6rem;
  margin-top: 1rem;
  margin-left: 1rem;
`;
