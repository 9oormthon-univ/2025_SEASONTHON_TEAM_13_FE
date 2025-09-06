import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/navbar';
import Header from '@/components/header';
import { Toaster } from 'sonner';
import { useEffect } from 'react';

const DefaultLayout = () => {
  const location = useLocation();

  const showHeader = ['/feed', '/search', '/ranking', '/calendar', '/profile'];
  const showNav = ['/feed', '/search', '/ranking', '/calendar', '/profile'];

  const shouldShowHeader = showHeader.some((path) => location.pathname.startsWith(path));
  const shouldShowNav = showNav.some((path) => location.pathname.startsWith(path));

  // 페이지 변경 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Outlet />
      {shouldShowNav && <Navbar />}
      <Toaster richColors position='bottom-center' />
    </>
  );
};

export default DefaultLayout;
