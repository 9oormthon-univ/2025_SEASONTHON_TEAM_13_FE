import { getSongRankPerTag } from '@/apis/tags';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useSongRankPerTag = (tag: string) => {
  return useSuspenseQuery({
    queryKey: ['songRankPerTag', tag],
    queryFn: () => getSongRankPerTag(tag),
    refetchInterval: 1000 * 60 * 1, // 1 minute
  });
};
