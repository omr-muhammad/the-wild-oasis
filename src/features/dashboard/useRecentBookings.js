import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings.js';

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numsOfDays = Number(searchParams.get('last')) || 7;
  const queryDate = subDays(new Date(), numsOfDays).toISOString();

  const { data, isPending } = useQuery({
    queryKey: ['bookings', numsOfDays],
    queryFn: () => getBookingsAfterDate(queryDate),
    // onSuccess: () => {},
  });

  return {
    bookings: data,
    isLoadingBookings: isPending,
  };
}
