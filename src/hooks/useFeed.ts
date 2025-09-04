import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFeed, likeFeed, unlikeFeed } from '@/apis/feed';

export const useGetFeed = () => {
  return useSuspenseQuery({
    queryKey: ['feed'],
    queryFn: getFeed,
  });
};

export const useLikeFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: likeFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};

export const useUnlikeFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unlikeFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};
