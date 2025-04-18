// frontend/src/utils/RequireAuth.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('jwt');
  return token ? children : <Navigate to="/login" />;
};

export default RequireAuth;
