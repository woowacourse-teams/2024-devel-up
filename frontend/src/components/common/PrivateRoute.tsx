import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps extends PropsWithChildren {
  redirectTo: string;
}

export default function PrivateRoute({ redirectTo, children }: PrivateRouteProps) {
  const token = '';

  return token ? children : <Navigate to={redirectTo} />;
}
