export interface Song {

  trackId: string;
  title: string;
  artist: string;
  albumArtUrl: string;
  playCount: number;
  spotifyPlayUrl: string;
}
export interface Feed {
  id: number;
  emotionTags: string[];
  dailyTags: string[];
  user: string;
  likeCount: number;
  likeState: boolean;
  userImageUrl: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  song: Song;
}
export interface FeedComment {
  id: number,
  content: string,
  authorNickname: string,
  authorProfileImageUrl: string,
  createdAt: string
}
