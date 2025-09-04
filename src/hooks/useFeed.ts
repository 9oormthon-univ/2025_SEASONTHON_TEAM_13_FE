import { useSuspenseQuery } from '@tanstack/react-query';
import { getFeed } from '@/apis/feed';

export const useGetFeed = () => {
  return useSuspenseQuery({
    queryKey: ['feed'],
    queryFn: getFeed,
  });
};
