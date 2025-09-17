import { useSuspenseQuery } from '@tanstack/react-query';
import { getUser, getUserLikes, getUserState } from '@/apis/user';

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

export const useGetUserState = () => {
  return useSuspenseQuery({
    queryKey: ['userState'],
    queryFn: getUserState,
  });
};
