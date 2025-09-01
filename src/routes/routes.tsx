import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '@/layouts/DefaultLayout';
import Index from './index';
import { SelectFeelings } from './feeling';

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
        element: <SelectFeelings />,
      }
    ],
  },
]);
