import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/navbar';

const DefaultLayout = () => {
  const location = useLocation();

  // 네비게이션 바를 표시할 경로들
  const showNav = ['/feed', '/search', '/ranking', '/calendar', '/profile'];

  // 현재 경로가 showNav 배열에 포함되어 있는지 확인 (feed/:id 포함)
  const shouldShowNav = showNav.includes(location.pathname) || location.pathname.startsWith('/feed/');

  return (
    <>
      <Outlet />
      {shouldShowNav && <Navbar />}
    </>
  );
};

export default DefaultLayout;
