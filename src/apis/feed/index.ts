import { instance } from '@/apis/instance';
import type { Feed } from '@/types/feed';

export const getFeed = async (): Promise<Feed[]> => {
  const response = await instance.get('/posts');
  return response.data;
};

export const likeFeed = async (postId: number) => {
  const response = await instance.post(`/posts/${postId}/like`);
  return response.data;
};

export const unlikeFeed = async (postId: number) => {
  const response = await instance.delete(`/posts/${postId}/like`);
  return response.data;
};

export const getFeedById = async (postId: number) => {
  const response = await instance.get(`/posts/${postId}`);
  return response.data;
};
