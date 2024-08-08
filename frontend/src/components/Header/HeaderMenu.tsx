import { Link } from 'react-router-dom';
import * as S from './Header.styled';

interface HeaderMenuProps {
  name: string;
  path: string;
  currentPath: string;
}

export default function HeaderMenu({ name, path, currentPath }: HeaderMenuProps) {
  const isCurrentMenu = currentPath === path;

  return (
    <Link to={path}>
      <S.MenuText $isActive={isCurrentMenu}>{name}</S.MenuText>
    </Link>
  );
}
