import { getSongRankPerTag, getTagRankings } from '@/apis/tags';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useSongRankPerTag = (tag: string) => {
  return useSuspenseQuery({
    queryKey: ['songRankPerTag', tag],
    queryFn: () => getSongRankPerTag(tag),
    refetchInterval: 1000 * 60 * 1, // 1 minute
  });
};

export const useTagRankings = () => {
  return useSuspenseQuery({
    queryKey: ['tagRankings'],
    queryFn: getTagRankings,
  });
};
