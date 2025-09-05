import { instance } from '@/apis/instance';
import type { Feed } from '@/types/feed';

export const getCalendar = async (): Promise<Feed[]> => {
  const response = await instance.get('/posts/calendar');
  return response.data;
};
