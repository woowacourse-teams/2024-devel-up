import styled, { css } from 'styled-components';

interface InputProps {
  $width: 'small' | 'medium' | 'large' | 'xlarge';
  $type: 'default';
  $danger: boolean;
}

const sizeStyles = {
  small: css`
    width: 40rem;
    height: 6.3rem;
  `,
  medium: css`
    width: 50rem;
    height: 6.3rem;
  `,
  large: css`
    width: 73rem;
    height: 6.3rem;
  `,
  xlarge: css`
    width: 100%;
    height: 6.3rem;
  `,
};

const borderRadiusStyles = {
  small: css`
    border-radius: 0.8rem 0.8rem 0 0;
  `,
  medium: css`
    border-radius: 0.8rem 0.8rem 0 0;
  `,
  large: css`
    border-radius: 0.8rem;
  `,
  xlarge: css`
    border-radius: 0.8rem;
  `,
};

const typeStyles = {
  default: css`
    background: ${(props) => props.theme.colors.grey100};
  `,
};

export const Input = styled.input<InputProps>`
  ${(props) => sizeStyles[props.$width]}
  ${(props) => borderRadiusStyles[props.$width]}
  ${(props) => typeStyles[props.$type]}
  outline: none;
  padding: 2.3rem;
  border: none;
  border-bottom: 0.15rem solid transparent;
  font-weight: bold;
  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
  ${(props) =>
    props.$danger
      ? css`
          border-bottom-color: ${(props) => props.theme.colors.danger600};
        `
      : css`
          &:focus {
            border-bottom-color: ${(props) => props.theme.colors.primary500};
          }
        `}
`;

export const DangerText = styled.p`
  color: ${(props) => props.theme.colors.danger600};
  ${(props) => props.theme.font.caption}
  margin-top: 1rem;
  margin-left: 2.3rem;
`;
