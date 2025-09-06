import { useSuspenseQuery } from '@tanstack/react-query';
import { getUser, getUserLikes } from '@/apis/user';

export const useGetUser = () => {
  return useSuspenseQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
};

export const useGetUserLikes = () => {
  return useSuspenseQuery({
    queryKey: ['userLikes'],
    queryFn: getUserLikes,
  });
};
