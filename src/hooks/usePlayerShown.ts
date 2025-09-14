import { useSpotifyPlayer, usePlayerDevice, usePlaybackState } from 'react-spotify-web-playback-sdk';

export const usePlayerShown = () => {
  const player = useSpotifyPlayer();
  const currentDevice = usePlayerDevice();
  const state = usePlaybackState();

  return player && currentDevice && state && state.track_window.current_track;
};
