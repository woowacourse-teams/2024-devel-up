import type { HTMLAttributes } from 'react';
import * as S from './Header.styled';

interface HeaderMenuProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  path: string;
  currentPath: string;
  handleToggle?: () => void;
}

export default function HeaderMenu({ name, path, currentPath, handleToggle }: HeaderMenuProps) {
  const isCurrentMenu = currentPath === path;

  return (
    <S.MenuTextLink to={path} onClick={handleToggle}>
      <S.MenuText $isActive={isCurrentMenu}>{name}</S.MenuText>
    </S.MenuTextLink>
  );
}
