import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings.js';

export function useTodayActivity() {
  const { data, isPending } = useQuery({
    queryKey: ['today-activity'],
    queryFn: getStaysTodayActivity,
  });

  return {
    activities: data,
    isLoadingActivity: isPending,
  };
}
