import { PauseIcon, PlayIcon } from 'lucide-react';
import React from 'react';
import { usePlaybackState, usePlayerDevice, useSpotifyPlayer } from 'react-spotify-web-playback-sdk';

export const SpotifyPlayer = () => {
  const currentDevice = usePlayerDevice();
  const player = useSpotifyPlayer();
  const state = usePlaybackState(true, 1);

  const progressRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<number | undefined>(undefined);

  const animate = React.useCallback(() => {
    if (state && !state.paused && progressRef.current && state.duration > 0) {
      const progress = (state.position / state.duration) * 100;
      progressRef.current.style.width = `${progress}%`;
      frameRef.current = requestAnimationFrame(animate);
    }
  }, [state]);

  React.useEffect(() => {
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [animate]);

  if (!player || !currentDevice || !state || !state.track_window.current_track) {
    return null;
  }

  const { current_track: currentTrack } = state.track_window;
  const isPaused = state.paused;

  return (
    <div className='fixed bottom-0 w-full max-w-[500px] h-44 bg-gradient-to-b from-[#FF7972] to-[#E04037] to-50% rounded-t-3xl'>
      <div className='py-2.5 px-6 flex flex-row gap-3 items-center'>
        <img src={currentTrack.album.images[0]?.url ?? ''} className='size-14 rounded-lg' />
        <div className='flex flex-col flex-grow gap-3'>
          <div className='flex flex-row items-center'>
            <div className='flex flex-col flex-grow'>
              <p className='font-semibold text-white'>{currentTrack.name}</p>
              <p className='text-xs font-medium text-[#FDE8E7]'>{currentTrack.artists.map(artist => artist.name).join(', ')}</p>
            </div>
            <button
              className='size-7 hover:cursor-pointer' onClick={() => {
                player.togglePlay();
              }}
            >
              {isPaused ? <PlayIcon className='size-7 text-white' fill='currentColor' strokeWidth={0} /> : <PauseIcon className='size-7 text-white' fill='currentColor' strokeWidth={0} />}
            </button>
          </div>
          <div className='relative h-1 w-full bg-[#FBD7D6] rounded-full'>
            <div ref={progressRef} className='absolute top-0 left-0 h-1 bg-white rounded-full' />
          </div>
        </div>
      </div>
    </div>
  );
};
