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

export const getFeedPage = async (sortBy: 'createdAt' | 'likeCount', page: number): Promise<Feed[]> => {
  const response = await instance.get('/posts', {
    params: {
      sortBy,
      page,
    },
  });
  return response.data;
};

export const postFeed = async (emotionTags: string[], dailyTags: string[], songTrackId: string) => {
  const response = await instance.post('/posts', {
    emotionTags,
    dailyTags,
    songTrackId,
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

export const getFeedById = async (postId: number): Promise<Feed> => {
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

export const getMyTodayFeed = async (): Promise<Feed | null> => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  const date = `${year}-${month}-${day}`;
  const response = await instance.get('/posts/me', {
    params: {
      createdDate: date
    }
  });
  return response.data;
};

export const searchFeedsByTag = async (tag: string, page: number = 0, size: number = 10): Promise<Feed[]> => {
  const response = await instance.get('/posts/search', {
    params: {
      tag,
      page,
      size
    }
  });
  return response.data;
};

export const deleteFeed = async (postId: number) => {
  const response = await instance.delete(`/posts/${postId}`);
  return response.data;
};
