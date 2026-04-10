import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { getRegisteredUser } from '../auth';

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const user = getRegisteredUser();

  if (!user) {
    return (
      <Navigate
        to="/register"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <>{children}</>;
}
