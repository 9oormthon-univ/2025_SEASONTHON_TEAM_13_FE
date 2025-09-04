import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFeed, likeFeed, unlikeFeed, getFeedById, getFeedComments } from '@/apis/feed';

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

export const useGetFeedById = (postId: number) => {
  return useSuspenseQuery({
    queryKey: ['feed', postId],
    queryFn: () => getFeedById(postId),
  });
};

export const useGetFeedComments = (postId: number) => {
  return useSuspenseQuery({
    queryKey: ['feed', postId, 'comments'],
    queryFn: () => getFeedComments(postId),
  });
};
