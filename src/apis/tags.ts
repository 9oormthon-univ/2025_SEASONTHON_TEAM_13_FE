import { instance } from '@/apis/instance';
import type { TagRankingsResponse, SongRankPerTagResponse } from '@/types/tags';

export const getTagRankings = async (): Promise<TagRankingsResponse> => {
  const response = await instance.get('/songs/recommend');
  return response.data;
};

export const getSongRankPerTag = async (tag: string): Promise<SongRankPerTagResponse[]> => {
  const response = await instance.get('/tags/song-rank', {
    params: {
      tagName: tag
    }
  });
  return response.data;
};
