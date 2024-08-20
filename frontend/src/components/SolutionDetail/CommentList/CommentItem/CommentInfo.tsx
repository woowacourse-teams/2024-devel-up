import type { UserInfo } from '@/types/user';
import * as S from '../CommentList.styled';
import type { SyntheticEvent } from 'react';
import DefaultUserIcon from '@/assets/images/default-user.png';
import { formatDateString } from '@/utils/formatDateString';

interface CommentInfoProps {
  member: UserInfo;
  createdAt: string;
}

export default function CommentInfo({ member, createdAt }: CommentInfoProps) {
  const { imageUrl, name } = member;

  const handleImageError = ({ target }: SyntheticEvent<HTMLImageElement>) => {
    if (target instanceof HTMLImageElement) {
      target.src = DefaultUserIcon;
    }
  };

  return (
    <S.CommentInfoContainer>
      <S.UserProfileImg src={imageUrl} onError={handleImageError} />
      <S.UserName>{name}</S.UserName>
      <S.CommentCreatedAt>{formatDateString(createdAt)}</S.CommentCreatedAt>
    </S.CommentInfoContainer>
  );
}
