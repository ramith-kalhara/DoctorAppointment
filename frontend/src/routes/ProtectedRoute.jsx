import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/" />;
  }

  // Else show the route
  return children;
};

export default ProtectedRoute;
