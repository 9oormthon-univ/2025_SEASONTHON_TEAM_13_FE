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
    if (spotifyTokenPayload) {
      const { expiresAt, token } = JSON.parse(spotifyTokenPayload);
      if (Date.now() > expiresAt) {
        localStorage.removeItem('spotifyToken');
        cb('');
        return;
      }
      cb(token);
      return;
    }
    cb('');
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
