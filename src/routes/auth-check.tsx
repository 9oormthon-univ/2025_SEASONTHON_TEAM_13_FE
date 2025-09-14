import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getMyTodayFeed } from '@/apis/feed';

export const AuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken: { exp?: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if ((decodedToken.exp ?? 0) <= currentTime) {
          localStorage.removeItem('accessToken');
          navigate('/');
        }
        if (!location.pathname.startsWith('/new')) {
          const checkTodayFeed = async () => {
            try {
              const myTodayFeed = await getMyTodayFeed();
              if (!myTodayFeed) {
                navigate('/new/feeling');
              }
            } catch (error) {
              console.error("Error fetching today's feed:", error);
              navigate('/');
            }
          };
          checkTodayFeed();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('accessToken');
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate, location.pathname]);

  return (
    <Outlet />
  );
};
