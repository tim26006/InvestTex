import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PersonalArea from './PersonalArea';

function ProtectedRoute() {
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    console.log('Token:', token);

    const handleBeforeUnload = (event) => {

      if (!event.returnValue) {
        console.log('Clearing token on window close...');
        localStorage.removeItem('access_token');
      }
    };


    window.addEventListener('beforeunload', handleBeforeUnload);


    return () => {
      console.log('Removing beforeunload event listener...');
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <PersonalArea />;
}

export default ProtectedRoute;
