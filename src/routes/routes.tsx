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
        path: '/feed',
        lazy: async () => {
          const { default: Feed } = await import('./feed');
          return {
            Component: Feed
          };
        },
      },
      {
        path: '/search',
        lazy: async () => {
          const { default: Search } = await import('./search');
          return {
            Component: Search
          };
        },
      },
      {
        path: '/ranking',
        lazy: async () => {
          const { default: Ranking } = await import('./ranking');
          return {
            Component: Ranking
          };
        },
      },
      {
        path: '/calendar',
        lazy: async () => {
          const { default: Calendar } = await import('./calendar');
          return {
            Component: Calendar
          };
        },
      },
      {
        path: '/profile',
        lazy: async () => {
          const { default: Profile } = await import('./profile');
          return {
            Component: Profile
          };
        },
      },
      {
        path: '/feeling',
        lazy: async () => {
          const { SelectFeelings } = await import('./feeling');
          return {
            Component: SelectFeelings
          };
        },
      },
    ],
  },
]);
