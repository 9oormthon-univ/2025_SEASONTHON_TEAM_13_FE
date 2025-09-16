export interface User {
  userId: number,
  username: string,
  email: string,
  profileUrl: string
}

export interface UserState {
  postCount: number;
  likeCount: number;
  mostUsedEmotion: string;
}
