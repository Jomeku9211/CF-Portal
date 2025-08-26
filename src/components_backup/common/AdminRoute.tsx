import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children, redirectTo = '/super-admin' }) => {
  let isSuperAdmin = false;
  try {
    isSuperAdmin = localStorage.getItem('isSuperAdmin') === '1';
  } catch {}

  if (!isSuperAdmin) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
