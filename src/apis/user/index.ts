import { instance } from '@/apis/instance';
import type { User } from '@/types/user';
import type { Feed } from '@/types/feed';

export const getUser = async (): Promise<User> => {
  const response = await instance.get('/users/me');
  return response.data;
};

export const getUserLikes = async (): Promise<Feed[]> => {
  const response = await instance.get('/posts/me/likes');
  return response.data;
};
