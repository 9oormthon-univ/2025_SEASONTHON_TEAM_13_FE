import { instance } from '@/apis/instance';

interface Feed {
  id: number;
  emotionTags: string[];
  dailyTags: string[];
  trackId: string;
  user: string;
  likeCount: number;
  likeState: boolean;
  userImageUrl: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

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
