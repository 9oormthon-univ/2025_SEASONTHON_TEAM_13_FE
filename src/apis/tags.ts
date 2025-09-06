import { instance } from '@/apis/instance';
import type { SongRankPerTagResponse } from '@/types/tags';

export const getSongRankPerTag = async (tag: string): Promise<SongRankPerTagResponse[]> => {
  const response = await instance.get('/tags/song-rank', {
    params: {
      tagName: tag
    }
  });
  return response.data;
};
