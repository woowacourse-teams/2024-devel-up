// import NotiModal from './NotiModal';
import useUserInfo from '@/hooks/useUserInfo';
import useLogoutMutation from '@/hooks/useLogoutMutation';
import Desktop from './Desktop';
import Mobile from './Mobile';
// import useModal from '@/hooks/useModal';

export default function Header() {
  const { data: userInfo } = useUserInfo();
  const { handleUserLogout } = useLogoutMutation();
  // const { isModalOpen, handleModalClose, handleToggleModal } = useModal();

  return (
    <>
      <Desktop userInfo={userInfo} handleUserLogout={handleUserLogout} />
      <Mobile userInfo={userInfo} handleUserLogout={handleUserLogout} />
    </>
  );
}
