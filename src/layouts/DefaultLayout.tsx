import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useEffect } from 'react';

const DefaultLayout = () => {
  const location = useLocation();

  // 페이지 변경 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Outlet />
      <Toaster richColors position='bottom-center' />
    </>
  );
};

export default DefaultLayout;
