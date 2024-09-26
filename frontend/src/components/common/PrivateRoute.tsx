import useUserInfo from '@/hooks/useUserInfo';
import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps extends PropsWithChildren {
  redirectTo: string;
}

export default function PrivateRoute({ redirectTo, children }: PrivateRouteProps) {
  const { data: userInfo } = useUserInfo();

  return userInfo ? <>{children}</> : <Navigate to={redirectTo} />;
}
