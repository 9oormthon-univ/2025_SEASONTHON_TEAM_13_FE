import { useSuspenseQuery } from '@tanstack/react-query';
import { getUser } from '@/apis/user';

export const useGetUser = () => {
  return useSuspenseQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
};
