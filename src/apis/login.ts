import { instance } from '@/apis/instance';

export const getSpotifyLoginURL = async () => {
  const response = await instance.get('/login/spotify/url');
  return response.data;
};
