import { instance } from '@/apis/instance';
import type { TagRankingsResponse } from '@/types/tags';

export const getTagRankings = async (): Promise<TagRankingsResponse> => {
  const response = await instance.get('/songs/recommend');
  return response.data;
};
