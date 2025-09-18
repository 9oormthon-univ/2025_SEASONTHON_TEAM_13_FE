import { getRecommendedSongs } from '@/apis/songs';
import type { FEELINGS } from '@/constants/feelings';
import { useQuery } from '@tanstack/react-query';

export const useRecommendedSongs = (emotions: typeof FEELINGS[number]['name'][], limit: number = 10) => {
  return useQuery({
    queryKey: ['recommendedSongs', emotions, limit],
    queryFn: () => getRecommendedSongs(emotions, limit),
  });
};
