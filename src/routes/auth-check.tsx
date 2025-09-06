import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const AuthCheck = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp <= currentTime) {
          localStorage.removeItem('accessToken');
          navigate('/');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('accessToken');
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  return <Outlet />;
};
