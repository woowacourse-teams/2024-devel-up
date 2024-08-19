import type { UserInfo } from '@/types/user';
import * as S from '../CommentList.styled';
import type { SyntheticEvent } from 'react';
import DefaultUserIcon from '@/assets/images/default-user.png';

interface CommentUserInfoProps {
  member: UserInfo;
}

export default function CommentUserInfo({ member }: CommentUserInfoProps) {
  const { imageUrl, name } = member;

  const handleImageError = ({ target }: SyntheticEvent<HTMLImageElement>) => {
    if (target instanceof HTMLImageElement) {
      target.src = DefaultUserIcon;
    }
  };

  return (
    <S.CommentUserInfoContainer>
      <S.UserProfileImg src={imageUrl} onError={handleImageError} />
      <S.UserName>{name}</S.UserName>
    </S.CommentUserInfoContainer>
  );
}
