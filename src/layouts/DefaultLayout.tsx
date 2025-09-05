import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/navbar';
import { Toaster } from 'sonner';

const DefaultLayout = () => {
  const location = useLocation();

  // 네비게이션 바를 표시할 경로들
  const showNav = ['/feed', '/search', '/ranking', '/calendar', '/profile'];

  const shouldShowNav = showNav.some((path) => location.pathname.startsWith(path));

  return (
    <>
      <Outlet />
      {shouldShowNav && <Navbar />}
      <Toaster richColors position='bottom-center' />
    </>
  );
};

export default DefaultLayout;
