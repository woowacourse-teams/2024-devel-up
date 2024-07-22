import { styled, css } from 'styled-components';

interface InputProps {
  Size: 'Small' | 'Medium' | 'Large' | 'XLarge';
  Type: 'Default';
  Danger: boolean;
}

const sizeStyles = {
  Small: css`
    width: 40rem;
    height: 6.3rem;
  `,
  Medium: css`
    width: 50rem;
    height: 6.3rem;
  `,
  Large: css`
    width: 73rem;
    height: 6.3rem;
  `,
  XLarge: css`
    width: 100%;
    height: 6.3rem;
  `,
};

const borderRadiusStyles = {
  Small: css`
    border-radius: 0.8rem 0.8rem 0 0;
  `,
  Medium: css`
    border-radius: 0.8rem 0.8rem 0 0;
  `,
  Large: css`
    border-radius: 8px;
  `,
  XLarge: css`
    border-radius: 8px;
  `,
};

const typeStyles = {
  Default: css`
    background: var(--grey-100);
  `,
};

export const Input = styled.input<InputProps>`
  ${(props) => sizeStyles[props.Size]}
  ${(props) => borderRadiusStyles[props.Size]}
  ${(props) => typeStyles[props.Type]}
  outline: none;
  padding: 2.3rem;
  border: none;
  border-bottom: 0.15rem solid transparent;
  font-weight: bold;
  ${(props) =>
    props.Danger
      ? css`
          border-bottom-color: var(--danger-600);
        `
      : css`
          &:focus {
            border-bottom-color: var(--primary-500);
          }
        `}
`;

export const DangerText = styled.p`
  color: var(--danger-600);
  font-size: 1.6rem;
  margin-top: 1rem;
  margin-left: 2.3rem;
`;
