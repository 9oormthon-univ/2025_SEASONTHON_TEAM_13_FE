import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '@/layouts/DefaultLayout';
import Index from './index';
import Callback from './callback';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'oauth/callback',
        element: <Callback />,
      },
      {
        path: 'feed',
        lazy: async () => {
          const { default: Feed } = await import('./feed');
          return {
            Component: Feed
          };
        },
      },
      {
        path: 'search',
        lazy: async () => {
          const { default: Search } = await import('./search');
          return {
            Component: Search
          };
        },
      },
      {
        path: 'ranking',
        lazy: async () => {
          const { default: Ranking } = await import('./ranking');
          return {
            Component: Ranking
          };
        },
      },
      {
        path: 'calendar',
        lazy: async () => {
          const { default: Calendar } = await import('./calendar');
          return {
            Component: Calendar
          };
        },
      },
      {
        path: 'profile',
        lazy: async () => {
          const { default: Profile } = await import('./profile');
          return {
            Component: Profile
          };
        },
      },
      {
        path: 'new',
        children: [
          {
            path: 'feeling',
            lazy: async () => {
              const { SelectFeelings } = await import('./new/feeling');
              return {
                Component: SelectFeelings
              };
            },
          },
          {
            path: 'tag',
            lazy: async () => {
              const { SelectTags } = await import('./new/tag');
              return {
                Component: SelectTags
              };
            }
          }
        ]
      }
    ],
  },
]);
