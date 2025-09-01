import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '@/layouts/DefaultLayout';
import Index from './index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: '/feeling',
        lazy: async () => {
          const { SelectFeelings } = await import('./feeling');
          return {
            Component: SelectFeelings
          };
        }
      }
    ],
  },
]);
