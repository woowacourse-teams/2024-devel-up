import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import * as S from './ButtonSample.styled';

export type ButtonVariant = 'default' | 'primary';
export type ButtonSize = 'default' | 'half' | 'full';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default function ButtonSample({
  variant = 'default',
  size = 'default',
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <S.CommonButton $size={size} $variant={variant} {...rest}>
      {children}
    </S.CommonButton>
  );
}
