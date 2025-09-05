import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFeed, likeFeed, unlikeFeed, getFeedById, getFeedComments, postFeedComment } from '@/apis/feed';

export const useGetFeed = (sortBy: 'createdAt' | 'likeCount') => {
  return useSuspenseQuery({
    queryKey: ['feed', sortBy],
    queryFn: () => getFeed(sortBy),
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

export const usePostFeedComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, content }: { postId: number; content: string }) => postFeedComment(postId, content),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['feed', postId, 'comments'] });
      queryClient.invalidateQueries({ queryKey: ['feed', postId] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
};
