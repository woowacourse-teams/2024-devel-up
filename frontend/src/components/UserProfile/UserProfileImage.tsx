import * as S from './UserProfile.styled';
import type { UserInfo } from '@/types';

//TODO UserInfo 타입에서 재사용할 수 있을것 같아 Pick으로 선언해놓습니다.
// 인터페이스로 추후에 변경 해도 상관 없어요! @버건디

type UserProfileImageProps = Pick<UserInfo, 'avatar_url'>;

export default function UserProfileImage({ avatar_url }: UserProfileImageProps) {
  return (
    <S.ImageContainer>
      <S.ProfileImage src={avatar_url} />
    </S.ImageContainer>
  );
}
