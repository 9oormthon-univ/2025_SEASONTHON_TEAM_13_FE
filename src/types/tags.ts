export interface TagRanking {
  tagName: string
  tagCount: number
}

export interface TagRankingsResponse {
  emotionTags: TagRanking[]
  dayTags: TagRanking[]
}
