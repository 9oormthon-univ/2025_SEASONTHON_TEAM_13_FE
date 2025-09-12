import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/navbar';
import Header from '@/components/header';
import { Toaster } from 'sonner';
import { Suspense, useEffect } from 'react';
import Lottie from 'lottie-react';
import loading from '@/assets/loading.json';

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
      <Suspense
        fallback={
          <div className='min-h-screen w-full flex justify-center items-center'>
            <Lottie animationData={loading} loop style={{ height: 80, width: '100%' }} />
          </div>
      }
      >
        <Outlet />
      </Suspense>
      {shouldShowNav && <Navbar />}
      <Toaster richColors position='bottom-center' />
    </>
  );
};

export default DefaultLayout;
