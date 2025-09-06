import { instance } from '@/apis/instance';
import type { Music } from '@/types/music';

export const getRecommendedSongs = async (emotions: string[], limit: number = 10): Promise<Music[]> => {
  const response = await instance.get('/songs/recommend', {
    params: {
      emotions: emotions.join(','),
      limit: limit.toString()
    }
  });
  return response.data;
};

export const searchSongs = async (query: string, limit: number = 10): Promise<Music[]> => {
  const response = await instance.get('/songs/search', {
    params: {
      query,
      limit: limit.toString()
    }
  });
  return response.data;
};

export const increaseSongPlayCount = async (songId: string) => {
  const response = await instance.post(`/songs/${songId}/count`);
  return response.data;
};
