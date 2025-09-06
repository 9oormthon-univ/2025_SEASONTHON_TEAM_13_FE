export interface TagMusic {
  trackId: string
  trackTitle: string
  artist: string
  albumImageUrl: string
  usageCount: number
  playCount: number
}

export interface SongRankPerTagResponse {
  emotionTag: string
  totalSongCount: number
  tracks: TagMusic[]
}
