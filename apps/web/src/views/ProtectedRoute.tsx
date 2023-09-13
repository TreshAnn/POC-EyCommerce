import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface ProtectedRouteProps {
  roleRequired: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  roleRequired,
}) => {
  const { user } = useAuth();

  try {
    if (user.role === roleRequired) {
      // Render nested routes
      return <Outlet />;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  } catch (error) {
    return <Navigate to="/login" />;
  }
};
