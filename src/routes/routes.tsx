import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '@/layouts/DefaultLayout';
import Index from './index';
import Feed from './feed';
import Search from './search';
import Ranking from './ranking';
import Calendar from './calendar';
import Profile from './profile';

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
        path: '/feed',
        element: <Feed />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/ranking',
        element: <Ranking />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);
