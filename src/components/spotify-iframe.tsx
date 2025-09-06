import { increaseSongPlayCount } from '@/apis/songs';
import React from 'react';

type SpotifyController = {
  addListener: (event: string, callback: (data: unknown) => void) => void;
  removeListener: (event: string) => void;
};

export const SpotifyIframe = ({ id }: { id: string }) => {
  const embedRef = React.useRef(null);
  const spotifyEmbedControllerRef = React.useRef<SpotifyController | null>(null);
  const [iFrameAPI, setIFrameAPI] = React.useState<{
    createController: (
    element: HTMLElement | null,
    options: { width: string; height: string; uri: string },
    callback: (controller: SpotifyController) => void
    ) => void;
  } | undefined>(undefined);
  const [playerLoaded, setPlayerLoaded] = React.useState(false);
  const uri = `spotify:track:${id}`;

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  React.useEffect(() => {
    if (iFrameAPI) {
      return;
    }

    // @ts-expect-error Spotify uses global callback
    window.onSpotifyIframeApiReady = (SpotifyIframeApi) => {
      setIFrameAPI(SpotifyIframeApi);
    };
  }, [iFrameAPI]);

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
