import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ element: Component, ...props }) {
  const { pathname } = useLocation();
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-up" state={{ backUrl: pathname }} replace />
  );
}
