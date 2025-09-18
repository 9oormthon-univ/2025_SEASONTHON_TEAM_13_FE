import { useSuspenseQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { getFeed, likeFeed, unlikeFeed, getFeedById, getFeedComments, postFeedComment, getFeedPage, deleteFeed } from '@/apis/feed';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useGetFeed = (sortBy: 'createdAt' | 'likeCount') => {
  return useSuspenseQuery({
    queryKey: ['feed', sortBy],
    queryFn: () => getFeed(sortBy),
  });
};

export const useGetFeedInfinite = (sortBy: 'createdAt' | 'likeCount') => {
  return useInfiniteQuery({
    queryKey: ['feed', sortBy],
    queryFn: ({ pageParam = 0 }) => getFeedPage(sortBy, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지가 비어있으면 더 이상 페이지가 없음
      if (lastPage.length === 0) return undefined;
      // 다음 페이지는 현재 페이지 번호 + 1
      return allPages.length;
    },
  });
};

export const useLikeFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: likeFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['calendar'] });
      queryClient.invalidateQueries({ queryKey: ['userLikes'] });
    },
  });
};

export const useUnlikeFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unlikeFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['calendar'] });
      queryClient.invalidateQueries({ queryKey: ['userLikes'] });
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
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || '요청 처리 중 오류가 발생했습니다.');
      } else {
        toast.error('요청 처리 중 오류가 발생했습니다.');
      }
    },
  });
};

export const useDeleteFeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['calendar'] });
      queryClient.invalidateQueries({ queryKey: ['userLikes'] });
      queryClient.invalidateQueries({ queryKey: ['userState'] });
    },
  });
};
