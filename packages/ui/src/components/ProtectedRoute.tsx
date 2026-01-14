import React, { useEffect, useState } from 'react';
import { Loading } from './Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  checkAuth?: () => Promise<boolean>;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback,
  redirectTo = '/login',
  checkAuth
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verify = async () => {
      try {
        if (checkAuth) {
          const authenticated = await checkAuth();
          setIsAuthenticated(authenticated);
        } else {
          // Default: check for token in localStorage
          const token = localStorage.getItem('token');
          setIsAuthenticated(!!token);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verify();
  }, [checkAuth]);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = redirectTo;
    }
    return null;
  }

  return <>{children}</>;
};
