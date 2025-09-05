import { getCalendar } from '@/apis/calendar';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useCalendar = () => {
  return useSuspenseQuery({
    queryKey: ['calendar'],
    queryFn: getCalendar,
  });
};
