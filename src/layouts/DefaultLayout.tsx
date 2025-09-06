import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/navbar';
import Header from '@/components/header';
import { Toaster } from 'sonner';

const DefaultLayout = () => {
  const location = useLocation();

  const showHeader = ['/feed', '/calendar', '/profile'];
  const showNav = ['/feed', '/search', '/ranking', '/calendar', '/profile'];

  const shouldShowHeader = showHeader.some((path) => location.pathname.startsWith(path));
  const shouldShowNav = showNav.some((path) => location.pathname.startsWith(path));

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
