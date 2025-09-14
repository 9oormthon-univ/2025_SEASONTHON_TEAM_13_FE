import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '@/layouts/DefaultLayout';
import Index from './index';
import Callback from './callback';
import { NewPagesLayout } from './new/layout';
import { AuthCheck } from './auth-check';
import { SpotifyCallback } from './spotify/callback';
import { MainLayout } from '@/layouts/MainLayout';

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
        path: 'auth/callback',
        element: <SpotifyCallback />,
      },
      {
        element: <AuthCheck />,
        children: [
          {
            element: <MainLayout />,
            children: [
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
                path: 'feed/:id',
                lazy: async () => {
                  const { default: FeedId } = await import('./feed/id');
                  return {
                    Component: FeedId
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
            ]
          },
          {
            path: 'new',
            element: <NewPagesLayout />,
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
                path: 'music',
                lazy: async () => {
                  const { SelectMusic } = await import('./new/music');
                  return {
                    Component: SelectMusic
                  };
                }
              },
              {
                path: 'tag',
                lazy: async () => {
                  const { SelectTags } = await import('./new/tag');
                  return {
                    Component: SelectTags
                  };
                }
              },
              {
                path: 'post',
                lazy: async () => {
                  const { CreateNewPost } = await import('./new/post');
                  return {
                    Component: CreateNewPost
                  };
                }
              }
            ]
          }
        ]
      }
    ],
  },
]);
