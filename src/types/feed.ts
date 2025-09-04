export interface Feed {
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
