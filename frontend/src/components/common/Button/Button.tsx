import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import * as S from './Button.styled';
import type { BUTTON_VARIANTS, BUTTON_SIZE } from '@/constants/variants';

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
export type ButtonSize = keyof typeof BUTTON_SIZE;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default function Button({
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
