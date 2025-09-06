export const FEELINGS = [
  { id: 22, emoji: '😡', name: '짜증' },
  { id: 21, emoji: '😤', name: '화남' },
  { id: 29, emoji: '🤯', name: '힘듦' },
  { id: 20, emoji: '🤗', name: '즐거움' },
  { id: 18, emoji: '☺️', name: '기쁨' },
  { id: 19, emoji: '🥰', name: '행복' },
  { id: 27, emoji: '🥱', name: '피곤함' },
  { id: 25, emoji: '😔', name: '우울' },
  { id: 28, emoji: '😪', name: '졸림' },
  { id: 26, emoji: '😢', name: '외로움' },
  { id: 24, emoji: '😭', name: '슬픔' },
  { id: 23, emoji: '💭', name: '복잡함' },
  { id: 32, emoji: '😍', name: '두근거림' },
  { id: 30, emoji: '🥹', name: '감동' },
  { id: 33, emoji: '🥰', name: '설렘' },
  { id: 34, emoji: '😮', name: '놀람' },
  { id: 31, emoji: '🤪', name: '어지러움' }
] as const;

export type FeelingID = typeof FEELINGS[number]['id'];
export type FeelingName = typeof FEELINGS[number]['name'];
