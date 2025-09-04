import { instance } from '@/apis/instance';
import type { Feed, FeedComment } from '@/types/feed';

export const getFeed = async (sortBy: 'createdAt' | 'likeCount'): Promise<Feed[]> => {
  const response = await instance.get('/posts', {
    params: {
      sortBy,
    },
  });
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

export const getFeedComments = async (postId: number): Promise<FeedComment[]> => {
  const response = await instance.get(`/posts/${postId}/comments`);
  return response.data;
};

export const postFeedComment = async (postId: number, content: string) => {
  const response = await instance.post(`/posts/${postId}/comments`, { content });
  return response.data;
};
