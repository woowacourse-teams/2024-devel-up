import { useEffect, useState } from 'react';

const useUserInfo = (onUnauthenticated: () => void) => {
  const [userInfo, setUserInfo] = useState(null);

  // TODO(@라이언): 토큰 가져오는 로직 추가
  const token = '';

  // TODO(@라이언): cookie 지우는 로직 추가
  const removeCookie = () => {};

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) {
        setUserInfo(null);
      }

      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch {
        removeCookie();
        onUnauthenticated();
      }
    };

    fetchUserInfo();
  }, []);

  return { userInfo };
};

export default useUserInfo;
