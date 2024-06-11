// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import PersonalArea from './PersonalArea';

function ProtectedRoute() {
  const token = localStorage.getItem('access_token'); // Check for 'access_token'

  // Log the token to ensure it's retrieved correctly
  console.log('Token:', token);

  // If token doesn't exist, redirect the user to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, show the PersonalArea component
  return <PersonalArea />;
}

export default ProtectedRoute;
