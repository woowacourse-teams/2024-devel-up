import type { UserInfo } from '@/types/user';
import * as S from './UserProfile.styled';

type UserProfileEmailProps = Pick<UserInfo, 'email'>;

export default function UserProfileEmail({ email }: UserProfileEmailProps) {
  return (
    <S.InfoContainer>
      <S.ProfileInfoText>{email}</S.ProfileInfoText>
    </S.InfoContainer>
  );
}
