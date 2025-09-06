import React from 'react';
import type { SpotifyController, IFrameAPI } from '@/hooks/useiFrameAPI';
import { increaseSongPlayCount } from '@/apis/songs';

export const SpotifyIframe = ({ id, iFrameAPI }: {
  id: string
  iFrameAPI?: IFrameAPI
}) => {
  const embedRef = React.useRef(null);
  const spotifyEmbedControllerRef = React.useRef<SpotifyController | null>(null);
  const [playerLoaded, setPlayerLoaded] = React.useState(false);
  const uri = `spotify:track:${id}`;

  React.useEffect(() => {
    if (playerLoaded || iFrameAPI === undefined) {
      return;
    }

    iFrameAPI.createController(
      embedRef.current,
      {
        width: '100%',
        height: '100%',
        uri,
      },
      (spotifyEmbedController) => {
        spotifyEmbedController.addListener('ready', () => {
          setPlayerLoaded(true);
        });

        spotifyEmbedController.addListener('playback_started', (_) => {
          increaseSongPlayCount(id);
        });

        spotifyEmbedControllerRef.current = spotifyEmbedController;
      }
    );

    return () => {
      if (spotifyEmbedControllerRef.current) {
        spotifyEmbedControllerRef.current.removeListener('playback_started');
      }
    };
  }, [playerLoaded, iFrameAPI, id, uri]);

  return (
    <div className='w-full h-20' ref={embedRef} />
  );
};
