import useUserInfo from '@/hooks/useUserInfo';
import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

interface PrivateRouteProps extends PropsWithChildren {
  redirectTo: string;
}

export default function PrivateRoute({ redirectTo, children }: PrivateRouteProps) {
  const { data: userInfo, isLoading } = useUserInfo();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return userInfo ? <>{children}</> : <Navigate to={redirectTo} />;
}
