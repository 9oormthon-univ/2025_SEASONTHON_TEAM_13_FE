/* eslint-disable n/no-callback-literal */
import React from 'react';
import { Outlet } from 'react-router-dom';
import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk';
import { SpotifyPlayer } from '@/components/spotify-player';
import { Navbar } from '@/components/navbar';
import Header from '@/components/header';

export const MainLayout = () => {
  const getSpotifyToken = React.useCallback((cb: (token: string) => void) => {
    const spotifyTokenPayload = localStorage.getItem('spotifyToken');

    if (!spotifyTokenPayload) {
      cb('');
      return;
    }

    if (spotifyTokenPayload) {
      try {
        const parsed = JSON.parse(spotifyTokenPayload) as { token?: string; expiresAt?: number };
        if (!parsed?.token || typeof parsed.expiresAt !== 'number' || Date.now() > parsed.expiresAt) {
          localStorage.removeItem('spotifyToken');
          cb('');
          return;
        }
        cb(parsed.token);
      } catch (error) {
        console.error('Error parsing spotify token from localStorage', error);
        localStorage.removeItem('spotifyToken');
        cb('');
      }
    }
  }, []);

  return (
    <WebPlaybackSDK
      initialDeviceName='이음(Emotion Music)'
      getOAuthToken={getSpotifyToken}
    >
      <Header />
      <Outlet />
      <Navbar />
      <SpotifyPlayer />
    </WebPlaybackSDK>
  );
};
