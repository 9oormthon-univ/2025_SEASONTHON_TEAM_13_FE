import React from 'react';
import { getSpotifyLoginURL } from '@/apis/login';
import { increaseSongPlayCount } from '@/apis/songs';
import { useSpotifyPlayer, usePlayerDevice, useErrorState } from 'react-spotify-web-playback-sdk';
import { toast } from 'sonner';

export const usePlaySong = () => {
  const player = useSpotifyPlayer();
  const device = usePlayerDevice();
  const error = useErrorState();
  const [starting, setStarting] = React.useState(false);

  const playSong = async (trackId: string) => {
    if (starting) return;
    setStarting(true);
    const { token } = JSON.parse(localStorage.getItem('spotifyToken') || '{}');
    if ((error && error.type === 'authentication_error') || !token) {
      const loginURL = await getSpotifyLoginURL();
      window.location.href = loginURL;
      return;
    }
    if (!player || !device) {
      toast.error('스포티파이 플레이어가 준비되지 않았어요. 잠시 후 다시 시도해주세요.');
      return;
    }
    if (device.status === 'not_ready') {
      await player?.connect();
    }
    const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device?.device_id ?? ''}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        uris: [`spotify:track:${trackId}`]
      })
    });
    if (!response.ok) {
      console.error('Failed to start playback', response);
      toast.error('재생에 실패했어요. 다시 시도해주세요.');
      return;
    }
    player?.activateElement();
    player?.resume();
    await increaseSongPlayCount(trackId);
    setStarting(false);
  };

  return playSong;
};
