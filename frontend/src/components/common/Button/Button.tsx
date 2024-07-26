import type { PropsWithChildren } from 'react';
import * as S from './Button.styled';

interface ButtonProps {
  content: string;
  type?: 'default' | 'icon';
  $bgColor?: string;
  $hoverColor?: string;
  $fontColor?: string;
  disabled?: boolean;
  onHandleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  content,
  type = 'default',
  $bgColor = '--primary-500',
  $hoverColor = '--primary-600',
  $fontColor = '--white-color',
  disabled = false,
  onHandleClick,
  children,
}: ButtonProps & PropsWithChildren) {
  type;
  $bgColor;
  disabled;
  return (
    <S.CommonButton
      $bgColor={disabled ? '--grey-100' : $bgColor}
      $hoverColor={disabled ? '--grey-100' : $hoverColor}
      $fontColor={disabled ? '--black-color' : $fontColor}
      onClick={onHandleClick}
      disabled={disabled}  
    >
      {type === 'icon' && children}
      {content}
    </S.CommonButton>
  );
}
