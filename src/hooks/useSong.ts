import { getRecommendedSongs } from '@/apis/songs';
import type { FEELINGS } from '@/constants/feelings';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useRecommendedSongs = (emotions: typeof FEELINGS[number]['name'][], limit: number = 10) => {
  return useSuspenseQuery({
    queryKey: ['recommendedSongs', emotions, limit],
    queryFn: () => getRecommendedSongs(emotions, limit),
  });
};
