import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/navbar';

const DefaultLayout = () => {
  const location = useLocation();

  // 네비게이션 바를 표시할 경로들
  const showNav = ['/feed', '/search', '/ranking', '/calendar', '/profile'];

  const shouldShowNav = showNav.some((path) => location.pathname.startsWith(path));

  return (
    <>
      <Outlet />
      {shouldShowNav && <Navbar />}
    </>
  );
};

export default DefaultLayout;
