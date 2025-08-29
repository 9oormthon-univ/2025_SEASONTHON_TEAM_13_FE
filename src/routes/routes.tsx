import { createBrowserRouter } from 'react-router';
import Index from './index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
]);
