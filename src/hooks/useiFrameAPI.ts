import React from 'react';

export type SpotifyController = {
  addListener: (event: string, callback: (data: unknown) => void) => void;
  removeListener: (event: string) => void;
};

export type IFrameAPI = {
  createController: (
    element: HTMLElement | null,
    options: { width: string; height: string; uri: string },
    callback: (controller: SpotifyController) => void
  ) => void;
} | undefined;

export const useIFrameAPI = (): IFrameAPI => {
  const [iFrameAPI, setIFrameAPI] = React.useState<IFrameAPI>(undefined);

  React.useEffect(() => {
    if (document.querySelector('script[src="https://open.spotify.com/embed/iframe-api/v1"]')) {
      return;
    }
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

  return iFrameAPI;
};
