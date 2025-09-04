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
