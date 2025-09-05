import { getTagRankings } from '@/apis/tags';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useTagRankings = () => {
  return useSuspenseQuery({
    queryKey: ['tagRankings'],
    queryFn: getTagRankings,
  });
};
