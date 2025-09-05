import { NewPagesProvider } from '@/providers/new-pages-provider';
import { Outlet } from 'react-router-dom';

export const NewPagesLayout = () => {
  return (
    <NewPagesProvider>
      <Outlet />
    </NewPagesProvider>
  );
};
