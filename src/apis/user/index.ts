import { instance } from '@/apis/instance';
import type { User } from '@/types/user';

export const getUser = async (): Promise<User> => {
  const response = await instance.get('/users/me');
  return response.data;
};
